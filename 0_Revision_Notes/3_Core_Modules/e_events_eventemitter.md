# Revision Notes: events Module and EventEmitter

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Prefer path helpers, fs/promises, pipeline, AbortController, and explicit error handling.
* Best practice: Use streams for large or continuous data.
* Best practice: Wrap low-level core modules behind small application-specific helpers.
* Best practice: Know the core APIs well enough to debug framework behavior.
* Avoid: Building paths with string concatenation instead of the path module.
* Avoid: Loading large files fully into memory when a stream would be safer.
* Avoid: Forgetting error listeners on EventEmitters and streams.
* Avoid: Mixing CommonJS and ESM without understanding loading semantics.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| EventEmitter | Object that lets callers subscribe to and emit named events. |
| on | Registers a listener. |
| once | Registers a listener that is removed after the first event. |
| emit | Triggers listeners for an event name. |
| error event | Special event that can crash the process if emitted without a listener. |

---

# Interview Questions & Answers

### 1. Are EventEmitter listeners called synchronously or asynchronously?

They are called synchronously in registration order when `emit()` runs. If a listener does expensive work, it blocks the emitter and the current event loop turn.

### 2. Why is the `error` event special in Node's EventEmitter?

If an `error` event is emitted without a listener, Node throws and can crash the process. Production emitters should have clear error listeners or convert errors into promise/callback boundaries.

### 3. What does `MaxListenersExceededWarning` usually tell you?

It often indicates listeners are being added repeatedly without being removed, such as per request or per reconnect. It might be intentional fan-out, but you should prove it before raising the limit.

### 4. When would you use `.once()` instead of `.on()`?

Use `.once()` for lifecycle events that should be handled only once, such as ready, close, first response, or one-time cleanup. It avoids duplicate handling and reduces listener leaks.

### 5. What is risky about `async` EventEmitter listeners?

The emitter does not automatically await them, and rejected promises may be missed depending on configuration and usage. If ordering, failure, or backpressure matters, a promise-based API or queue may be clearer.

---

# Quick Practice

1. Explain events Module and EventEmitter in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
