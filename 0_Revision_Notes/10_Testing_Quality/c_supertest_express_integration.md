# Revision Notes: Supertest Express Integration Tests

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Use unit tests for pure logic and integration tests for API behavior.
* Best practice: Reset test data deterministically.
* Best practice: Mock external providers at the boundary, not internal services by default.
* Best practice: Make failures readable with good fixtures and explicit assertions.
* Avoid: Mocking so much that the test no longer proves production behavior.
* Avoid: Sharing test data across tests and creating order dependence.
* Avoid: Testing only happy paths.
* Avoid: Skipping auth, validation, and database edge cases.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| Supertest | HTTP assertion library for Express apps. |
| Integration test | Checks multiple layers working together. |
| Test app export | Export app separately from server.listen. |
| Status assertion | Checks expected HTTP status. |
| Response body assertion | Checks response contract. |

---

# Interview Questions & Answers

### 1. What should a Supertest integration test cover that a unit test does not?

It should exercise the real HTTP boundary: routing, middleware order, validation, authentication behavior, status codes, headers, and response shape. I still mock external systems when needed, but the Express app should behave like it does in production for that request path.

### 2. Why is middleware order a good target for integration tests?

Many Express bugs come from auth, parsers, validation, and error handlers being registered in the wrong order. A Supertest test catches those mistakes because it sends an actual request through the stack. A controller unit test would miss them.

### 3. How do you test authenticated routes with Supertest?

I either generate a real test token/session using the same signing configuration or seed a test user and log in through the auth route if the flow matters. I avoid bypassing auth middleware unless the test is explicitly scoped to controller logic, because bypassing it hides integration failures.

### 4. What do you assert in an API error response test?

I assert the status code, stable error code or message shape, content type, and that sensitive internal details are not leaked. For validation errors, I also check field-level information if the API contract promises it. Logs can be checked separately when observability is part of the requirement.

### 5. How do you keep Supertest suites from becoming slow and brittle?

I build the app without calling `listen`, share lightweight setup helpers, seed only the data each test needs, and clean state deterministically. I also keep broad end-to-end flows limited; most API tests should cover one endpoint behavior at a time.

---

# Quick Practice

1. Explain Supertest Express Integration Tests in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
