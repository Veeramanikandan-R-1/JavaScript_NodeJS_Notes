# Revision Notes: Debugging Node.js Applications

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
| Stack trace | Shows the call path that produced an error. |
| Inspector | Node's debugging protocol used by Chrome DevTools and VS Code. |
| Breakpoint | Pauses execution at a selected line or condition. |
| Reproduction | Smallest input and environment that triggers the failure. |
| Observability | Logs, metrics, and traces that make production failures diagnosable. |

---

# Interview Questions & Answers

### 1. A Node.js API occasionally returns 500s with no obvious pattern. How do you start debugging?

I first correlate request IDs, logs, error stacks, deploys, inputs, downstream calls, and resource metrics. Then I reproduce the path with the smallest failing case and add targeted instrumentation.

### 2. When would you use the Node inspector instead of more logging?

Use the inspector when you need to step through control flow, inspect closures, break on exceptions, or understand state mutation. In production, prefer safe observability unless you have a controlled debugging environment.

### 3. How do you debug high memory usage in a Node.js process?

Capture heap snapshots, compare allocation growth over time, check caches and listeners, inspect large request bodies, and watch external memory from buffers. The key is separating a real leak from expected memory pressure.

### 4. What makes a stack trace in async Node.js code misleading?

Async boundaries can hide the original caller or show only where a promise rejected. Good error wrapping, `cause`, request context, and structured logs make the trace useful again.

### 5. What do you expect in logs when reviewing a production Node.js service?

Logs should include severity, timestamp, request or correlation ID, operation name, sanitized inputs, latency, and error details. They should not leak secrets or depend on humans reading unstructured strings.

---

# Quick Practice

1. Explain Debugging Node.js Applications in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
