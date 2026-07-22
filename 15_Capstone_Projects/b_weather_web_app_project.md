# Capstone: Weather Web App (Senior Backend Node.js Engineer Perspective)

Before going deeper into frameworks or libraries, understand this topic as part of real backend engineering: building an Express app that serves pages and calls external APIs.

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
| Express server | Serves static assets and JSON endpoint. |
| Query string | Browser sends address to backend endpoint. |
| External API | Geocoding and weather provider calls. |
| Error states | Invalid address, provider failure, timeout. |
| Deployment | Production-ready env variables and start script. |

---

# 3. Internal Working

* A capstone should prove you can build, test, secure, deploy, and operate a backend feature set.
* Project quality shows in boundaries, edge cases, tests, documentation, and operational behavior.
* The best backend projects are small enough to finish and deep enough to expose real tradeoffs.

---

# 4. Common Mistakes

* Building many shallow endpoints with no validation, auth, tests, or deployment story.
* Skipping README, env examples, API docs, and seed data.
* Making demos that cannot be run by another developer.
* Ignoring failure states and operational visibility.

---

# 5. Best Practices

* Define requirements, data model, API contract, test plan, and deployment plan before coding.
* Keep a small backlog of polish tasks: logs, metrics, indexes, rate limits, and docs.
* Show both happy path and failure path behavior.
* Write a final review note describing tradeoffs and next improvements.

---

# 6. Code Example

```text
GET /
GET /weather?address=Chennai
  -> validate address
  -> geocode
  -> fetch forecast
  -> return JSON
```

---

# 7. Real-world Scenarios

* Building a service where capstone: weather web app affects correctness or latency.
* Debugging a production issue caused by a weak mental model of capstone: weather web app.
* Explaining capstone: weather web app in a senior backend interview with tradeoffs and examples.

---

# 8. Senior Deep Dive

## When to Use

* Define requirements, data model, API contract, test plan, and deployment plan before coding.
* Keep a small backlog of polish tasks: logs, metrics, indexes, rate limits, and docs.
* Show both happy path and failure path behavior.
* Write a final review note describing tradeoffs and next improvements.

## Debug Checklist

* Reproduce with the smallest input and environment that fails.
* Inspect logs, stack traces, request data, resource usage, and dependency behavior.
* What is the production failure mode?
* How do tests prove it?
* How would a teammate maintain it?

## Code Review Checklist

* What is the production failure mode?
* How do tests prove it?
* How would a teammate maintain it?

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
| Express server | Serves static assets and JSON endpoint. |
| Query string | Browser sends address to backend endpoint. |
| External API | Geocoding and weather provider calls. |
| Error states | Invalid address, provider failure, timeout. |
| Deployment | Production-ready env variables and start script. |

---

# Interview Questions with Answers

### 1. Architecture review: where should the weather provider integration live?

Keep the API key and provider client on the server, behind a small service that normalizes provider responses for the UI. The frontend should call your backend contract, not depend directly on the third-party weather API shape.

### 2. Edge-case review: what failures should the app handle gracefully?

Unknown city, provider timeout, rate limiting, malformed provider response, stale cache, and units conversion mistakes. The UI should distinguish invalid user input from temporary upstream failure.

### 3. Testing review: how would you test without calling the real weather API?

Mock the provider client for service tests, add contract-shaped fixtures for success and error responses, and run integration tests against your own routes. A small UI test should cover search, loading, empty, and provider-error states.

### 4. Security review: what is the most common mistake in this project?

Leaking the weather API key to the browser or repository. Keep it in server-side runtime config, validate and bound city input, rate-limit the endpoint, and avoid reflecting unsanitized provider text into the page.

### 5. Deployability review: what makes this app production-ready enough to show?

Document required env vars, add health checks, cache provider responses with a short TTL, log upstream failures with request ids, and make static asset hosting explicit. Also plan for provider quota exhaustion so the app fails politely.

---

# Hands-on Exercises

## Exercise 1

Build a small example that demonstrates this topic: Capstone: Weather Web App.

### Solution

Keep it focused, handle one failure path, and write down what happens internally.

## Exercise 2

Turn this topic into a code review checklist: Capstone: Weather Web App.

### Solution

Include these checks: What is the production failure mode? How do tests prove it? How would a teammate maintain it?

---

# Senior Backend Engineer Takeaway

For senior-level work, Capstone: Weather Web App is not only an API or syntax detail. You should be able to explain the mental model, choose the right pattern for a product requirement, identify common failure modes, and verify behavior with tests, logs, profiling, and production-aware review.
