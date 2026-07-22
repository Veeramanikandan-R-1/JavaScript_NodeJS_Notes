# Revision Notes: Status Codes and API Error Design

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
| 400 | Bad request or validation failure. |
| 401 | Caller is not authenticated. |
| 403 | Caller is authenticated but not allowed. |
| 404 | Resource not found or intentionally hidden. |
| 500 | Unexpected server failure. |

---

# Interview Questions & Answers

### 1. How do you decide between `400`, `401`, `403`, `404`, and `409` in an API?

`400` is malformed or invalid input, `401` means authentication is missing or invalid, `403` means the user is known but not allowed, `404` means the resource is not visible or does not exist, and `409` means the request conflicts with current state.

### 2. What should a good API error response contain?

It should include a stable error code, a human-readable message, and field-level details when validation fails. It should not leak stack traces, SQL or Mongo internals, secret values, or authorization clues.

### 3. When would you return `202 Accepted` instead of `200 OK` or `201 Created`?

Use `202` when the request was accepted but work continues asynchronously, such as queueing a report export. The response should give the client a job id or status URL rather than pretending the work is complete.

### 4. How do you keep error handling consistent across many Express routes?

Throw or return known error types from services and centralize HTTP mapping in one error middleware. That prevents each route from inventing its own status codes and response shape.

### 5. What is wrong with returning `200` for every API response and putting success or failure inside the body?

Clients, proxies, observability tools, retries, and caches all understand HTTP status codes. Hiding failures inside a `200` response makes integrations harder to reason about and often breaks alerting.

---

# Quick Practice

1. Explain Status Codes and API Error Design in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
