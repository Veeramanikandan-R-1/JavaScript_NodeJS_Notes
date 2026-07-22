# Revision Notes: Express Introduction and HTTP Server

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Keep route handlers thin: parse input, call a service, send a response.
* Best practice: Centralize validation, authentication, and error mapping.
* Best practice: Use correct status codes and response shapes.
* Best practice: Test APIs through HTTP using Supertest or an equivalent tool.
* Avoid: Forgetting to return after sending a response and accidentally continuing request logic.
* Avoid: Putting business logic directly inside route handlers.
* Avoid: Letting validation, auth, and error behavior drift across routes.
* Avoid: Using generic 500 responses for client input errors.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| app | Express application that registers middleware and routes. |
| Route | HTTP method plus path plus handler. |
| Middleware | Function that runs during request handling. |
| Request | Incoming HTTP data. |
| Response | Outgoing HTTP data. |

---

# Interview Questions & Answers

### 1. In production, what does Express actually add on top of Node's HTTP server?

Express gives a middleware stack, routing, request helpers, response helpers, and error flow. It does not remove HTTP concerns like streaming, timeouts, body limits, connection handling, or graceful shutdown.

### 2. How would you structure a small Express API so it does not turn into route-handler spaghetti?

Keep handlers thin: parse request data, call a service, and map the result to HTTP. Put business rules in services, data access behind repositories or models, and cross-cutting behavior like auth and validation in middleware.

### 3. What is the bug when a handler sends `res.json()` and then continues executing?

The code may perform extra writes, call `next()`, or attempt a second response after headers are already sent. I usually return immediately after sending or structure the handler so response paths are explicit.

### 4. What production settings do you check before exposing an Express server publicly?

Body size limits, proxy trust, timeouts, CORS policy, security headers, error handling, logging, health checks, and graceful shutdown. Defaults that are fine in demos are often weak boundaries in production.

### 5. How do you test that an Express endpoint behaves correctly as HTTP, not just as a function?

Use an HTTP-level test tool such as Supertest to assert status code, response body, headers, and error shape. Unit tests for services are useful, but they do not prove the route is wired correctly.

---

# Quick Practice

1. Explain Express Introduction and HTTP Server in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
