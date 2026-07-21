# Revision Notes: CommonJS vs ES Modules

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
| CommonJS | Legacy Node module system using require and module.exports. |
| ESM | Standard JavaScript module system using import and export. |
| type field | package.json option that controls whether .js files are ESM or CJS. |
| Dynamic import | Asynchronous import expression that can load ESM from CJS. |
| Interop | Rules for importing CJS from ESM and ESM from CJS. |

---

# Interview Questions & Answers

### 1. How would you explain CommonJS vs ES Modules in a real backend project?

CommonJS vs ES Modules should be explained through the request or process flow it affects, the runtime behavior behind it, and the production tradeoff. A senior answer connects the API to latency, correctness, failure handling, and maintainability.

### 2. What happens internally when CommonJS vs ES Modules is involved?

JavaScript executes on the main thread; libuv and the operating system handle asynchronous I/O behind the scenes. The event loop advances through phases, while microtasks and process.nextTick run at special checkpoints. CPU-heavy JavaScript blocks the event loop unless it is moved to worker threads, separate processes, or external systems.

### 3. What is a common production bug related to CommonJS vs ES Modules?

Saying Node.js is multithreaded without separating JavaScript execution, libuv thread pool work, worker threads, and cluster workers.

### 4. How would you debug an issue in CommonJS vs ES Modules?

Reproduce the failing input, inspect logs and stack traces, isolate the boundary involved, add focused instrumentation, and write a regression test once the cause is known.

### 5. What should a senior engineer check in code review?

Does this block the event loop? Which work uses libuv or the OS? How would I measure delay under load?

---

# Quick Practice

1. Explain CommonJS vs ES Modules in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
