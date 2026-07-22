# Revision Notes: Buffers and Binary Data

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
| Buffer | Node representation of raw bytes. |
| Encoding | How bytes map to strings, such as utf8 or base64. |
| Binary protocol | Format where raw bytes matter, such as images or sockets. |
| Memory | Buffers allocate memory outside normal JavaScript string representation. |
| Chunk | Piece of binary data emitted by a stream. |

---

# Interview Questions & Answers

### 1. What is the difference between `Buffer.alloc()` and `Buffer.allocUnsafe()`?

`Buffer.alloc()` zero-fills memory; `allocUnsafe()` may return memory containing old data until you overwrite it. Use unsafe allocation only when you immediately fill every byte and have measured the need.

### 2. Why can converting arbitrary binary data to a string corrupt it?

String conversion applies an encoding such as UTF-8, which may reinterpret bytes or replace invalid sequences. Keep data as `Buffer` unless the protocol explicitly says it is text.

### 3. How do buffers affect memory monitoring in Node.js?

Buffers use external memory outside the V8 heap, so heap size alone can hide pressure. Check `process.memoryUsage().external` and `arrayBuffers` when diagnosing binary-heavy services.

### 4. What is the safe way to assemble many buffer chunks from a stream?

Track the total size, enforce a limit, and use `Buffer.concat(chunks, totalLength)` when the data is known to fit in memory. For large data, process incrementally instead of concatenating everything.

### 5. Where do buffer bugs usually show up in backend systems?

File uploads, image processing, cryptography, compression, WebSocket frames, and binary protocols. I look for size limits, encoding assumptions, unsafe allocation, and unnecessary full-buffer copies.

---

# Quick Practice

1. Explain Buffers and Binary Data in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
