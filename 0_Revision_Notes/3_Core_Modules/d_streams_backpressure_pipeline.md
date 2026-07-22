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

### 1. What does backpressure mean in a Node.js stream pipeline?

It means the writable side is telling the readable side to slow down because its internal buffer is full. Respecting `write()` returning `false`, `drain`, and pipeline mechanics prevents memory blowups.

### 2. Why is `stream.pipeline()` usually safer than manually calling `.pipe()` several times?

`pipeline()` wires errors and cleanup across the full chain and gives one completion callback or promise. Manual `.pipe()` code often misses an error listener or leaves a stream open.

### 3. How would you stream a large CSV export without exhausting memory?

Read or generate rows incrementally, transform them to CSV chunks, set response headers early, and pipe through a backpressure-aware chain. Avoid building the entire CSV string before sending.

### 4. What does `highWaterMark` control, and why should you be careful changing it?

It controls the buffer threshold before backpressure is applied, not a hard maximum object count in every case. Raising it can improve throughput in some workloads but increases memory per stream.

### 5. What stream bug causes requests to hang forever?

Missing error handling, not ending the destination, ignoring aborts, or swallowing transform callback errors. I expect cleanup on client disconnects and tests for failure paths, not only the happy path.

---

# Quick Practice

1. Explain Streams, Backpressure, and pipeline in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
