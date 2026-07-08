# KirinAI — Student Placement Workspace (Project Kirin)

A Chrome-extension + web app that converts Gmail into an actionable Kanban workflow for college students managing placement opportunities (OAs, interviews, offers, deadlines). This repository contains the architecture, backend, frontend, and deployment plans for an MVP that reliably syncs Gmail, applies deterministic rules first, then falls back to an LLM-based AI classifier.

Status: MVP design & engineering roadmap (v1.0)

## Table of Contents

- About
- Key Features (MVP)
- High-level Architecture
- Getting Started (local dev)
- Google OAuth & Gmail integration notes
- Rule Engine & AI Pipeline
- Folder Structure
- Development Timeline (4-week MVP)
- Future Roadmap
- Contributing
- License

## About

College students receive dozens to hundreds of placement-related emails per semester; important opportunities often get buried. KirinAI surfaces those emails as Kanban cards so students manage opportunities, not mail. The extension is a thin client that renders server state and receives updates via WebSocket; the backend manages Gmail integration, rule evaluation, and AI classification.

## Key Features (MVP)

- Chrome Extension (Manifest V3) with Kanban board UI and drag-and-drop
- Website for onboarding, OAuth, and basic rule/AI settings
- Backend services:
  - Gmail sync (Watch API → history.list → message fetch)
  - Rule Engine (deterministic matching cached in Redis)
  - AI Pipeline (LLM classification fallback with schema validation)
  - Kanban CRUD + WebSocket push notifications
- Auto-provisioned workspace template: Student Placement
- Default rules shipped at workspace creation

## High-level Architecture

- Frontend:
  - extension/ (React + TypeScript + TailwindCSS): popup UI, background service worker for WebSocket and notifications
  - website/ (React + TypeScript): onboarding, rules, AI settings
  - packages/shared/ — typed API client, shared types and components
- Backend:
  - FastAPI (async) + PostgreSQL (Neon) + Redis + background workers (Celery/RQ)
  - Modules: auth, gmail, rules, ai, kanban, notifications, users, workers
- Integrations:
  - Google OAuth (openid + Gmail scopes)
  - Google Pub/Sub for Gmail Watch pushes
  - OpenAI/Gemini (provider-agnostic) for fallback classification
- Deployment: website on Vercel, backend and workers on Railway/Render, Postgres on Neon, Redis on managed provider

## Getting Started (local dev)

Prerequisites
- Node.js and pnpm (or npm/yarn) for frontend
- Python 3.10+ and poetry/venv for backend
- Docker (recommended for Redis/Postgres in local env)

Quick local steps (summary)
1. Clone repository.
2. Install frontend dependencies (pnpm install in KirinAI/apps and packages).
3. Install backend dependencies (poetry install or pip).
4. Configure environment variables:
   - Backend: DB URL, Redis URL, JWT secret, Google OAuth client ID/secret, KMS key or local encryption secret, AI provider keys
   - Frontend: API base URL, extension manifest settings
5. Start local services:
   - Start Postgres and Redis (docker-compose or local services)
   - Start backend (uvicorn)
   - Start worker (Celery/RQ worker process)
   - Start website & extension dev builds
6. Run migrations (Alembic) to create DB schema.
7. Use a real Gmail test account for full end-to-end Gmail Watch testing (see OAuth notes).

If you want, I can produce step-by-step scripts (docker-compose / Makefile targets) for local bootstrapping.

## Google OAuth & Gmail integration notes

- Required scopes (MVP): `openid`, `email`, `profile`, `https://www.googleapis.com/auth/gmail.readonly` (minimize scope; avoid modify unless needed).
- Backend exchanges code, stores encrypted refresh_token (never exposed to frontend).
- Use Gmail Watch API + Cloud Pub/Sub:
  - Watch subscriptions expire (7 days); implement renewal cron job and alerting.
  - Webhook receives Pub/Sub pushes → call `history.list(startHistoryId=lastKnownId)` → call `messages.get()` on new IDs.
  - Deduplicate on `gmail_message_id` to ensure idempotency.

## Rule Engine & AI Pipeline

Rule Engine
- Rules evaluate before AI (lower cost, deterministic).
- Fields: sender, subject, body; operators: contains, equals, starts_with, regex.
- Default rules provisioned at workspace creation; rules cached in Redis for low-latency evaluation.

AI Pipeline
- Runs when no rule matches.
- Provider-agnostic interface (OpenAI/Gemini implementations).
- Input → prompt construction → LLM call → JSON schema validation → confidence check.
- Confidence threshold (default 0.75): below threshold, card flagged for review.
- AI recommendations are advisory: backend applies them, not the model.

## Folder Structure (summary)

KirinAI/
- apps/
  - website/ — React app for onboarding, rules, AI settings
  - extension/ — Chrome extension (popup, background, optional content scripts)
- packages/
  - shared/ — API client, types, UI components
- backend/
  - app/ — FastAPI app: routers, services, models, workers
  - alembic/ — DB migrations
- infra/ — Docker & deployment scripts
- docs/ — engineering roadmap and other docs

## Development Timeline (4-week MVP)

- Week 1: Auth, Gmail sync, DB schema & migrations, webhook handler
- Week 2: Rule Engine, Kanban CRUD, background pipeline
- Week 3: AI Pipeline, WebSocket realtime, extension UI core
- Week 4: Rule/AI settings UI, notifications, hardening, staging deployment, Chrome Web Store submission

## Future Roadmap & Scalability

- Multi-template workspaces, rule engine extraction, agentic multi-step AI, multi-account and multi-provider email support, billing & rate limits, data retention policies.
- Observability: structured logs, Sentry, alerting for watch renewals and dead-letter queue growth.

## Contributing

- Follow established folder structure and 3-layer backend pattern (router → service → repository).
- Tests: run lint, typecheck, unit tests on PRs (GitHub Actions).
- When adding AI prompts or rules, include unit tests and examples so behavior can be evaluated on historical email data.

## License

Add your preferred license here (e.g., MIT). If you want, I can add a license file.

---

For full technical details and design rationale, see the engineering roadmap:
docs/KirinAI-engineering-roadmap.md

If you'd like, I can:
- Commit this README.md directly into the repository,
- Generate docker-compose / local dev scripts,
- Or produce CI templates (GitHub Actions) for the monorepo.
