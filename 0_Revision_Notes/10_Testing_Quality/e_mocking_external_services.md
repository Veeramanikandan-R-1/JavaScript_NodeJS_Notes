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

### 1. When would you mock an external service instead of calling its sandbox?

For normal unit and integration tests, I mock the external boundary so tests are fast, deterministic, and do not depend on provider uptime or rate limits. I still keep a smaller set of contract or smoke tests against the sandbox to catch drift in provider behavior.

### 2. What is the risk of mocking an SDK method directly?

SDK internals can change, and your mock may not match the real HTTP contract or error shape. I prefer wrapping provider SDKs behind a small adapter that my application owns. Then tests mock the adapter, while adapter-level tests verify mapping to the provider.

### 3. How do you test webhook handling from a payment or email provider?

I would verify signature validation, timestamp tolerance, idempotency, event ordering assumptions, and the domain state change caused by the event. The test should include duplicate delivery because providers commonly retry webhooks. It should also reject malformed or unsigned payloads.

### 4. What should a mock response include besides the happy-path data?

It should include realistic status codes, provider error codes, retry-after headers if relevant, timeouts, malformed responses, and rate-limit cases. Production incidents often come from edge responses, not from the simple success response in the documentation.

### 5. How do you know your mocks have not drifted from the real provider?

I use provider contract tests, recorded fixtures when appropriate, schema validation, and periodic sandbox smoke tests in CI or scheduled checks. The adapter should fail loudly when it receives an unknown status or event type so drift is visible.

---

# Quick Practice

1. Explain Mocking External Services in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
