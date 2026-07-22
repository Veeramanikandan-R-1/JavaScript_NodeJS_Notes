# Revision Notes: libuv Thread Pool

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
| UV_THREADPOOL_SIZE | Environment variable that controls libuv thread pool size. |
| fs | Filesystem operations commonly use the thread pool. |
| crypto | Selected expensive crypto APIs use the thread pool. |
| dns.lookup | Name lookup API that uses the thread pool. |
| Starvation | Pool saturated by slow tasks causing unrelated tasks to wait. |

---

# Interview Questions & Answers

### 1. What work uses the libuv thread pool in Node.js?

Several async APIs use the pool, including many filesystem operations, DNS `lookup`, zlib, and crypto operations such as `pbkdf2` and `scrypt`. These operations do not block the JavaScript thread directly, but they can queue behind each other when the pool is saturated.

### 2. How can the thread pool become a production bottleneck?

If many expensive crypto, compression, or filesystem tasks run at once, the default pool can fill up and unrelated operations wait. The API may look async in code but still show high latency. I would monitor operation duration, queue symptoms, CPU, and dependency timing before changing pool size.

### 3. Should you always increase `UV_THREADPOOL_SIZE` for better performance?

No. A bigger pool can improve throughput for some I/O or native tasks, but it can also increase CPU contention and memory use. I would benchmark with realistic concurrency and set it before the process starts. For true CPU-heavy JavaScript, worker threads or separate services are usually more appropriate.

### 4. Why can password hashing affect unrelated file operations?

Algorithms like bcrypt or scrypt often use native worker threads. If login traffic saturates the pool, filesystem operations that also need the pool can wait. This is why authentication load, job workers, and API work sometimes need separate processes or careful concurrency limits.

### 5. How do you design around expensive thread-pool tasks?

I would cap concurrency, use queues for bursty workloads, separate worker processes for heavy jobs, tune pool size based on measurement, and avoid mixing latency-sensitive API work with batch processing in the same process.

---

# Quick Practice

1. Explain libuv Thread Pool in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
