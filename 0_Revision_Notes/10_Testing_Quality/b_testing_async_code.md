# Revision Notes: Testing Asynchronous Code

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
| await | Waits for a promise before continuing the test. |
| rejects | Jest helper for promise rejection assertions. |
| timeout | Limit for a test that may hang. |
| fake timer | Controlled timer implementation for timer-heavy code. |
| race | Common source of flaky tests when async work is not awaited. |

---

# Interview Questions & Answers

### 1. What is the most common mistake when testing async code in Jest?

Forgetting to return or await the promise. The test can finish before the assertion runs, producing false positives or unhandled rejections later. I want every async test to either `await` the operation, return the promise, or use `done` only for callback-style APIs where promises are not available.

### 2. How do you test that an async function rejects with the right error?

I would use `await expect(fn()).rejects.toThrow(...)` or assert a structured error shape if the service returns domain errors. Wrapping the call in a plain `try/catch` is fine too, but the test must fail if no rejection happens.

### 3. How do timers make async tests flaky?

Real timers depend on machine speed, event-loop scheduling, and CI load. I use fake timers for deterministic timeout, debounce, retry, and backoff logic, then advance time explicitly. For code that mixes timers and promises, I make sure queued microtasks are flushed before assertions.

### 4. How would you test retry logic without making the test slow?

I would inject the delay function or use fake timers, make the dependency fail a known number of times, and assert the number of attempts plus final result. The test should verify backoff behavior without actually sleeping for seconds.

### 5. What does an unhandled rejection in a passing test suite tell you?

It usually means some async work escaped the test's lifecycle. I would look for missing awaits, background tasks not stopped in teardown, mocked callbacks throwing outside the test, or server/database handles left open. A passing assertion is not enough if the process reports async errors afterward.

---

# Quick Practice

1. Explain Testing Asynchronous Code in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
