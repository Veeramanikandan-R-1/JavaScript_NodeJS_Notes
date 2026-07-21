# Revision Notes: Worker Threads for CPU-heavy Tasks

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Measure p50, p95, p99 latency, event loop lag, CPU, memory, and database timings.
* Best practice: Use streaming, pagination, compression, caching, and indexes deliberately.
* Best practice: Scale stateless processes horizontally.
* Best practice: Use worker threads only for clear CPU-bound jobs.
* Avoid: Adding cluster workers before fixing slow queries or blocking JavaScript.
* Avoid: Keeping state in memory and then expecting multi-process scaling to work.
* Avoid: Increasing UV_THREADPOOL_SIZE without understanding the actual bottleneck.
* Avoid: Caching data without invalidation and freshness rules.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| Worker | Thread running JavaScript in parallel. |
| workerData | Initial data passed to a worker. |
| parentPort | Message channel back to the parent thread. |
| SharedArrayBuffer | Optional shared memory mechanism. |
| CPU-bound | Work limited by computation rather than I/O waiting. |

---

# Interview Questions & Answers

### 1. How would you explain Worker Threads for CPU-heavy Tasks in a real backend project?

Worker Threads for CPU-heavy Tasks should be explained through the request or process flow it affects, the runtime behavior behind it, and the production tradeoff. A senior answer connects the API to latency, correctness, failure handling, and maintainability.

### 2. What happens internally when Worker Threads for CPU-heavy Tasks is involved?

Node performance is usually about event loop health, I/O latency, payload size, database queries, and CPU hotspots. The libuv thread pool handles selected blocking native operations; cluster and PM2 scale across CPU cores with multiple processes. Worker threads parallelize CPU-heavy JavaScript inside a process.

### 3. What is a common production bug related to Worker Threads for CPU-heavy Tasks?

Adding cluster workers before fixing slow queries or blocking JavaScript.

### 4. How would you debug an issue in Worker Threads for CPU-heavy Tasks?

Reproduce the failing input, inspect logs and stack traces, isolate the boundary involved, add focused instrumentation, and write a regression test once the cause is known.

### 5. What should a senior engineer check in code review?

What is the measured bottleneck? Can this scale statelessly? What happens at p99 latency?

---

# Quick Practice

1. Explain Worker Threads for CPU-heavy Tasks in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
