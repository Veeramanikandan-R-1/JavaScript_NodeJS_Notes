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

### 1. When should you use worker threads in Node.js?

Worker threads are useful for CPU-heavy JavaScript work such as parsing large data, compression orchestration, calculations, or transformations that would otherwise block the event loop. They are not a replacement for async I/O, and they add communication overhead, so I use them only after measuring CPU pressure.

### 2. How are worker threads different from cluster processes?

Workers are threads inside one process and can share memory with `SharedArrayBuffer` when needed. Cluster uses separate processes with separate heaps and is usually for scaling servers across CPU cores. Worker threads fit offloading CPU tasks; cluster fits running multiple server instances.

### 3. What should you avoid sending to a worker?

I avoid sending huge objects repeatedly because serialization and copying can erase the benefit. For large binary data, transfer `ArrayBuffer`s or use shared memory carefully. The message boundary should be small, explicit, and measured.

### 4. How do you handle errors and timeouts in a worker pool?

Each task should have a timeout, cancellation or abandonment strategy, structured error propagation, and worker replacement after crashes. The caller should receive a domain error rather than hanging forever. Pools also need backpressure so requests do not enqueue unlimited CPU work.

### 5. Why not create a new worker for every request?

Worker startup has overhead, and unbounded workers can overwhelm CPU and memory. A bounded pool lets you control concurrency, queue length, and timeouts. If the queue grows, the API should shed load or return a clear busy response instead of silently degrading everything.

---

# Quick Practice

1. Explain Worker Threads for CPU-heavy Tasks in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
