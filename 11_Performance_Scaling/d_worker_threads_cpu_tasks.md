# Worker Threads for CPU-heavy Tasks (Senior Backend Node.js Engineer Perspective)

Before going deeper into frameworks or libraries, understand this topic as part of real backend engineering: parallelizing expensive JavaScript without blocking request handling.

---

# 1. Fundamentals

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.

---

# 2. Core Concepts

| Concept | Practical meaning |
| ------- | ----------------- |
| Worker | Thread running JavaScript in parallel. |
| workerData | Initial data passed to a worker. |
| parentPort | Message channel back to the parent thread. |
| SharedArrayBuffer | Optional shared memory mechanism. |
| CPU-bound | Work limited by computation rather than I/O waiting. |

---

# 3. Internal Working

* Node performance is usually about event loop health, I/O latency, payload size, database queries, and CPU hotspots.
* The libuv thread pool handles selected blocking native operations; cluster and PM2 scale across CPU cores with multiple processes.
* Worker threads parallelize CPU-heavy JavaScript inside a process.

---

# 4. Common Mistakes

* Adding cluster workers before fixing slow queries or blocking JavaScript.
* Keeping state in memory and then expecting multi-process scaling to work.
* Increasing UV_THREADPOOL_SIZE without understanding the actual bottleneck.
* Caching data without invalidation and freshness rules.

---

# 5. Best Practices

* Measure p50, p95, p99 latency, event loop lag, CPU, memory, and database timings.
* Use streaming, pagination, compression, caching, and indexes deliberately.
* Scale stateless processes horizontally.
* Use worker threads only for clear CPU-bound jobs.

---

# 6. Code Example

```js
import { Worker } from "node:worker_threads";

export function runCpuJob(input) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./cpu-worker.js", import.meta.url), {
      workerData: input,
    });
    worker.once("message", resolve);
    worker.once("error", reject);
  });
}
```

---
![Worker Threads for CPU-heavy Tasks](../assets/diagrams/scaling_models.svg)

---


# 7. Real-world Scenarios

* Building a service where worker threads for cpu-heavy tasks affects correctness or latency.
* Debugging a production issue caused by a weak mental model of worker threads for cpu-heavy tasks.
* Explaining worker threads for cpu-heavy tasks in a senior backend interview with tradeoffs and examples.

---

# 8. Senior Deep Dive

## When to Use

* Measure p50, p95, p99 latency, event loop lag, CPU, memory, and database timings.
* Use streaming, pagination, compression, caching, and indexes deliberately.
* Scale stateless processes horizontally.
* Use worker threads only for clear CPU-bound jobs.

## Debug Checklist

* Reproduce with the smallest input and environment that fails.
* Inspect logs, stack traces, request data, resource usage, and dependency behavior.
* What is the measured bottleneck?
* Can this scale statelessly?
* What happens at p99 latency?

## Code Review Checklist

* What is the measured bottleneck?
* Can this scale statelessly?
* What happens at p99 latency?

---

# Revision Notes

* This topic matters because backend bugs affect users, data, security, and operations.
* Learn the runtime mental model before memorizing framework syntax.
* Prefer small examples, tests, and production-style failure checks.
* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.

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

# Interview Questions with Answers

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

# Hands-on Exercises

## Exercise 1

Build a small example that demonstrates this topic: Worker Threads for CPU-heavy Tasks.

### Solution

Keep it focused, handle one failure path, and write down what happens internally.

## Exercise 2

Turn this topic into a code review checklist: Worker Threads for CPU-heavy Tasks.

### Solution

Include these checks: What is the measured bottleneck? Can this scale statelessly? What happens at p99 latency?

---

# Senior Backend Engineer Takeaway

For senior-level work, Worker Threads for CPU-heavy Tasks is not only an API or syntax detail. You should be able to explain the mental model, choose the right pattern for a product requirement, identify common failure modes, and verify behavior with tests, logs, profiling, and production-aware review.
