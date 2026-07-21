# Revision Notes: Caching and Redis

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
| Cache | Fast store for data that can be recomputed or refetched. |
| TTL | Time to live before cached value expires. |
| Redis | In-memory data store often used for caching, rate limits, sessions, and queues. |
| Invalidation | Removing stale data when source changes. |
| Cache key | Stable identifier for cached value. |

---

# Interview Questions & Answers

### 1. How would you explain Caching and Redis in a real backend project?

Caching and Redis should be explained through the request or process flow it affects, the runtime behavior behind it, and the production tradeoff. A senior answer connects the API to latency, correctness, failure handling, and maintainability.

### 2. What happens internally when Caching and Redis is involved?

Node performance is usually about event loop health, I/O latency, payload size, database queries, and CPU hotspots. The libuv thread pool handles selected blocking native operations; cluster and PM2 scale across CPU cores with multiple processes. Worker threads parallelize CPU-heavy JavaScript inside a process.

### 3. What is a common production bug related to Caching and Redis?

Adding cluster workers before fixing slow queries or blocking JavaScript.

### 4. How would you debug an issue in Caching and Redis?

Reproduce the failing input, inspect logs and stack traces, isolate the boundary involved, add focused instrumentation, and write a regression test once the cause is known.

### 5. What should a senior engineer check in code review?

What is the measured bottleneck? Can this scale statelessly? What happens at p99 latency?

---

# Quick Practice

1. Explain Caching and Redis in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
