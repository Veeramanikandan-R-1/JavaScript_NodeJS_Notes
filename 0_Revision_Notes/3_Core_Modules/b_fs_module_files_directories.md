# Revision Notes: fs Module, Files, and Directories

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
| fs/promises | Promise-based filesystem API for modern async code. |
| readFile | Reads an entire file into memory. |
| createReadStream | Reads a file incrementally as chunks. |
| mkdir recursive | Creates parent directories if needed. |
| fs.access | Checks permissions but should not replace handling real operation errors. |

---

# Interview Questions & Answers

### 1. When would you use `fs.promises.readFile()` versus a readable stream?

Use `readFile()` for small bounded files where loading the whole content is acceptable. Use streams for large files, uploads, downloads, logs, and anything where memory usage or backpressure matters.

### 2. Why is checking `fs.access()` and then opening a file often a race condition?

The filesystem can change between the check and the operation. Prefer opening with the right flags and handling the resulting error, especially for create-if-not-exists or permission-sensitive flows.

### 3. How do you write a file atomically enough for a backend config or cache file?

Write to a temporary file in the same directory, flush when durability matters, then rename it over the target. Rename is atomic on the same filesystem, which prevents readers from seeing partial content.

### 4. What is dangerous about synchronous filesystem calls in request handlers?

They block the event loop, so unrelated requests wait even if the disk operation is slow. Synchronous file work is acceptable at startup scripts, but not in hot request paths.

### 5. What filesystem errors should backend code treat as normal operational outcomes?

`ENOENT`, `EEXIST`, `EACCES`, `EMFILE`, and `ENOSPC` are common and should produce clear behavior. A senior implementation handles these deliberately instead of turning all of them into generic 500s.

---

# Quick Practice

1. Explain fs Module, Files, and Directories in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
