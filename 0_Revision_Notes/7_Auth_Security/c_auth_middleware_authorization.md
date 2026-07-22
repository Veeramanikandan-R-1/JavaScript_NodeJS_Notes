# Revision Notes: Auth Middleware and Authorization

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Hash passwords with bcrypt, argon2, or another password-hashing algorithm.
* Best practice: Keep secrets in environment-managed secret stores, never in source.
* Best practice: Use middleware for authentication and policy checks.
* Best practice: Add input validation, rate limiting, security headers, and audit-friendly logs.
* Avoid: Putting sensitive data into JWT payloads.
* Avoid: Storing plaintext passwords or using fast hashes for passwords.
* Avoid: Confusing CORS with backend access control.
* Avoid: Returning different error details that leak user existence or internal state.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| Authentication middleware | Loads the caller from a credential such as a token. |
| Authorization | Policy decision for a specific action. |
| Resource ownership | Ensures users can only access their own data unless policy allows more. |
| Role | Coarse permission grouping such as admin or member. |
| Policy | Reusable rule for access decisions. |

---

# Interview Questions & Answers

### 1. What is the difference between authentication and authorization in an Express API?

Authentication answers who the caller is. Authorization answers whether that caller can perform this action on this resource, and it usually needs resource context such as owner, tenant, role, or scope.

### 2. Where should authorization checks live?

Do coarse checks in middleware when route-level requirements are simple, then enforce resource-specific rules in the service or policy layer. Do not rely only on frontend hiding or route naming conventions.

### 3. A user can access `/projects/:id` from another tenant by guessing an id. What went wrong?

The query likely checked only `_id` and forgot tenant or ownership constraints. In multi-tenant systems, authorization should be reflected in the data lookup, such as `{ _id, tenantId }`, not just checked afterward.

### 4. How do you pass authenticated user data through the request safely?

Attach a small, verified principal object containing ids, tenant, scopes, and session metadata. Avoid attaching the whole database user document because it may be stale, oversized, or accidentally exposed.

### 5. How do you test authorization beyond the happy path?

Write tests for unauthenticated requests, wrong role, wrong tenant, inactive account, and resource ownership boundaries. The most important tests prove that a valid user cannot access someone else's data.

---

# Quick Practice

1. Explain Auth Middleware and Authorization in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
