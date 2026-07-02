# Kaizen - Product Vision & Overall Pipeline

## Product Overview

Kaizen is a Chrome Extension + SaaS platform that transforms Gmail into an intelligent workflow management system.

The first version of Kaizen is built specifically for **college students preparing for internships and placements**. Instead of asking students to constantly monitor Gmail, Kaizen automatically detects placement-related emails, organizes them into a Kanban workflow, and surfaces only what requires attention.

The long-term vision is to evolve Kaizen into a general workflow engine that can serve developers, freelancers, recruiters, founders, agencies, and businesses.

---

# Problem Statement

Students receive hundreds of emails every semester.

Their inbox contains:

- Placement drives
- Internship opportunities
- Online Assessments (OA)
- Interview invitations
- Offer letters
- Resume submission reminders
- Hackathons
- Coding contests
- College announcements
- Club activities
- Promotions
- Spam

Important opportunities often get buried beneath less relevant emails.

Students frequently:

- Miss interview invitations
- Miss OA deadlines
- Forget application deadlines
- Lose track of applications
- Spend unnecessary time searching Gmail

Kaizen solves this by converting emails into actionable workflow cards instead of leaving them inside the inbox.

---

# Product Vision

Kaizen is **not another email client.**

Kaizen sits on top of Gmail and acts as an intelligent workflow layer.

Instead of managing emails, users manage opportunities.

---

# Product Architecture

Kaizen consists of four major components.

## 1. Chrome Extension

Primary interface used every day.

Responsibilities:

- Placement dashboard
- Kanban board
- Notifications
- Card movement
- Email summaries
- Open Gmail thread

The extension should remain lightweight.

No business logic should exist inside the extension.

---

## 2. Website

Used for onboarding and management.

Responsibilities:

- Landing page
- Google OAuth
- Workspace creation
- Rule management
- AI configuration
- User profile
- Billing (future)

Users only visit the website when configuring Kaizen.

---

## 3. Backend

The backend owns all business logic.

Responsibilities:

- Authentication
- Gmail integration
- Rule Engine
- AI Pipeline
- Kanban management
- Notifications
- Database
- WebSockets

The extension communicates only with the backend.

It never communicates directly with Gmail.

---

## 4. Gmail

Kaizen integrates with Gmail using:

- Google OAuth
- Gmail API
- Gmail Watch API
- Webhooks

---

# Overall User Journey

```
Install Chrome Extension

↓

Open Extension

↓

Redirect to Website

↓

Google OAuth

↓

Grant Gmail Permissions

↓

Backend stores OAuth credentials

↓

Initial Gmail Sync

↓

Create Student Workspace

↓

Default Placement Board created

↓

Default Rules installed

↓

Extension activated
```

After onboarding, students primarily interact with the extension.

---

# Student Workspace

Every student receives a predefined Kanban workflow.

```
New Opportunities

↓

Applied

↓

Online Assessment

↓

Interview

↓

Offer

↓

Rejected

↓

Completed
```

Cards can be dragged between columns.

---

# Email Processing Pipeline

Whenever a new email arrives:

```
New Email

↓

Gmail Watch API

↓

Backend Webhook

↓

Fetch Complete Email

↓

Store in Database

↓

Run Rule Engine

↓

Rule Found?
```

If YES

```
Move card to correct board

↓

Notify Extension

↓

Done
```

If NO

```
Run AI Pipeline

↓

Generate Summary

↓

Classify Email

↓

Extract Deadline

↓

Determine Priority

↓

Recommend Board

↓

Recommend Column

↓

Return JSON

↓

Update Database

↓

Notify Extension
```

---

# Rule Engine

Rules always execute before AI.

Example rules:

```
IF sender contains

placement@college.edu

↓

Placement Board
```

```
IF subject contains

Interview

↓

Interview Column
```

```
IF subject contains

Online Assessment

↓

OA Column
```

```
IF body contains

Offer Letter

↓

Offer Column
```

Users will later be able to create custom rules through the website.

The Rule Engine minimizes AI calls while ensuring predictable behavior.

---

# AI Pipeline

AI only executes when no deterministic rule matches.

The AI should analyze:

- Summary
- Category
- Priority
- Suggested Board
- Suggested Column
- Deadline
- Required Action
- Confidence Score

Return JSON similar to:

```json
{
  "summary": "...",
  "category": "Placement",
  "priority": "High",
  "board": "Placement",
  "column": "Interview",
  "deadline": "2026-07-15",
  "action": "Reply",
  "confidence": 0.96
}
```

The backend decides whether to apply the AI recommendation.

---

# Backend Responsibilities

Modules

```
Authentication

↓

Gmail Integration

↓

Rule Engine

↓

AI Processing

↓

Kanban

↓

Notifications

↓

User Management

↓

Billing (Future)
```

---

# Frontend Responsibilities

## Website

Purpose

- Landing
- Login
- Workspace Setup
- Rule Builder
- AI Settings
- Profile
- Billing

---

## Chrome Extension

Purpose

- Dashboard
- Kanban
- Notifications
- Search
- Open Gmail
- Card Management

---

# Long-Term Vision

Although the MVP focuses on students, the architecture should remain generic enough to support multiple workspace templates.

Future templates:

- Student Placement
- Software Engineer
- Freelancer
- Startup Founder
- Recruiter
- Sales
- Customer Support

Only the templates, rules, and AI prompts should change.

The backend architecture should remain reusable.

---

# Technology Stack

Frontend

- React
- TypeScript
- TailwindCSS
- Manifest V3

Backend

- FastAPI
- PostgreSQL
- Redis
- WebSockets

Authentication

- Google OAuth 2.0

Email

- Gmail API
- Gmail Watch API

AI

- OpenAI / Gemini
- Agentic Workflow

Deployment

- Vercel
- Railway / Render
- Neon PostgreSQL

---

# Overall System Pipeline

```
                    USER
                      │
          Install Chrome Extension
                      │
                      ▼
             Open Extension
                      │
                      ▼
             Redirect to Website
                      │
                      ▼
               Google OAuth Login
                      │
                      ▼
         Backend Stores OAuth Tokens
                      │
                      ▼
            Initial Gmail Synchronization
                      │
                      ▼
           Student Workspace Creation
                      │
                      ▼
          Default Rules + Boards Created
                      │
                      ▼
            Chrome Extension Activated
──────────────────────────────────────────────
                DAILY EMAIL FLOW
──────────────────────────────────────────────
                      │
                 New Gmail Email
                      │
                      ▼
               Gmail Watch API
                      │
                      ▼
              Backend Webhook Trigger
                      │
                      ▼
             Fetch Complete Email
                      │
                      ▼
             Store in PostgreSQL
                      │
                      ▼
               Execute Rule Engine
                      │
             ┌────────┴────────┐
             │                 │
         Rule Found        No Rule
             │                 │
             ▼                 ▼
     Move to Kanban      Execute AI Pipeline
             │                 │
             ▼                 ▼
      Update Database   Generate Metadata
             │                 │
             └────────┬────────┘
                      ▼
             Push via WebSocket
                      │
                      ▼
          Chrome Extension Updates
                      │
                      ▼
          Student Takes Action
```

---

# Engineering Roadmap

This project will be documented and implemented in the following order:

1. Product Requirements Document (PRD)
2. Frontend Architecture
3. Backend Architecture
4. Google OAuth Design
5. Gmail Integration
6. Rule Engine
7. Agentic AI Architecture
8. Database Design
9. API Design
10. Deployment
11. Future Scalability
