# Revision Notes: Routing, Controllers, and Services

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
| Router | Grouped route definitions for one resource or feature. |
| Controller | HTTP adapter that maps request to service call and service result to response. |
| Service | Business logic that should not depend on Express. |
| Repository | Persistence boundary. |
| DTO | Input or output shape crossing a boundary. |

---

# Interview Questions & Answers

### 1. How would you explain Routing, Controllers, and Services in a real backend project?

Routing, Controllers, and Services should be explained through the request or process flow it affects, the runtime behavior behind it, and the production tradeoff. A senior answer connects the API to latency, correctness, failure handling, and maintainability.

### 2. What happens internally when Routing, Controllers, and Services is involved?

Express is a routing and middleware layer on top of Node's HTTP server. Middleware runs in registration order and must either end the response or call next. Requests and responses are streams, even when Express hides most stream details.

### 3. What is a common production bug related to Routing, Controllers, and Services?

Forgetting to return after sending a response and accidentally continuing request logic.

### 4. How would you debug an issue in Routing, Controllers, and Services?

Reproduce the failing input, inspect logs and stack traces, isolate the boundary involved, add focused instrumentation, and write a regression test once the cause is known.

### 5. What should a senior engineer check in code review?

Is the controller thin? Are validation and auth centralized? Are status codes and errors consistent?

---

# Quick Practice

1. Explain Routing, Controllers, and Services in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
