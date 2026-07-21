# Status Codes and API Error Design (Senior Backend Node.js Engineer Perspective)

Before going deeper into frameworks or libraries, understand this topic as part of real backend engineering: returning errors that are correct for clients and safe for production.

---

# 1. Fundamentals

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.

---

# 2. Core Concepts

| Concept | Practical meaning |
| ------- | ----------------- |
| 400 | Bad request or validation failure. |
| 401 | Caller is not authenticated. |
| 403 | Caller is authenticated but not allowed. |
| 404 | Resource not found or intentionally hidden. |
| 500 | Unexpected server failure. |

---

# 3. Internal Working

* Express is a routing and middleware layer on top of Node's HTTP server.
* Middleware runs in registration order and must either end the response or call next.
* Requests and responses are streams, even when Express hides most stream details.

---

# 4. Common Mistakes

* Forgetting to return after sending a response and accidentally continuing request logic.
* Putting business logic directly inside route handlers.
* Letting validation, auth, and error behavior drift across routes.
* Using generic 500 responses for client input errors.

---

# 5. Best Practices

* Keep route handlers thin: parse input, call a service, send a response.
* Centralize validation, authentication, and error mapping.
* Use correct status codes and response shapes.
* Test APIs through HTTP using Supertest or an equivalent tool.

---

# 6. Code Example

```js
class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

throw new HttpError(403, "You cannot update this task");
```

---

# 7. Real-world Scenarios

* Building a service where status codes and api error design affects correctness or latency.
* Debugging a production issue caused by a weak mental model of status codes and api error design.
* Explaining status codes and api error design in a senior backend interview with tradeoffs and examples.

---

# 8. Senior Deep Dive

## When to Use

* Keep route handlers thin: parse input, call a service, send a response.
* Centralize validation, authentication, and error mapping.
* Use correct status codes and response shapes.
* Test APIs through HTTP using Supertest or an equivalent tool.

## Debug Checklist

* Reproduce with the smallest input and environment that fails.
* Inspect logs, stack traces, request data, resource usage, and dependency behavior.
* Is the controller thin?
* Are validation and auth centralized?
* Are status codes and errors consistent?

## Code Review Checklist

* Is the controller thin?
* Are validation and auth centralized?
* Are status codes and errors consistent?

---

# Revision Notes

* This topic matters because backend bugs affect users, data, security, and operations.
* Learn the runtime mental model before memorizing framework syntax.
* Prefer small examples, tests, and production-style failure checks.
* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| 400 | Bad request or validation failure. |
| 401 | Caller is not authenticated. |
| 403 | Caller is authenticated but not allowed. |
| 404 | Resource not found or intentionally hidden. |
| 500 | Unexpected server failure. |

---

# Interview Questions with Answers

### 1. How would you explain Status Codes and API Error Design in a real backend project?

Status Codes and API Error Design should be explained through the request or process flow it affects, the runtime behavior behind it, and the production tradeoff. A senior answer connects the API to latency, correctness, failure handling, and maintainability.

### 2. What happens internally when Status Codes and API Error Design is involved?

Express is a routing and middleware layer on top of Node's HTTP server. Middleware runs in registration order and must either end the response or call next. Requests and responses are streams, even when Express hides most stream details.

### 3. What is a common production bug related to Status Codes and API Error Design?

Forgetting to return after sending a response and accidentally continuing request logic.

### 4. How would you debug an issue in Status Codes and API Error Design?

Reproduce the failing input, inspect logs and stack traces, isolate the boundary involved, add focused instrumentation, and write a regression test once the cause is known.

### 5. What should a senior engineer check in code review?

Is the controller thin? Are validation and auth centralized? Are status codes and errors consistent?

---

# Hands-on Exercises

## Exercise 1

Build a small example that demonstrates this topic: Status Codes and API Error Design.

### Solution

Keep it focused, handle one failure path, and write down what happens internally.

## Exercise 2

Turn this topic into a code review checklist: Status Codes and API Error Design.

### Solution

Include these checks: Is the controller thin? Are validation and auth centralized? Are status codes and errors consistent?

---

# Senior Backend Engineer Takeaway

For senior-level work, Status Codes and API Error Design is not only an API or syntax detail. You should be able to explain the mental model, choose the right pattern for a product requirement, identify common failure modes, and verify behavior with tests, logs, profiling, and production-aware review.
