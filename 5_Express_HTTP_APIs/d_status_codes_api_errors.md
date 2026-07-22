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

### 1. How do you decide between `400`, `401`, `403`, `404`, and `409` in an API?

`400` is malformed or invalid input, `401` means authentication is missing or invalid, `403` means the user is known but not allowed, `404` means the resource is not visible or does not exist, and `409` means the request conflicts with current state.

### 2. What should a good API error response contain?

It should include a stable error code, a human-readable message, and field-level details when validation fails. It should not leak stack traces, SQL or Mongo internals, secret values, or authorization clues.

### 3. When would you return `202 Accepted` instead of `200 OK` or `201 Created`?

Use `202` when the request was accepted but work continues asynchronously, such as queueing a report export. The response should give the client a job id or status URL rather than pretending the work is complete.

### 4. How do you keep error handling consistent across many Express routes?

Throw or return known error types from services and centralize HTTP mapping in one error middleware. That prevents each route from inventing its own status codes and response shape.

### 5. What is wrong with returning `200` for every API response and putting success or failure inside the body?

Clients, proxies, observability tools, retries, and caches all understand HTTP status codes. Hiding failures inside a `200` response makes integrations harder to reason about and often breaks alerting.

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
