# Revision Notes: process Object, Environment, and Signals

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
| process.argv | Arguments passed to the Node process. |
| process.env | Environment variables for config and secrets references. |
| process.cwd | Directory where the process was started. |
| Signals | OS notifications such as SIGTERM and SIGINT. |
| Exit code | Numeric status returned to the parent process or shell. |

---

# Interview Questions & Answers

### 1. Which `process` fields or methods do you commonly use in production services?

Common ones are `process.env`, `process.pid`, `process.cwd()`, `process.uptime()`, `process.memoryUsage()`, `process.hrtime.bigint()`, and signal handlers. They help with configuration, diagnostics, metrics, and lifecycle management.

### 2. Why should configuration from `process.env` be validated at startup?

Environment variables are strings and may be missing, malformed, or accidentally inherited. Failing fast at startup is much better than discovering a bad timeout, URL, or secret during live traffic.

### 3. What should happen when a Node process receives `SIGTERM` in Kubernetes or a process manager?

The service should stop accepting new work, let in-flight requests finish within a deadline, close database and queue connections, flush logs, and then exit. It should not keep running indefinitely.

### 4. Why is calling `process.exit()` inside normal request code dangerous?

It can terminate active requests, skip async cleanup, drop logs, and trigger restart loops. Normal application errors should be handled and reported, not converted into whole-process exits.

### 5. How do you handle secrets in environment variables during debugging?

Log whether required secrets are present and valid in shape, not their values. Redact known secret keys and avoid dumping `process.env` into logs or error reports.

---

# Quick Practice

1. Explain process Object, Environment, and Signals in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
