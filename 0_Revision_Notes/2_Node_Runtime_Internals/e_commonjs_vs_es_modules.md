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

### 1. What changes when a package moves from CommonJS to ES Modules?

Imports become static by default, file extensions and package `type` matter, `require` is not available directly, and some interop behavior changes. The migration affects tests, build tools, mocking, and consumers.

### 2. Why can `require()` load some ESM packages poorly or not at all?

ESM has a different loader and supports async linking, so CommonJS cannot always synchronously load it. The usual answer is dynamic `import()` from CommonJS or moving the caller to ESM.

### 3. What is the difference between CommonJS exports and ESM named exports?

CommonJS exports a runtime object through `module.exports`; ESM named exports are statically analyzable bindings. Interop can create default-wrapper surprises, so imports should be tested from the consuming side.

### 4. How do `__dirname` and `__filename` change in ESM?

They are not defined in ESM. Use `import.meta.url` with `fileURLToPath` and `path.dirname` when you need filesystem paths relative to the module.

### 5. How do you reduce risk when converting a backend repo from CommonJS to ESM?

Convert at clear boundaries, verify tooling support, test package entry points, watch for mocked modules, and avoid mixing styles casually. The risky part is ecosystem compatibility, not the import syntax itself.

---

# Quick Practice

1. Explain CommonJS vs ES Modules in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
