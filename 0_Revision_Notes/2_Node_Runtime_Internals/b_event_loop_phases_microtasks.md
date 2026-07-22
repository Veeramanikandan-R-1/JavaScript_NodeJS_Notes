# Revision Notes: Event Loop Phases and Microtasks

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
| Timers | Runs callbacks scheduled by setTimeout and setInterval when ready. |
| Poll | Receives new I/O events and may wait for more I/O. |
| Check | Runs setImmediate callbacks. |
| Close callbacks | Runs close event callbacks for handles such as sockets. |
| Microtasks | Promise jobs and nextTick callbacks that run between larger event-loop steps. |

---

# Interview Questions & Answers

### 1. In what order do timers, I/O callbacks, `setImmediate`, promises, and `process.nextTick` usually run?

Node runs event loop phases such as timers, poll, and check, but drains `process.nextTick` and promise microtasks at checkpoints between phases. `process.nextTick` has priority over promise microtasks, which is why it must be used carefully.

### 2. Why can recursive `process.nextTick` calls break a healthy service?

They can starve the event loop by keeping Node busy before it returns to I/O, timers, or `setImmediate`. In production this looks like sockets hanging even though the process is still alive.

### 3. When would you choose `setImmediate` over `setTimeout(fn, 0)`?

Use `setImmediate` when you want work to run in the check phase after the current poll cycle, especially after I/O. `setTimeout(fn, 0)` is timer-based and its ordering can vary depending on where it is scheduled.

### 4. A service has low CPU but high latency. How can the event loop still be involved?

The loop may be waiting on slow I/O, saturated downstreams, thread pool work, or queues of callbacks. I would compare event loop delay, active handles, downstream latency, and concurrency limits.

### 5. What is a bad use of microtasks in backend code?

Using promise chains or `nextTick` recursion to process large queues without yielding. Batch the work and yield with `setImmediate`, streams, queues, or backpressure-aware mechanisms.

---

# Quick Practice

1. Explain Event Loop Phases and Microtasks in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
