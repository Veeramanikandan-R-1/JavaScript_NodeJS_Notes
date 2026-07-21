# Revision Notes: Mocking External Services

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
| Boundary mock | Mock at the external provider boundary. |
| Contract | Shape your app expects from provider responses. |
| Fake | Small in-memory implementation used by tests. |
| Network isolation | Tests should not depend on live external services. |
| Verification | Assert the provider was called with safe expected data. |

---

# Interview Questions & Answers

### 1. How would you explain Mocking External Services in a real backend project?

Mocking External Services should be explained through the request or process flow it affects, the runtime behavior behind it, and the production tradeoff. A senior answer connects the API to latency, correctness, failure handling, and maintainability.

### 2. What happens internally when Mocking External Services is involved?

A good backend test suite checks pure functions, services, HTTP behavior, database integration, and critical production flows. Jest runs test files in isolated workers; async tests must return or await promises. Supertest drives Express apps without requiring a real network port.

### 3. What is a common production bug related to Mocking External Services?

Mocking so much that the test no longer proves production behavior.

### 4. How would you debug an issue in Mocking External Services?

Reproduce the failing input, inspect logs and stack traces, isolate the boundary involved, add focused instrumentation, and write a regression test once the cause is known.

### 5. What should a senior engineer check in code review?

What is the production failure mode? How do tests prove it? How would a teammate maintain it?

---

# Quick Practice

1. Explain Mocking External Services in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
