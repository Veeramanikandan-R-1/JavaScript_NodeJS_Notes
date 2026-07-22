# Revision Notes: Node.js Runtime vs Browser Runtime

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Build small end-to-end services and inspect every boundary: HTTP, validation, logs, database, tests, and deployment.
* Best practice: Prefer explicit configuration, clear module boundaries, and deterministic package installs.
* Best practice: Use the Node.js documentation, framework docs, and source code when behavior matters.
* Best practice: Write notes as mental models plus production failure modes, not only syntax snippets.
* Avoid: Learning only framework syntax and skipping runtime behavior.
* Avoid: Treating local development success as production readiness.
* Avoid: Keeping secrets, environment-specific paths, or one-off commands inside source code.
* Avoid: Ignoring error paths, shutdown behavior, and operational visibility.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| V8 | The JavaScript engine shared by Chrome and Node.js. |
| Browser host APIs | DOM, document, window, fetch, storage, rendering, and user events. |
| Node host APIs | fs, net, http, process, Buffer, streams, crypto, and worker threads. |
| globalThis | Standard global reference available across modern JavaScript runtimes. |
| Runtime fit | Node.js is excellent for I/O-heavy servers, CLIs, automation, and network services. |

---

# Interview Questions & Answers

### 1. What is the most important difference between Node.js and the browser runtime for backend work?

Node exposes server-side capabilities such as filesystem, networking, processes, environment variables, and streams, while the browser exposes DOM and Web APIs inside a sandbox. Backend code must treat host access as powerful and risky.

### 2. Why does code that runs in a browser bundle sometimes fail when moved to Node.js?

It may rely on `window`, `document`, browser storage, CORS behavior, or bundler polyfills. In Node, globals, module resolution, security boundaries, and available APIs are different.

### 3. How do CORS and same-origin policy differ from backend-to-backend HTTP calls?

CORS is enforced by browsers, not by Node's HTTP client. A Node service can call another service without CORS, but it still needs authentication, authorization, network policy, and timeout handling.

### 4. What browser habits create security bugs in Node.js services?

Trusting client-provided values, exposing secrets, assuming local storage concepts apply, or treating filesystem paths like harmless URLs. Node code often has direct access to sensitive infrastructure.

### 5. How do timers, fetch, and streams show the runtimes becoming similar but still not identical?

Modern Node implements many Web-compatible APIs, but behavior, performance, error types, and stream interoperability can still differ. I expect candidates to verify runtime behavior instead of assuming perfect portability.

---

# Quick Practice

1. Explain Node.js Runtime vs Browser Runtime in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
