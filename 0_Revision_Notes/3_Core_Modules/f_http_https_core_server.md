# Revision Notes: http and https Core Modules

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
| createServer | Creates an HTTP server with a request listener. |
| IncomingMessage | Readable request stream. |
| ServerResponse | Writable response stream. |
| Headers | Metadata for request and response behavior. |
| Status code | Numeric result category such as 200, 400, 401, 403, 404, or 500. |

---

# Interview Questions & Answers

### 1. What does Node's core `http` server give you before Express or Fastify are involved?

It gives you raw request and response streams, headers, methods, URLs, sockets, and lifecycle events. Frameworks add routing, middleware, validation conventions, and nicer error handling on top.

### 2. Why must a raw Node HTTP server handle request body size explicitly?

The request body is a stream, and Node will not magically enforce your application limit. Without limits and abort handling, a client can consume memory or keep the connection open too long.

### 3. Which server timeouts do you think about for public HTTP services?

Headers timeout, request timeout, keep-alive timeout, and idle socket behavior all matter. Bad timeout defaults can enable slow-client attacks or cause surprising disconnects behind a load balancer.

### 4. What causes `ERR_HTTP_HEADERS_SENT`, and how do you prevent it?

It happens when code writes headers or a response more than once, often across async branches. Return after sending, centralize response handling, and make error paths mutually exclusive.

### 5. What changes when you use `https` directly instead of terminating TLS at a proxy?

The Node process must manage certificates, keys, ciphers, rotation, and TLS-related failures. Many production systems terminate TLS at a proxy, but direct HTTPS is still useful for internal tools and local parity tests.

---

# Quick Practice

1. Explain http and https Core Modules in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
