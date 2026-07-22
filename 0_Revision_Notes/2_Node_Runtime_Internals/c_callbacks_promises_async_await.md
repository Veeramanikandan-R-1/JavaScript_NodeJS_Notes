# Revision Notes: Callbacks, Promises, and async-await

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
| Callback | Function passed to be called later, usually with error-first convention. |
| Promise | Object representing eventual success or failure. |
| async function | Function that always returns a promise and lets you await inside it. |
| Error-first callback | Node convention where the first callback argument is an error. |
| Concurrency | Starting independent async work together instead of awaiting sequentially. |

---

# Interview Questions & Answers

### 1. What bug do you look for first when reviewing `async` route handlers?

I look for unhandled rejections, missing `await`, swallowed errors, and responses sent before async work finishes. In Express-style code, rejected promises must reach the error middleware.

### 2. Why is `await` inside a loop sometimes correct and sometimes a performance problem?

It is correct when each operation depends on the previous result or when you intentionally limit pressure. It is wasteful when independent I/O could run concurrently with `Promise.all` or a bounded concurrency helper.

### 3. How do you convert callback APIs safely without changing behavior?

Use promise-native APIs when available or `util.promisify` for Node-style callbacks. Preserve error-first semantics, `this` binding where needed, cancellation behavior, and resource cleanup.

### 4. What is the difference between returning a promise and awaiting it inside a `try/catch`?

Returning passes the promise to the caller, so the caller must handle rejection. Awaiting inside `try/catch` lets the current function add context, translate errors, or perform local cleanup before rethrowing.

### 5. How do you prevent partial success bugs across multiple awaited operations?

Define whether the operation needs a transaction, idempotency key, compensating action, or retry strategy. Async syntax does not solve consistency; it only makes sequencing easier to read.

---

# Quick Practice

1. Explain Callbacks, Promises, and async-await in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
