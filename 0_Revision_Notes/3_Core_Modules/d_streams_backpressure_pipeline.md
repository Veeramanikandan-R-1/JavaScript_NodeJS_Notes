# Revision Notes: Streams, Backpressure, and pipeline

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
| Readable | Produces chunks. |
| Writable | Consumes chunks. |
| Duplex | Readable and writable at the same time. |
| Transform | Changes chunks while passing them through. |
| Backpressure | Signal that the consumer is slower than the producer. |

---

# Interview Questions & Answers

### 1. How would you explain Streams, Backpressure, and pipeline in a real backend project?

Streams, Backpressure, and pipeline should be explained through the request or process flow it affects, the runtime behavior behind it, and the production tradeoff. A senior answer connects the API to latency, correctness, failure handling, and maintainability.

### 2. What happens internally when Streams, Backpressure, and pipeline is involved?

Core modules are part of Node.js and do not require npm installation. Many core APIs expose both callback and promise variants; modern application code usually prefers promise APIs. Streams, HTTP requests, process I/O, and many filesystem objects are event-driven abstractions.

### 3. What is a common production bug related to Streams, Backpressure, and pipeline?

Building paths with string concatenation instead of the path module.

### 4. How would you debug an issue in Streams, Backpressure, and pipeline?

Reproduce the failing input, inspect logs and stack traces, isolate the boundary involved, add focused instrumentation, and write a regression test once the cause is known.

### 5. What should a senior engineer check in code review?

Does this handle large data safely? Are paths and errors cross-platform? Would a stream or pipeline be safer?

---

# Quick Practice

1. Explain Streams, Backpressure, and pipeline in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
