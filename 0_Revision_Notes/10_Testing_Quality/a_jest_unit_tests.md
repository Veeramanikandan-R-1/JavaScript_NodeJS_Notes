# Revision Notes: Jest Unit Tests

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
| test | One executable behavior check. |
| expect | Assertion API in Jest. |
| matcher | Specific assertion such as toEqual or toThrow. |
| fixture | Known input data used by tests. |
| coverage | Signal of exercised code, not proof of quality by itself. |

---

# Interview Questions & Answers

### 1. What makes a good unit test in a Node.js service?

A good unit test verifies one behavior with clear inputs and observable output, without depending on network, time, filesystem, or database state unless that is the subject. It should fail for a real regression, not for harmless refactoring. I prefer testing business decisions and edge cases over implementation details.

### 2. When is mocking useful, and when does it make tests weaker?

Mocking is useful at process boundaries such as email clients, payment SDKs, queues, and clocks. It becomes harmful when the test mostly asserts that private methods were called in a certain order. If a mock hides the real contract, I add an integration or contract test to cover the boundary.

### 3. How would you test error handling in a service function?

I would force the dependency to reject or return a known failure, then assert the service returns the right domain error, does not perform unsafe side effects, and logs or reports the failure if that is part of the contract. Error paths deserve first-class tests because they are often less exercised manually.

### 4. What is the difference between code coverage and useful confidence?

Coverage tells me which lines ran, not whether the important behavior was verified. A project can have high coverage with weak assertions. I use coverage to find blind spots, but confidence comes from meaningful assertions around business rules, boundaries, failures, and regressions.

### 5. How do you keep Jest tests maintainable as the codebase grows?

I keep test data builders small, avoid global mutable fixtures, reset mocks consistently, and name tests around behavior. Slow integration tests should be separated from fast unit tests so developers can run the right suite locally and CI can still enforce the full safety net.

---

# Quick Practice

1. Explain Jest Unit Tests in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
