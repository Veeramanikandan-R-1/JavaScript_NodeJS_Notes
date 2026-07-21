# Revision Notes: Database, Auth, and Security Interview Questions

Use this as the quick final pass before interviews. For full answers, read `14_Interview_Prep/c_database_auth_security_interview.md`.

---

# Database

* Choose SQL when relationships, constraints, joins, reporting, and transactions matter heavily.
* Choose MongoDB when document-shaped data and access patterns fit embedding/flexible schema.
* Indexes speed reads for specific query shapes but slow writes and use storage.
* Compound index order matters; the leftmost prefix is important.
* Cursor pagination is better than offset pagination for large changing datasets.
* Use transactions only where multiple writes must commit or roll back together.
* Avoid race conditions with database constraints, atomic updates, transactions, version fields, and idempotency keys.
* Avoid N+1 queries with batching, joins, `$lookup`, preloading, or denormalization.

---

# Auth

* Authentication asks who the user is.
* Authorization asks what the user can do.
* Passwords should be hashed with slow salted algorithms such as bcrypt, Argon2, or scrypt.
* JWTs are usually signed and readable, not encrypted.
* Access tokens should be short-lived.
* Refresh tokens need strong storage, rotation, reuse detection, and revocation.
* RBAC is role-based. ABAC uses attributes such as owner, tenant, region, or resource state.
* Object-level authorization must be checked server-side for every sensitive object operation.

---

# Security

| Risk | Fix |
| ---- | --- |
| BOLA | Check ownership/tenant permissions per object. |
| Mass assignment | Allow-list writable fields. |
| Injection | Use parameterized queries and strict validation. |
| XSS | Encode output, use CSP, avoid unsafe HTML injection. |
| CSRF | SameSite cookies, CSRF tokens, origin checks where appropriate. |
| SSRF | Allow-list outbound hosts and block private ranges. |
| Secret leaks | Use secret manager/env injection and never log secrets. |

---

# Node-Specific Reliability

* Reuse one database pool/client per process.
* Do not create database connections per request.
* Do not store durable session state in memory when using multiple processes or containers.
* Background jobs must be idempotent and retryable.
* Use dead-letter queues for repeated job failures.
* Use the outbox pattern when a database write and event publish must stay consistent.

---

# Quick Practice

1. Explain JWT vs session.
2. Explain access token vs refresh token.
3. Explain SQL vs MongoDB for orders.
4. Design an index for a filtered, sorted list endpoint.
5. Explain how to stop one user from reading another user's record.
