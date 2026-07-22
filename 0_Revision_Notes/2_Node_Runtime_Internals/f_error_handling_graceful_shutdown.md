# Revision Notes: Advanced Error Handling and Graceful Shutdown

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Keep hot request handlers non-blocking and short.
* Best practice: Measure event loop delay and slow operations before optimizing.
* Best practice: Understand which work uses the libuv thread pool and which work uses the OS directly.
* Best practice: Use graceful shutdown so in-flight requests and database connections close predictably.
* Avoid: Saying Node.js is multithreaded without separating JavaScript execution, libuv thread pool work, worker threads, and cluster workers.
* Avoid: Using synchronous filesystem, crypto, compression, or JSON-heavy work on hot request paths.
* Avoid: Assuming promises make CPU work non-blocking.
* Avoid: Using global error handlers as normal control flow instead of last-resort safety nets.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| Operational error | Expected runtime failure such as invalid input, timeout, or database unavailable. |
| Programmer error | Bug such as undefined access, bad invariant, or wrong API usage. |
| Error middleware | Express middleware with err, req, res, next signature. |
| Unhandled rejection | Promise rejection that was not caught. |
| Graceful shutdown | Stop accepting work, finish or cancel in-flight work, close resources, then exit. |

---

# Interview Questions & Answers

### 1. How do you decide whether an error should return 400, 401, 404, 409, or 500?

Classify whether the client sent invalid input, lacks authentication, requested a missing resource, violated a state conflict, or hit an unexpected server failure. The response should be stable for clients and detailed enough in logs for operators.

### 2. What is your policy for `uncaughtException` and `unhandledRejection`?

Treat them as serious programming or lifecycle failures: log with context, start graceful shutdown if possible, and let the process restart. Do not pretend the process is definitely safe after unknown state corruption.

### 3. What should graceful shutdown do for an HTTP server?

Stop accepting new connections, finish active requests within a timeout, close keep-alive sockets when appropriate, release database and queue resources, and exit with a meaningful status. The timeout prevents endless draining.

### 4. Why is wrapping every error as `Error: Something went wrong` harmful?

It destroys diagnostic information and makes alerts unactionable. Preserve the original error with `cause`, attach safe context, and map internal errors to clean client responses at the boundary.

### 5. How do you test shutdown behavior without waiting for a real deployment failure?

Write integration tests or local scripts that send `SIGTERM`, hold a request open, verify readiness changes, and confirm resources close before timeout. Shutdown is production behavior and deserves repeatable testing.

---

# Quick Practice

1. Explain Advanced Error Handling and Graceful Shutdown in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
