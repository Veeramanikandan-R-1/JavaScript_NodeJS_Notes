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

### 1. What makes a good candidate for Redis caching?

Data that is read often, somewhat expensive to compute or fetch, and acceptable to serve slightly stale is a good candidate. User permissions, rapidly changing balances, and strongly consistent workflows need more care. I always define the freshness requirement before adding cache.

### 2. How do you avoid cache stampede on a hot key?

I would use TTL jitter, request coalescing or locks, stale-while-revalidate, and sometimes prewarming for predictable hot data. The goal is to prevent many processes from recomputing the same value when a key expires at once.

### 3. What are the risks of cache-aside?

Cache-aside is simple, but invalidation is easy to get wrong. The app reads from cache, falls back to the database, then writes cache; writes must delete or update affected keys. Stale data, missing invalidation, and inconsistent key naming are the usual failure modes.

### 4. How would you design Redis keys for a backend service?

Keys should include domain, identifier, version when needed, and environment or tenant boundaries where relevant. I avoid keys that require broad scans in request paths. A clear naming convention helps invalidation and debugging, for example `user:v2:{userId}:profile`.

### 5. What do you monitor for Redis-backed caching?

I watch hit rate, latency, memory usage, evictions, key count, connection errors, command timeouts, and hot keys. A high hit rate is not enough if stale data is causing correctness issues, so I also track cache-related incidents and fallback database load.

---

# Quick Practice

1. Explain Caching and Redis in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
