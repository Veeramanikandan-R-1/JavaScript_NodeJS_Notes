# Callbacks, Promises, and async-await (Senior Backend Node.js Engineer Perspective)

Before going deeper into frameworks or libraries, understand this topic as part of real backend engineering: choosing and debugging asynchronous control flow in Node.js.

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
| Callback | Function passed to be called later, usually with error-first convention. |
| Promise | Object representing eventual success or failure. |
| async function | Function that always returns a promise and lets you await inside it. |
| Error-first callback | Node convention where the first callback argument is an error. |
| Concurrency | Starting independent async work together instead of awaiting sequentially. |

---

# 3. Internal Working

* JavaScript executes on the main thread; libuv and the operating system handle asynchronous I/O behind the scenes.
* The event loop advances through phases, while microtasks and process.nextTick run at special checkpoints.
* CPU-heavy JavaScript blocks the event loop unless it is moved to worker threads, separate processes, or external systems.

---

# 4. Common Mistakes

* Saying Node.js is multithreaded without separating JavaScript execution, libuv thread pool work, worker threads, and cluster workers.
* Using synchronous filesystem, crypto, compression, or JSON-heavy work on hot request paths.
* Assuming promises make CPU work non-blocking.
* Using global error handlers as normal control flow instead of last-resort safety nets.

---

# 5. Best Practices

* Keep hot request handlers non-blocking and short.
* Measure event loop delay and slow operations before optimizing.
* Understand which work uses the libuv thread pool and which work uses the OS directly.
* Use graceful shutdown so in-flight requests and database connections close predictably.

---

# 6. Code Example

```js
async function loadUserWithTasks(userRepo, taskRepo, userId) {
  const user = await userRepo.findById(userId);
  if (!user) return null;

  const tasks = await taskRepo.findByOwner(user.id);
  return { ...user, tasks };
}
```

---

# 7. Real-world Scenarios

* Building a service where callbacks, promises, and async-await affects correctness or latency.
* Debugging a production issue caused by a weak mental model of callbacks, promises, and async-await.
* Explaining callbacks, promises, and async-await in a senior backend interview with tradeoffs and examples.

---

# 8. Senior Deep Dive

## When to Use

* Keep hot request handlers non-blocking and short.
* Measure event loop delay and slow operations before optimizing.
* Understand which work uses the libuv thread pool and which work uses the OS directly.
* Use graceful shutdown so in-flight requests and database connections close predictably.

## Debug Checklist

* Reproduce with the smallest input and environment that fails.
* Inspect logs, stack traces, request data, resource usage, and dependency behavior.
* Does this block the event loop?
* Which work uses libuv or the OS?
* How would I measure delay under load?

## Code Review Checklist

* Does this block the event loop?
* Which work uses libuv or the OS?
* How would I measure delay under load?

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
| Callback | Function passed to be called later, usually with error-first convention. |
| Promise | Object representing eventual success or failure. |
| async function | Function that always returns a promise and lets you await inside it. |
| Error-first callback | Node convention where the first callback argument is an error. |
| Concurrency | Starting independent async work together instead of awaiting sequentially. |

---

# Interview Questions with Answers

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

# Hands-on Exercises

## Exercise 1

Build a small example that demonstrates this topic: Callbacks, Promises, and async-await.

### Solution

Keep it focused, handle one failure path, and write down what happens internally.

## Exercise 2

Turn this topic into a code review checklist: Callbacks, Promises, and async-await.

### Solution

Include these checks: Does this block the event loop? Which work uses libuv or the OS? How would I measure delay under load?

---

# Senior Backend Engineer Takeaway

For senior-level work, Callbacks, Promises, and async-await is not only an API or syntax detail. You should be able to explain the mental model, choose the right pattern for a product requirement, identify common failure modes, and verify behavior with tests, logs, profiling, and production-aware review.
