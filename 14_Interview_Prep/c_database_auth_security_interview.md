# Database, Auth, and Security Interview Questions for 3 Years Experience

For a Node.js backend role, database/auth/security questions test whether you can protect data while keeping APIs usable and maintainable. MongoDB is important in this repo, but a 3-year backend interview may also compare SQL, indexes, transactions, and consistency tradeoffs.

---

# Database Fundamentals

### 1. SQL vs MongoDB: when would you choose each?

Choose SQL when relationships, joins, constraints, reporting, transactions, and schema consistency are central. Choose MongoDB when document-shaped data, flexible schema evolution, high write throughput, or embedding related data fits the access patterns.

The best answer starts from access patterns and consistency needs, not preference.

### 2. What is an index?

An index is a data structure that speeds reads for specific query patterns. It improves filtering and sorting when the query matches the index shape, but slows writes and consumes storage.

Interview answer:

```text
I create indexes based on actual query filters and sort order, verify with explain plans, and avoid adding indexes blindly because every write must maintain them.
```

### 3. How do compound indexes work?

In a compound index like `{ userId: 1, createdAt: -1 }`, queries filtering by `userId` and sorting by `createdAt` can be efficient. The leftmost prefix matters: the index can help `userId` queries, but not usually `createdAt` alone.

### 4. Offset pagination vs cursor pagination?

Offset pagination uses `skip` and `limit`; it is simple but slower at high offsets and inconsistent when data changes. Cursor pagination uses a stable cursor such as `{ createdAt, id }`; it is better for feeds, logs, and large lists.

### 5. What are transactions?

Transactions group operations so they commit together or roll back together. Use them when multiple writes must stay consistent, such as creating an order and decrementing inventory.

Do not use transactions to hide poor data modeling. Keep them short, avoid user interaction inside a transaction, and handle retries for transient failures.

### 6. How do you avoid race conditions?

Use database constraints, atomic updates, transactions, optimistic locking/version fields, unique indexes, and idempotency keys. Do not rely only on application-level checks like "find first, then insert" without a constraint.

Example issue:

```text
Two requests check that username is free, both see no user, both insert. A unique index is the real protection.
```

### 7. What is the N+1 query problem?

It happens when code loads a list and then performs one query per item. Fix with joins, `$lookup`, batching, preloading, denormalization, or DataLoader-style batching in GraphQL.

---

# Auth Questions

### 8. How does password hashing work?

Passwords should be hashed with a slow adaptive algorithm such as bcrypt, Argon2, or scrypt. A salt prevents identical passwords from producing identical hashes and slows precomputed attacks.

Never encrypt passwords for later decryption. Store only password hashes.

### 9. JWT vs session?

JWTs are signed tokens that can be verified without a database lookup, useful for stateless APIs and service-to-service flows. Server sessions store state server-side and are easier to revoke immediately.

JWT tradeoffs:

* Good for stateless verification.
* Harder immediate revocation unless using short expiry, token version, denylist, or introspection.
* Payload is readable unless encrypted, so do not store secrets.

### 10. Access token vs refresh token?

Access tokens are short-lived and used on API requests. Refresh tokens are longer-lived and used only to obtain new access tokens. Refresh tokens need strong protection, rotation, reuse detection, and revocation.

### 11. Authentication vs authorization?

Authentication answers "who are you?" Authorization answers "what are you allowed to do?" Many security bugs happen when code authenticates a user but forgets object-level authorization.

Example:

```text
GET /users/:id/orders must verify the authenticated user can access that user's orders.
```

### 12. RBAC vs ABAC?

RBAC grants permissions by roles, such as admin, manager, or user. ABAC uses attributes, such as owner ID, tenant ID, department, resource state, or region.

Real systems often combine both: role gives broad ability, object checks enforce ownership or tenant boundaries.

---

# API Security

### 13. What is BOLA?

Broken Object Level Authorization happens when a user can access or modify another user's object by changing an ID. It is one of the most important API risks.

Fix by checking ownership/tenant access for every object operation, not only checking that the user is logged in.

### 14. What is mass assignment?

Mass assignment is blindly applying request body fields to a database model. Fix with allow-lists and DTO schemas.

```js
const allowed = {
  displayName: req.body.displayName,
  timezone: req.body.timezone,
};

await users.updateById(req.user.id, allowed);
```

### 15. How do you prevent injection?

Use parameterized SQL queries or ORM query parameters. In MongoDB, validate input types, avoid blindly accepting query operators from users, and restrict fields clients can filter/sort by.

Also avoid command injection by never concatenating user input into shell commands.

### 16. XSS, CSRF, SSRF: what are they?

XSS runs attacker-controlled script in a user's browser. Defend with output encoding, content security policy, avoiding unsafe HTML injection, and sanitization when accepting HTML.

CSRF tricks a browser into sending authenticated requests using cookies. Defend with `SameSite` cookies, CSRF tokens for state-changing requests, and checking origin/referer where appropriate.

SSRF makes your backend call internal or sensitive URLs. Defend by allow-listing outbound hosts, blocking private network ranges, validating redirects, and adding timeouts.

### 17. How do you store secrets?

Use a secret manager or environment injection, not source control. Rotate secrets, scope them narrowly, avoid logging them, and separate dev/stage/prod credentials.

### 18. How do you design rate limiting?

Define the subject: IP, user ID, API key, tenant, route, or combination. Use Redis or another shared store in multi-instance deployments. Configure proxy trust correctly. Return standard rate-limit headers if your API contract includes them.

Rate limiting is not a replacement for authorization or abuse detection.

---

# Node-Specific Data Reliability

### 19. Why are in-memory sessions or caches risky?

They break with multiple processes, containers, deploys, and crashes. Use Redis, a database, or another external store for shared session/cache state unless the data is intentionally local and disposable.

### 20. How do you handle database connection pools?

Create one pool/client per process and reuse it. Do not create a new connection for every request. Configure pool size based on database capacity, app replicas, and expected concurrency.

### 21. How should background jobs interact with the database?

Jobs must be idempotent, retryable, and observable. Store job status, use unique keys for deduplication, handle partial failure, and use dead-letter queues for repeated failures.

### 22. What is the outbox pattern?

The outbox pattern stores an event in the same database transaction as the main state change. A separate worker publishes the event later. This avoids the classic bug where the database write succeeds but event publishing fails.

---

# Interview Traps

| Weak answer | Strong answer |
| ----------- | ------------- |
| JWT is secure because it is encoded. | JWT is usually signed, not encrypted; payload is readable. |
| CORS protects the API. | CORS only restricts browser reads; server-side auth still matters. |
| Validate only in frontend. | Backend must validate because clients are untrusted. |
| Check ownership only in UI. | Enforce authorization in the API/service layer. |
| Use transactions everywhere. | Use them where consistency requires them; keep them short and measured. |

---

# Practice Questions

1. How would you design login with access and refresh tokens?
2. How would you revoke a JWT before expiry?
3. What database index would support `GET /orders?userId=x&sort=-createdAt`?
4. How do you stop one tenant from accessing another tenant's data?
5. Why is `User.update(req.body)` dangerous?
6. How would you make a payment callback idempotent?
7. How do you debug a slow database endpoint?
8. When would you embed vs reference in MongoDB?
9. When is SQL a better choice than MongoDB?
10. How do you prevent SSRF in an endpoint that fetches a user-provided URL?
