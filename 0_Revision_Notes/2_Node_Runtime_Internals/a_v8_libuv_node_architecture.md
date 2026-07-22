# Revision Notes: V8, libuv, and Node Architecture

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
| V8 | Executes JavaScript and manages the JS heap. |
| libuv | Provides the event loop, thread pool, filesystem, TCP, timers, and platform abstraction. |
| Bindings | Native bridge between JavaScript APIs and C/C++ implementation. |
| Event loop | Coordinates callbacks when asynchronous work becomes ready. |
| Thread pool | Background native workers for selected blocking operations. |

---

# Interview Questions & Answers

### 1. Walk me through what happens when a Node.js API receives a request and then reads from a database.

V8 runs the JavaScript handler, while Node's native bindings and the OS handle socket I/O. The database call is asynchronous, so the event loop can keep serving other requests until the callback or promise continuation is ready.

### 2. Which work runs on the JavaScript main thread, and which work can move outside it?

Your JavaScript, JSON parsing, object manipulation, and synchronous loops run on the main thread. Some filesystem, DNS, crypto, and compression work can use libuv's worker pool, while many network operations are handled by the OS.

### 3. Why does a CPU-heavy route hurt unrelated requests in the same Node process?

It monopolizes the JavaScript thread, so the event loop cannot run callbacks, timers, or response work promptly. The fix is to reduce the work, stream it, cache it, or move it to workers, child processes, or another service.

### 4. How do you prove event loop blocking rather than guessing?

Measure event loop delay, CPU usage, request latency, and profiles under load. A flame graph or CPU profile showing long synchronous JavaScript frames is stronger evidence than intuition.

### 5. What is the libuv thread pool, and when do you think about tuning it?

It is a small pool used by selected async operations such as filesystem, crypto, zlib, and some DNS calls. Tune `UV_THREADPOOL_SIZE` only after measuring contention; it does not make JavaScript execution itself parallel.

---

# Quick Practice

1. Explain V8, libuv, and Node Architecture in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
