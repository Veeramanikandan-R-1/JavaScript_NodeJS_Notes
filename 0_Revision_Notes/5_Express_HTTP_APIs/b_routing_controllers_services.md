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

### 1. Where do you draw the line between route, controller, and service in an Express API?

The route maps method and path to middleware. The controller handles HTTP translation, while the service owns business rules and orchestration; this keeps product behavior testable without faking Express objects everywhere.

### 2. A controller has 150 lines of validation, database calls, and response formatting. What would you refactor first?

I would move validation into a schema or middleware and move business decisions into a service. The controller should become small enough that review focuses on HTTP mapping rather than hidden domain logic.

### 3. How do you handle route versioning without duplicating the whole codebase?

Version the HTTP contract at the routing/controller edge and reuse services when business behavior is the same. If behavior diverges, make that divergence explicit rather than hiding it behind conditionals spread through shared code.

### 4. How should controllers communicate service failures to clients?

Services can return typed results or throw domain-specific errors, and the controller or central error mapper converts them to status codes. Avoid services that directly call `res.status()` because that couples business logic to Express.

### 5. What routing issue commonly causes security bugs in Express apps?

Putting broad or parameterized routes before specific protected routes can send requests through the wrong handler or middleware chain. Route order is part of the API contract and deserves tests for sensitive paths.

---

# Quick Practice

1. Explain Routing, Controllers, and Services in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
