# Revision Notes: path Module and Safe Paths

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
| path.join | Joins and normalizes path segments. |
| path.resolve | Resolves segments into an absolute path. |
| __dirname | Directory of the current CommonJS module. |
| process.cwd | Directory where Node was started. |
| path.parse | Breaks a path into root, dir, base, ext, and name. |

---

# Interview Questions & Answers

### 1. A user uploads a filename and you need to save it under `uploads/`. How do you prevent path traversal?

Build the final path from a trusted base, resolve it, and verify the resolved path still starts inside that base directory. Also strip or replace user filenames when possible instead of trusting path-like input.

### 2. What is the difference between `path.join()` and `path.resolve()`?

`join()` concatenates and normalizes segments; `resolve()` produces an absolute path and resets when it sees an absolute segment. Security checks usually need `resolve()` against a known base.

### 3. Why can `path.normalize()` be unsafe if used alone on user input?

It cleans syntax but does not prove the path is allowed. `../../secrets` can normalize neatly while still escaping the intended directory after resolution.

### 4. How do Windows paths affect backend path handling?

Separators, drive letters, case behavior, and absolute path rules differ from POSIX. Use `path` APIs and tests for both `path.win32` and `path.posix` when code handles user-visible paths.

### 5. When is it better to generate your own storage key instead of preserving the original filename?

For uploads and multi-tenant data, generated keys avoid collisions, path traversal, unsafe characters, and privacy leaks. Keep the original filename as metadata after validation if the UI needs it.

---

# Quick Practice

1. Explain path Module and Safe Paths in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
