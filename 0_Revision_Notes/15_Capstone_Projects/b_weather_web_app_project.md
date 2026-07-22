# Revision Notes: Capstone: Weather Web App

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Define requirements, data model, API contract, test plan, and deployment plan before coding.
* Best practice: Keep a small backlog of polish tasks: logs, metrics, indexes, rate limits, and docs.
* Best practice: Show both happy path and failure path behavior.
* Best practice: Write a final review note describing tradeoffs and next improvements.
* Avoid: Building many shallow endpoints with no validation, auth, tests, or deployment story.
* Avoid: Skipping README, env examples, API docs, and seed data.
* Avoid: Making demos that cannot be run by another developer.
* Avoid: Ignoring failure states and operational visibility.

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

# Interview Questions & Answers

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

# Quick Practice

1. Explain Capstone: Weather Web App in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
