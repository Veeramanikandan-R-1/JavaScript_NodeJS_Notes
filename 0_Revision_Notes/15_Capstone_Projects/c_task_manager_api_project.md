# Revision Notes: Capstone: Task Manager REST API

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Define requirements, data model, API contract, test plan, and deployment plan before coding.
* Best practice: Keep a small backlog of polish tasks: logs, metrics, indexes, rate limits, and docs.
* Best practice: Show both happy path and failure path behavior.
* Best practice: Write a final review note describing tradeoffs and next improvements.
* Avoid: Building many shallow endpoints with no validation, auth, tests, or deployment story.
* Avoid: Skipping README, env examples, API docs, and seed data.
* Avoid: Making demos that cannot be run by another developer.
* Avoid: Ignoring failure states and operational visibility.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| Users | Signup, login, logout, profile, avatar. |
| Tasks | CRUD with owner relationship. |
| Auth | JWT middleware and token revocation. |
| Queries | Filtering, pagination, sorting. |
| Tests | Supertest with auth and isolated test database. |

---

# Interview Questions & Answers

### 1. Architecture review: how should the task API be divided?

Use routes/controllers for HTTP mapping, services for use cases, repositories for persistence, and middleware for authentication. Ownership and status-transition rules belong in the service layer so they are tested without Express.

### 2. Edge-case review: what cases should a senior reviewer ask about?

Updating someone else's task, duplicate titles if the product disallows them, invalid due dates, concurrent edits, deleting a task with comments or attachments, and pagination while tasks are being created.

### 3. Testing review: what coverage would make you trust the API?

Integration tests should hit real routes with a test database for create, list, update, delete, auth failures, validation errors, and ownership checks. Unit tests can cover pure task-state rules and date validation.

### 4. Security review: what must not be missed?

Hash passwords, validate inputs, enforce object-level authorization on every task lookup, use safe JWT verification, rate-limit auth endpoints, and avoid leaking whether a private task exists to another user.

### 5. Deployability review: what belongs in the handoff?

Database indexes, migrations or schema setup, env var examples, Docker or run commands, health/readiness endpoint, seed data if useful, and logs that include request ids without exposing task contents unnecessarily.

---

# Quick Practice

1. Explain Capstone: Task Manager REST API in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
