# Routing, Controllers, and Services (Senior Backend Node.js Engineer Perspective)

Before going deeper into frameworks or libraries, understand this topic as part of real backend engineering: separating transport concerns from business logic.

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
| Router | Grouped route definitions for one resource or feature. |
| Controller | HTTP adapter that maps request to service call and service result to response. |
| Service | Business logic that should not depend on Express. |
| Repository | Persistence boundary. |
| DTO | Input or output shape crossing a boundary. |

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
router.post("/tasks", async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.user.id, req.body);
    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
});
```

---

# 7. Real-world Scenarios

* Building a service where routing, controllers, and services affects correctness or latency.
* Debugging a production issue caused by a weak mental model of routing, controllers, and services.
* Explaining routing, controllers, and services in a senior backend interview with tradeoffs and examples.

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
| Router | Grouped route definitions for one resource or feature. |
| Controller | HTTP adapter that maps request to service call and service result to response. |
| Service | Business logic that should not depend on Express. |
| Repository | Persistence boundary. |
| DTO | Input or output shape crossing a boundary. |

---

# Interview Questions with Answers

### 1. Where do you draw the line between route, controller, and service in an Express API?

The route maps method and path to middleware. The controller handles HTTP translation, while the service owns business rules and orchestration; this keeps product behavior testable without faking Express objects everywhere.

### 2. A controller has 150 lines of validation, database calls, and response formatting. What would you refactor first?

I would move validation into a schema or middleware and move business decisions into a service. The controller should become small enough that review focuses on HTTP mapping rather than hidden domain logic.

### 3. How do you handle route versioning without duplicating the whole codebase?

Version the HTTP contract at the routing/controller edge and reuse services when business behavior is the same. If behavior diverges, make that divergence explicit rather than hiding it behind conditionals spread through shared code.

### 4. How should controllers communicate service failures to clients?

Services can return typed results or throw domain-specific errors, and the controller or central error mapper converts them to status codes. Avoid services that directly call `res.status()` because that couples business logic to Express.

### 5. What routing issue commonly causes security bugs in Express apps?

Putting broad or parameterized routes before specific protected routes can send requests through the wrong handler or middleware chain. Route order is part of the API contract and deserves tests for sensitive paths.

---

# Hands-on Exercises

## Exercise 1

Build a small example that demonstrates this topic: Routing, Controllers, and Services.

### Solution

Keep it focused, handle one failure path, and write down what happens internally.

## Exercise 2

Turn this topic into a code review checklist: Routing, Controllers, and Services.

### Solution

Include these checks: Is the controller thin? Are validation and auth centralized? Are status codes and errors consistent?

---

# Senior Backend Engineer Takeaway

For senior-level work, Routing, Controllers, and Services is not only an API or syntax detail. You should be able to explain the mental model, choose the right pattern for a product requirement, identify common failure modes, and verify behavior with tests, logs, profiling, and production-aware review.
