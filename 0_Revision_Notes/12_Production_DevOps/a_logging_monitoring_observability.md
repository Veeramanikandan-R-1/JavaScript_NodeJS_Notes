# Revision Notes: Logging, Monitoring, and Observability

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Make services stateless where possible and externalize durable state.
* Best practice: Expose health and readiness endpoints.
* Best practice: Use structured logs, metrics, traces, and alerting.
* Best practice: Practice deployments and failure recovery before production incidents.
* Avoid: Hardcoding dev config into production code.
* Avoid: Deploying without health checks and rollback paths.
* Avoid: Logging sensitive data.
* Avoid: Treating Docker as a packaging trick instead of a runtime contract.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| Structured log | Machine-readable log object with consistent fields. |
| Metric | Numeric time-series signal such as latency or error rate. |
| Trace | Request journey across services and spans. |
| Correlation id | Identifier used to connect logs for one request. |
| Alert | Notification when a user-impacting signal crosses a threshold. |

---

# Interview Questions & Answers

### 1. A checkout API has intermittent p99 latency spikes, but the logs only say "request failed". What would you add first?

I would add structured logs with request id, route, status, duration, user-safe tenant context, and dependency timings. Then I would expose RED metrics and traces around database, cache, queue, and outbound HTTP calls. The goal is to separate slow app code from slow dependencies without logging payloads or creating high-cardinality metric labels.

### 2. Which signals should page someone, and which should only create dashboard noise?

Pages should come from user-impacting symptoms: elevated 5xx rate, SLO burn, sustained p95 or p99 latency, failed job backlog, or dependency saturation. CPU and memory are useful supporting signals, but by themselves they should usually warn, not page, unless they predict an outage.

### 3. What fields belong in production logs for an authenticated API request?

Use timestamp, level, service, environment, request id, trace id, route template, method, status, duration, caller identity or tenant id when safe, and sanitized error metadata. Never log passwords, tokens, full cards, raw cookies, or request bodies that may contain personal data.

### 4. How do you keep tracing useful without making it too expensive?

Propagate trace context everywhere, sample normal traffic, keep slow and failed requests at a higher rate, and add spans only around meaningful boundaries. I would avoid span-per-function tracing because it increases cost and hides the important dependency timings.

### 5. What would you expect on a healthy service dashboard?

Throughput, latency percentiles, error rate, saturation, deploy markers, dependency latency, queue depth, job failures, and top error classes. A senior dashboard lets an on-call engineer answer: is it broken, who is affected, what changed, and which dependency is suspicious.

---

# Quick Practice

1. Explain Logging, Monitoring, and Observability in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
