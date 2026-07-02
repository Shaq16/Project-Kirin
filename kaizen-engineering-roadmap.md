# Kaizen — Engineering Roadmap & Architecture Blueprint

**Version:** 1.0
**Scope:** MVP — Student Placement Workspace
**Audience:** Engineering team (Frontend, Backend, AI, DevOps)

---

## Table of Contents

1. [Product Requirements Document (PRD)](#1-product-requirements-document-prd)
2. [Frontend Architecture (Website + Chrome Extension)](#2-frontend-architecture-website--chrome-extension)
3. [Backend Architecture](#3-backend-architecture)
4. [Google OAuth Flow](#4-google-oauth-flow)
5. [Gmail Integration Architecture](#5-gmail-integration-architecture)
6. [Rule Engine Design](#6-rule-engine-design)
7. [Agentic AI Architecture](#7-agentic-ai-architecture)
8. [Database Design (ERD + Tables)](#8-database-design-erd--tables)
9. [API Design](#9-api-design)
10. [Deployment Architecture](#10-deployment-architecture)
11. [Folder Structure](#11-folder-structure)
12. [Development Timeline (4-Week MVP)](#12-development-timeline-4-week-mvp)
13. [Future Scalability Considerations](#13-future-scalability-considerations)

---

## 1. Product Requirements Document (PRD)

### 1.1 Problem Statement

College students receive hundreds of placement-related emails per semester (drives, OAs, interviews, offers, deadlines) mixed in with spam, promotions, and club announcements. Important opportunities get buried, causing missed interviews, missed deadlines, and wasted time searching Gmail.

### 1.2 Product Goal

Convert Gmail into an actionable Kanban workflow so students manage **opportunities**, not emails.

### 1.3 Target User (MVP)

College students actively applying for internships/placements, using Gmail as their primary inbox.

### 1.4 Core User Stories

| ID | As a... | I want to... | So that... |
|----|---------|---------------|------------|
| US-1 | Student | Install the extension and connect Gmail in one flow | I can start using Kaizen quickly |
| US-2 | Student | See placement emails automatically sorted into a board | I don't have to read every email |
| US-3 | Student | See deadlines and priority on each card | I never miss an OA or interview |
| US-4 | Student | Drag cards between columns | I can reflect my actual application status |
| US-5 | Student | Click a card to open the original Gmail thread | I can read full context when needed |
| US-6 | Student | Get notified of high-priority new cards | I act fast on time-sensitive opportunities |
| US-7 | Student | Configure custom rules on the website | I can tune sorting to my own inbox patterns |

### 1.5 MVP Scope (In)

- Chrome Extension (Manifest V3) with Kanban board + notifications
- Website for onboarding, OAuth, and basic rule/AI settings
- Backend: Gmail sync, Rule Engine, AI Pipeline, Kanban CRUD, WebSocket push
- Single workspace template: **Student Placement**
- Default board + default rules auto-provisioned on signup

### 1.6 Out of Scope (MVP)

- Billing
- Multiple workspace templates (Freelancer, Recruiter, etc.)
- Custom rule builder UI (backend support only, minimal UI)
- Mobile app
- Multi-account Gmail support

### 1.7 Success Metrics

- % of placement emails correctly auto-classified without user correction
- Median time from email arrival → card appearing in extension (target: <30s)
- Weekly active extension users / onboarded users
- False-positive rate of AI-classified cards moved into wrong column

### 1.8 Non-Functional Requirements

- **Latency:** Webhook → card update pushed to extension in under 10s for rule-matched emails, under 30s for AI-routed emails.
- **Reliability:** No email should be silently dropped; failures must be retryable via a dead-letter queue.
- **Security:** OAuth tokens encrypted at rest; extension never touches Gmail directly.
- **Modularity:** Rule Engine and AI Pipeline must be swappable/extensible without touching Kanban or Notification modules.

---

## 2. Frontend Architecture (Website + Chrome Extension)

Two separate frontend applications, sharing a common design system and API client, but deployed and versioned independently.

### 2.1 Chrome Extension

**Stack:** React + TypeScript + TailwindCSS + Manifest V3 (Vite build)

**Principle:** The extension is a *thin client*. Zero business logic — it only renders state from the backend and sends user actions back.

**Structure:**

```
extension/
├── popup/          → Kanban board, dashboard (main UI surface)
├── background/      → Service worker: WebSocket listener, auth token refresh, badge/notification triggers
├── content/          → (optional) inject "Open in Kaizen" button into Gmail UI
└── shared/           → API client, types, auth storage
```

**Key responsibilities:**
- Render Kanban board (columns, cards, drag-and-drop via `dnd-kit`)
- Maintain a live WebSocket connection through the background service worker; push updates into the popup via `chrome.runtime` messaging
- Chrome notifications API for high-priority card alerts
- "Open in Gmail" deep-links using `gmail.com/mail/u/0/#inbox/<threadId>`
- Auth: store short-lived access token (via `chrome.storage.session`), refresh through backend

**State management:** React Query (server cache) + lightweight local UI state (Zustand) for board interactions. No Redux needed at this scale.

### 2.2 Website

**Stack:** React + TypeScript + TailwindCSS + Vite (or Next.js if SSR/SEO desired for the landing page)

**Pages:**

| Route | Purpose |
|-------|---------|
| `/` | Landing page, marketing |
| `/login` | Google OAuth entry |
| `/onboarding` | Workspace creation, permission grant status |
| `/rules` | Rule management (list, create, edit, delete) |
| `/ai-settings` | AI provider config, confidence threshold, opt-in toggles |
| `/profile` | Account, connected Gmail, disconnect |
| `/billing` | Placeholder, future |

**Key responsibilities:** OAuth initiation and callback handling, workspace bootstrap trigger, rule CRUD forms, AI settings forms. The website is visited infrequently — optimize for clarity over daily-use polish.

### 2.3 Shared Frontend Package

To avoid duplicating types and API logic between website and extension, maintain a shared internal package:

```
packages/shared/
├── api-client/     → typed fetch wrapper, generated from OpenAPI spec
├── types/           → Card, Board, Rule, User, AIResult types
└── ui/               → shared Tailwind config, base components (Button, Badge, Modal)
```

This can live in a monorepo (see Section 11) using pnpm workspaces or Turborepo.

---

## 3. Backend Architecture

**Stack:** FastAPI (Python), PostgreSQL, Redis, WebSockets, deployed as containerized services.

### 3.1 Design Principle

The backend is organized as **modular domains**, each owning its own routers, services, and models, communicating through well-defined interfaces — not a monolith of shared spaghetti logic. This makes it possible to later extract any module (e.g., AI Pipeline) into its own microservice without a rewrite.

### 3.2 Module Breakdown

```
Authentication  → Google OAuth, session/JWT issuance, token refresh
Gmail Integration → Gmail API client, Watch API renewal, webhook receiver
Rule Engine     → Rule storage, rule matching, execution
AI Pipeline     → Prompt construction, LLM calls, JSON parsing/validation
Kanban          → Boards, columns, cards, drag/move operations
Notifications   → WebSocket broadcast, Chrome push payloads
User Management → Workspace, profile, settings
Billing (future) → Stripe integration, plan limits
```

### 3.3 Request Flow Pattern

Each module exposes:
- **Router** (FastAPI `APIRouter`) — HTTP boundary, validation via Pydantic schemas
- **Service** — business logic, orchestration
- **Repository** — DB access (SQLAlchemy), isolates persistence from logic

This 3-layer pattern is applied consistently so any engineer can predict where logic lives.

### 3.4 Background Processing

Email processing (fetch → rule match → AI fallback → DB update → notify) should **not** run inline inside the webhook HTTP handler. Instead:

```
Webhook Handler (fast ack, <200ms)
        │
        ▼
   Enqueue Job (Redis / Celery or RQ)
        │
        ▼
   Worker Process (Rule Engine → AI Pipeline → DB → WebSocket)
```

This decouples Gmail's webhook SLA from AI latency and allows retries without blocking new webhook deliveries.

### 3.5 Why FastAPI + Celery/RQ + Redis

- FastAPI: async-first, plays well with webhook bursts and WebSocket connections
- Redis: doubles as the Celery/RQ broker and a cache for rule lookups
- PostgreSQL: relational integrity needed for workspace → board → column → card hierarchy

---

## 4. Google OAuth Flow

### 4.1 Scopes Required

- `openid`, `email`, `profile` — identity
- `https://www.googleapis.com/auth/gmail.readonly` — read emails
- `https://www.googleapis.com/auth/gmail.modify` — only if Kaizen needs to label/archive later (defer if not needed for MVP; request minimal scopes first)

### 4.2 Flow

```
1. User clicks "Continue with Google" on website
2. Website redirects to Google OAuth consent screen (via backend-generated auth URL, with state param)
3. Google redirects back to backend callback: /auth/google/callback?code=...&state=...
4. Backend exchanges code for access_token + refresh_token
5. Backend encrypts and stores refresh_token in DB (per user)
6. Backend issues Kaizen-native session (JWT or opaque session token)
7. Website receives session token, redirects to /onboarding
8. Extension requests session token from website (one-time handoff via secure postMessage or short-lived code) and stores it
```

### 4.3 Token Handling

- `refresh_token` stored encrypted at rest (e.g., AES-256 via KMS-managed key), **never sent to frontend or extension**.
- `access_token` is short-lived and cached server-side (Redis) per user; refreshed transparently by backend when expired.
- Extension and website only ever hold a **Kaizen session token**, never raw Google tokens.

### 4.4 State Parameter & CSRF Protection

The `state` param is a signed, single-use nonce validated on callback to prevent CSRF and confirm the request originated from Kaizen's own login initiation.

---

## 5. Gmail Integration Architecture

### 5.1 Components

- **Google OAuth** — identity + consent (Section 4)
- **Gmail API** — fetch full message content, metadata, thread info
- **Gmail Watch API** — subscribes a user's mailbox to push notifications via Google Cloud Pub/Sub
- **Webhook Receiver** — backend endpoint that Google Cloud Pub/Sub pushes to when new mail arrives

### 5.2 Setup Flow (Per User, Once)

```
After OAuth grant
        │
        ▼
Call users.watch() on Gmail API
   (registers mailbox with Cloud Pub/Sub topic)
        │
        ▼
Store historyId + watch expiration (~7 days) in DB
        │
        ▼
Schedule renewal job (cron, runs daily, renews watches expiring <48h)
```

Gmail Watch subscriptions expire after 7 days and **must** be renewed — this is a common failure point and needs a dedicated scheduled job with alerting if renewal fails.

### 5.3 Runtime Flow (New Email)

```
New email arrives in user's Gmail
        │
        ▼
Google Pub/Sub publishes to subscribed topic
        │
        ▼
Backend webhook endpoint receives push (contains emailAddress + historyId)
        │
        ▼
Backend calls history.list(startHistoryId=lastKnownId) to get changed message IDs
        │
        ▼
Fetch full message(s) via messages.get()
        │
        ▼
Store raw + parsed email in PostgreSQL
        │
        ▼
Enqueue processing job → Rule Engine → AI Pipeline (Section 3.4)
```

Using `history.list` (not just the raw push payload) is important — Pub/Sub pushes only signal "something changed," the actual delta must be fetched via history to avoid missing or duplicating emails.

### 5.4 Failure Handling

- Webhook handler always returns 200 quickly (Pub/Sub retries aggressively on non-2xx, which can cause duplicate storms).
- Idempotency: dedupe by `messageId` before inserting into DB.
- Dead-letter queue for jobs that fail processing after N retries, surfaced in an internal admin view.

---

## 6. Rule Engine Design

### 6.1 Principle

Rules always execute **before** AI. This minimizes AI cost/latency and gives predictable, explainable behavior for common, well-known email patterns (e.g., a fixed placement-cell sender address).

### 6.2 Rule Model

```
Rule {
  id
  workspace_id
  field: "sender" | "subject" | "body"
  operator: "contains" | "equals" | "starts_with" | "regex"
  value: string
  target_board_id
  target_column_id
  priority: int        // evaluation order when multiple rules could match
  is_default: bool      // system-provided vs user-created
  enabled: bool
}
```

### 6.3 Default Rules (Auto-Installed at Workspace Creation)

| Field | Operator | Value | Target |
|-------|----------|-------|--------|
| sender | contains | `placement@<college>.edu` | Placement Board |
| subject | contains | `Interview` | Interview Column |
| subject | contains | `Online Assessment` / `OA` | OA Column |
| body | contains | `Offer Letter` | Offer Column |

### 6.4 Execution Logic

```
For each incoming email:
    1. Load enabled rules for workspace, ordered by priority
    2. Evaluate sequentially; first match wins
    3. If match → move/create card in target board/column, stop
    4. If no match → fall through to AI Pipeline
```

Rule evaluation should be a pure function (no side effects) so it can be unit-tested independently of the DB and easily reused for a future "test this rule against past emails" feature in the rule builder UI.

### 6.5 Performance

Rules are cached in Redis per workspace (invalidated on rule CRUD) to avoid a DB round-trip on every incoming email.

---

## 7. Agentic AI Architecture

### 7.1 When AI Runs

Only when no deterministic rule matches — this is a deliberate cost and reliability control.

### 7.2 Pipeline Steps

```
Email (subject, sender, body, thread context)
        │
        ▼
Prompt Construction (system prompt + structured email data)
        │
        ▼
LLM Call (OpenAI / Gemini — provider-agnostic interface)
        │
        ▼
Structured Output Parsing (JSON schema validation)
        │
        ▼
Confidence Check
        │
   ┌────┴────┐
 High         Low
   │            │
Auto-apply   Flag for user review /
              default to "New Opportunities"
```

### 7.3 Expected Output Schema

```json
{
  "summary": "string, 1-2 sentences",
  "category": "Placement | Internship | Hackathon | Announcement | Spam | Other",
  "priority": "High | Medium | Low",
  "board": "string",
  "column": "string",
  "deadline": "YYYY-MM-DD | null",
  "action": "Reply | Apply | Attend | Read | None",
  "confidence": 0.0
}
```

### 7.4 Provider Abstraction

Do not hardcode OpenAI or Gemini calls directly into the service layer. Define an interface:

```python
class AIProvider(Protocol):
    async def classify_email(self, email: EmailPayload) -> AIClassificationResult: ...
```

with concrete implementations (`OpenAIProvider`, `GeminiProvider`) selected via config. This keeps the door open for model switching/A-B testing without touching calling code.

### 7.5 Guardrails

- **JSON schema validation** on every LLM response; malformed output → retry once, then fallback to a safe default (place in "New Opportunities", flag `action: "Review"`).
- **Confidence threshold** (configurable per workspace, default 0.75): below threshold, card is still created but visually marked "AI unsure — please confirm" instead of being silently auto-filed.
- **No blind Gmail writes**: AI never sends emails or modifies the mailbox — it only proposes board/column/metadata.
- **Backend applies the recommendation**, not the AI directly — the AI Pipeline returns a recommendation object; a separate service decides whether/how to apply it. This keeps AI output as *advisory*, never as an uncontrolled write path.

### 7.6 Agentic Extension Point (Future)

The current pipeline is a single-shot classification call. The architecture should allow upgrading to a multi-step agent (e.g., an agent that drafts a reply, checks a calendar for conflicts before suggesting a deadline) by extending the `AIProvider` interface with additional tool-calling steps, without changing the Rule Engine → AI Pipeline → Kanban contract.

---

## 8. Database Design (ERD + Tables)

### 8.1 Entity Relationship Overview

```
User ──1:1── Workspace ──1:N── Board ──1:N── Column ──1:N── Card
                  │
                  ├──1:N── Rule
                  │
                  └──1:N── AISettings (1:1 in practice)

User ──1:1── GmailConnection

Card ──1:1── Email (source email that generated the card)

Card ──1:N── Notification (log of pushes related to a card)
```

### 8.2 Core Tables

**users**
| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| email | text unique | |
| name | text | |
| avatar_url | text | |
| created_at | timestamptz | |

**gmail_connections**
| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| user_id | UUID FK → users | |
| refresh_token_encrypted | text | encrypted at rest |
| history_id | text | last processed Gmail history cursor |
| watch_expiration | timestamptz | Gmail Watch renewal tracking |
| connected_at | timestamptz | |

**workspaces**
| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| user_id | UUID FK → users | |
| template | text | `"student_placement"` for MVP |
| created_at | timestamptz | |

**boards**
| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| workspace_id | UUID FK → workspaces | |
| name | text | e.g. "Placement" |
| is_default | bool | |

**columns**
| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| board_id | UUID FK → boards | |
| name | text | e.g. "Interview" |
| position | int | ordering |

**cards**
| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| column_id | UUID FK → columns | |
| email_id | UUID FK → emails | |
| title | text | derived from subject/summary |
| summary | text | |
| priority | text | High/Medium/Low |
| deadline | date, nullable | |
| action | text | Reply/Apply/Attend/etc. |
| source | text | `"rule"` or `"ai"` |
| confidence | float, nullable | only set if AI-sourced |
| position | int | ordering within column |
| created_at | timestamptz | |
| updated_at | timestamptz | |

**emails**
| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| user_id | UUID FK → users | |
| gmail_message_id | text unique | idempotency key |
| gmail_thread_id | text | for "Open in Gmail" deep link |
| sender | text | |
| subject | text | |
| body_raw | text | |
| received_at | timestamptz | |

**rules**
| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| workspace_id | UUID FK → workspaces | |
| field | text | sender/subject/body |
| operator | text | contains/equals/starts_with/regex |
| value | text | |
| target_board_id | UUID FK → boards | |
| target_column_id | UUID FK → columns | |
| priority | int | |
| is_default | bool | |
| enabled | bool | |

**ai_settings**
| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| workspace_id | UUID FK → workspaces, unique | |
| provider | text | openai/gemini |
| confidence_threshold | float | default 0.75 |
| enabled | bool | |

**notifications**
| Column | Type | Notes |
|--------|------|-------|
| id | UUID PK | |
| card_id | UUID FK → cards | |
| type | text | new_card/moved/deadline_reminder |
| delivered | bool | |
| created_at | timestamptz | |

### 8.3 Indexing Notes

- `emails.gmail_message_id` — unique index, critical for idempotent ingestion
- `cards.column_id`, `cards.position` — composite index for fast board rendering/ordering
- `rules.workspace_id, priority` — composite index for fast rule lookup (though Redis cache is the primary path)

---

## 9. API Design

RESTful HTTP for CRUD, WebSocket for realtime push. All routes versioned under `/api/v1`.

### 9.1 Authentication

```
GET  /api/v1/auth/google/login          → returns Google OAuth URL
GET  /api/v1/auth/google/callback       → handles OAuth code exchange
POST /api/v1/auth/session/exchange      → extension exchanges handoff code for session token
POST /api/v1/auth/logout
```

### 9.2 Workspace & Onboarding

```
POST /api/v1/workspaces                 → create workspace (triggers default board+rules)
GET  /api/v1/workspaces/me
```

### 9.3 Boards & Kanban

```
GET    /api/v1/boards
GET    /api/v1/boards/{board_id}/columns
GET    /api/v1/boards/{board_id}/cards
PATCH  /api/v1/cards/{card_id}          → move card (column_id, position), edit fields
DELETE /api/v1/cards/{card_id}
```

### 9.4 Rules

```
GET    /api/v1/rules
POST   /api/v1/rules
PATCH  /api/v1/rules/{rule_id}
DELETE /api/v1/rules/{rule_id}
```

### 9.5 AI Settings

```
GET   /api/v1/ai-settings
PATCH /api/v1/ai-settings
```

### 9.6 Gmail Webhook (Google → Backend, not user-facing)

```
POST /api/v1/webhooks/gmail             → Pub/Sub push endpoint, validated via Google-signed token
```

### 9.7 Realtime

```
WS /api/v1/ws?token=<session_token>

Server → Client events:
  { "type": "card.created", "payload": Card }
  { "type": "card.updated", "payload": Card }
  { "type": "card.moved",   "payload": { cardId, fromColumn, toColumn } }
```

### 9.8 API Conventions

- All responses: `{ "data": ..., "error": null }` or `{ "data": null, "error": { "code", "message" } }`
- Pagination via `?cursor=` for card/email lists
- OpenAPI spec auto-generated by FastAPI, consumed by the shared frontend API client generator (Section 2.3) to keep types in sync

---

## 10. Deployment Architecture

### 10.1 Environments

`local` → `staging` → `production`, each with isolated DB, Redis, and OAuth client credentials.

### 10.2 Component Deployment

```
Website (React/Next.js)   → Vercel
Chrome Extension          → Chrome Web Store (versioned releases)
Backend API (FastAPI)     → Railway / Render (containerized)
Background Workers        → Railway / Render (separate worker service, same image, different start command)
PostgreSQL                → Neon (serverless Postgres)
Redis                     → Railway/Render managed Redis or Upstash
```

### 10.3 Topology

```
                     ┌─────────────┐
                     │   Vercel     │  (Website)
                     └──────┬───────┘
                            │ HTTPS
                            ▼
                 ┌────────────────────┐
                 │  Backend API (FastAPI) │  Railway/Render
                 └───────┬────────┬───────┘
                         │        │
              WebSocket  │        │  Enqueue jobs
                         │        ▼
                         │   ┌──────────┐
                         │   │  Redis    │
                         │   └────┬─────┘
                         │        │
                         │        ▼
                         │   ┌──────────┐
                         │   │ Workers   │  (Celery/RQ)
                         │   └────┬─────┘
                         │        │
                         ▼        ▼
                 ┌────────────────────┐
                 │   PostgreSQL (Neon) │
                 └────────────────────┘

Chrome Extension  ──HTTPS/WSS──▶  Backend API
Google Pub/Sub    ──HTTPS──▶     Backend API (/webhooks/gmail)
```

### 10.4 CI/CD

- GitHub Actions: lint + typecheck + test on every PR
- Separate pipelines per package (website, extension, backend) triggered by path filters in the monorepo
- Backend: build Docker image → push → deploy to staging → manual promote to production
- Extension: build → zip → manual upload to Chrome Web Store (automation optional later via Chrome Web Store API)

### 10.5 Observability

- Structured logging (JSON) from backend and workers
- Sentry (or similar) for error tracking across website, extension, and backend
- Alerting on: Gmail Watch renewal failures, webhook error rate, AI Pipeline failure rate, job dead-letter queue growth

---

## 11. Folder Structure

Monorepo, managed with pnpm workspaces (frontend) + a Python backend package, orchestrated via Turborepo or simple Makefile targets.

```
kaizen/
├── apps/
│   ├── website/                  # React/Next.js
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── lib/
│   │   └── package.json
│   │
│   └── extension/                # Manifest V3 extension
│       ├── src/
│       │   ├── popup/
│       │   ├── background/
│       │   ├── content/
│       │   └── shared/
│       ├── manifest.json
│       └── package.json
│
├── packages/
│   └── shared/                   # types, API client, UI kit
│       ├── api-client/
│       ├── types/
│       └── ui/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── core/                 # config, security, db session
│   │   ├── auth/                 # router, service, schemas
│   │   ├── gmail/                # gmail client, watch renewal, webhook handler
│   │   ├── rules/                # rule model, matcher, router
│   │   ├── ai/                   # provider interface, openai/gemini impls, prompt templates
│   │   ├── kanban/                # boards, columns, cards
│   │   ├── notifications/        # websocket manager, chrome push
│   │   ├── users/
│   │   └── workers/               # celery/rq task definitions
│   ├── alembic/                  # DB migrations
│   ├── tests/
│   └── pyproject.toml
│
├── infra/
│   ├── docker/
│   └── deploy/
│
├── docs/
│   └── kaizen-engineering-roadmap.md   # this document
│
└── turbo.json / Makefile
```

---

## 12. Development Timeline (4-Week MVP)

### Week 1 — Foundations (Auth, Gmail Sync, DB)

- Set up monorepo, CI skeleton, backend project structure
- Implement Google OAuth flow end-to-end (login → callback → session token)
- Implement DB schema + migrations (users, workspaces, boards, columns, cards, emails, rules, gmail_connections)
- Implement Gmail Watch registration + renewal cron job
- Implement webhook receiver + `history.list` delta fetch → store raw emails (no processing yet)

**Exit criteria:** New emails reliably land in the `emails` table within seconds of arrival.

### Week 2 — Rule Engine + Kanban Core

- Implement Rule Engine (model, matcher, default rules auto-provisioned on workspace creation)
- Implement Kanban CRUD APIs (boards, columns, cards, move/reorder)
- Wire rule-matched emails → automatic card creation
- Build background worker pipeline (Redis + Celery/RQ) connecting webhook → rule engine → DB
- Basic website: landing, login, onboarding flow triggering workspace creation

**Exit criteria:** A rule-matched email produces a correctly placed card in the DB, end-to-end from real Gmail.

### Week 3 — AI Pipeline + Realtime + Extension Core

- Implement AI Pipeline (provider interface, prompt templates, JSON schema validation, confidence handling)
- Wire AI fallback path for non-rule-matched emails
- Implement WebSocket notification layer
- Build Chrome Extension: popup Kanban UI, drag-and-drop, background service worker WebSocket listener, session token handoff from website

**Exit criteria:** Any incoming email (rule or AI path) results in a card visible in the extension in near-real-time.

### Week 4 — Polish, Rule/AI Settings UI, Hardening, Deployment

- Website: rule management UI, AI settings UI
- Extension: notifications (Chrome notifications API), "Open in Gmail" deep links, empty/loading/error states
- Error handling hardening: dead-letter queue, idempotency checks, retry policies
- Observability: logging, Sentry, basic alerting
- Deploy to staging → smoke test with real student Gmail accounts → promote to production
- Chrome Web Store submission (review lead time — start this early in Week 4)

**Exit criteria:** A first cohort of real students can install the extension, connect Gmail, and use the placement board in production.

---

## 13. Future Scalability Considerations

### 13.1 Multi-Template Workspaces

The architecture already separates **template** (board/column layout + default rules + AI prompt set) from the engine itself. To support Developer, Freelancer, Recruiter, Founder, Agency templates:
- Externalize default board/column definitions and default rules into template config (DB-seeded or JSON fixtures) rather than hardcoded logic.
- Parameterize AI prompts per template/category taxonomy instead of a single fixed prompt.

### 13.2 Rule Engine Extraction

If rule complexity grows (nested conditions, AND/OR groups, regex performance concerns), the Rule Engine can be extracted into its own service with its own scaling profile, communicating with the backend via an internal API, without changing the webhook → processing contract.

### 13.3 AI Pipeline Scaling

- Move from single-shot classification to a multi-step agentic pipeline (tool calls, calendar checks, reply drafting) behind the existing `AIProvider` interface.
- Introduce request batching/queuing with rate-limit-aware backoff as user volume grows.
- Add a feedback loop: when a user manually corrects an AI-placed card, log it as training/eval data to improve prompts or fine-tune a classifier over time.

### 13.4 Multi-Account & Multi-Provider Email

- `gmail_connections` table is already scoped per user; extending to multiple Gmail accounts per user, or adding Outlook/Microsoft Graph as a second provider, requires an `EmailProvider` interface analogous to `AIProvider`, without touching Rule Engine or Kanban logic.

### 13.5 Horizontal Scaling

- Backend API is stateless (session in JWT/Redis) → horizontally scalable behind a load balancer.
- Workers scale independently based on queue depth (Celery/RQ autoscaling).
- WebSocket connections may eventually need a dedicated pub/sub layer (e.g., Redis Pub/Sub or a managed realtime service) if concurrent connections grow beyond what a single backend instance can hold in memory.

### 13.6 Billing & Plan Limits

- `ai_settings` and future `billing` tables should carry plan-tier fields (e.g., `ai_calls_per_month`) so usage limits can be enforced in the AI Pipeline without new schema migrations later.

### 13.7 Data Retention & Privacy

- As the user base grows beyond a single college, plan for configurable email body retention policies (e.g., store summaries long-term, purge raw body after N days) to reduce storage cost and privacy exposure.

---

*End of document.*
