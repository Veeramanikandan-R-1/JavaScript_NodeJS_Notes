# Revision Notes: Validation and Sanitization

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Keep route handlers thin: parse input, call a service, send a response.
* Best practice: Centralize validation, authentication, and error mapping.
* Best practice: Use correct status codes and response shapes.
* Best practice: Test APIs through HTTP using Supertest or an equivalent tool.
* Avoid: Forgetting to return after sending a response and accidentally continuing request logic.
* Avoid: Putting business logic directly inside route handlers.
* Avoid: Letting validation, auth, and error behavior drift across routes.
* Avoid: Using generic 500 responses for client input errors.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| Validation | Checks whether input is acceptable. |
| Sanitization | Transforms input into safe normalized form. |
| Allowlist | Accept known fields and reject or ignore everything else. |
| Schema | Reusable definition of input shape and constraints. |
| Error mapping | Converting validation failures into useful 400 responses. |

---

# Interview Questions & Answers

### 1. Where should request validation happen in an Express API?

Validate at the boundary before business logic runs, usually with a schema attached to the route or middleware. The service can still enforce domain invariants, but it should receive already-shaped input.

### 2. What is the difference between validation and sanitization?

Validation decides whether input is acceptable. Sanitization transforms input, such as trimming strings or normalizing email case, and should be explicit because silent changes can surprise clients.

### 3. How do you prevent mass-assignment bugs in a JSON API?

Do not pass `req.body` directly into database updates. Pick allowed fields from a validated schema so clients cannot set internal fields like `role`, `isAdmin`, `ownerId`, or account state.

### 4. How would you report validation errors to frontend or API clients?

Return a `400` or `422` with a stable error code and field-level messages. Keep the shape consistent so clients can attach errors to form fields without parsing free-form text.

### 5. Why is database validation alone not enough for an HTTP API?

Database validation protects storage, but it often produces late, inconsistent, or overly technical errors. API boundary validation gives better client feedback and prevents unnecessary business logic or database work.

---

# Quick Practice

1. Explain Validation and Sanitization in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
