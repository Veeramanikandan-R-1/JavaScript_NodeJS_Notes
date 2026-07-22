# Revision Notes: Express Middleware and Request Lifecycle

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
| Order | Middleware runs in the order it is registered. |
| next | Passes control to the next middleware. |
| Terminating middleware | Sends a response and does not call next. |
| Error middleware | Four-argument middleware that handles failures. |
| Route-level middleware | Middleware applied only to selected routes. |

---

# Interview Questions & Answers

### 1. Walk me through what happens when a request enters an Express app with several middleware functions.

Express runs matching middleware and routes in registration order. Each layer must either end the response, call `next()`, or pass an error to `next(err)`; otherwise the request hangs.

### 2. What is the difference between normal middleware and error-handling middleware?

Normal middleware has `(req, res, next)` and runs in the usual chain. Error middleware has four arguments, `(err, req, res, next)`, and Express only enters it after an error is passed or thrown in supported async flow.

### 3. Why is middleware order a senior-level concern, not just a style preference?

Order controls whether parsing, authentication, rate limiting, logging, and route handlers see the request. A misplaced body parser or auth middleware can create broken endpoints or real security gaps.

### 4. How do you avoid request-scoped data becoming messy across middleware?

Use a small, documented place such as `res.locals` or a typed request extension, and set only data that later layers truly need. Avoid hidden dependencies where a route silently assumes five previous middleware functions ran.

### 5. A request sometimes hangs without a response. How would you debug the middleware chain?

Add request IDs and timing logs around middleware boundaries, then look for paths that neither send nor call `next`. I would also check async branches where a promise rejection or early return bypasses the intended response path.

---

# Quick Practice

1. Explain Express Middleware and Request Lifecycle in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
