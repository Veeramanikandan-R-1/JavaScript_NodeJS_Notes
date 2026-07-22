# Revision Notes: Health Checks and Graceful Shutdown

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
| Liveness | Whether the process should be restarted. |
| Readiness | Whether the process can receive traffic. |
| SIGTERM | Common signal sent during deploy or stop. |
| Drain | Stop accepting new work and let current work finish. |
| Timeout | Maximum shutdown wait before forced exit. |

---

# Interview Questions & Answers

### 1. Why should liveness and readiness be separate endpoints?

Liveness answers whether the process should be restarted. Readiness answers whether the instance should receive traffic. A database outage may make readiness fail while liveness stays healthy, because restarting every pod would amplify the incident instead of fixing the database.

### 2. During a Kubernetes rolling deploy, users see a few 502s. What shutdown bug do you suspect?

The app is probably closing before the load balancer stops sending traffic, or it is killing in-flight requests too quickly. On SIGTERM I would mark readiness false, stop accepting new connections, let current requests finish with a deadline, close queues and database pools, then exit.

### 3. Should a health check run a real database query every second?

Usually no. A readiness check can verify critical dependency availability, but it should be cheap, bounded by a timeout, and protected from stampeding the database. Deep checks belong in synthetic monitoring or lower-frequency diagnostics.

### 4. How do graceful shutdown rules change when the service consumes background jobs?

The worker should stop pulling new jobs, finish or extend leases for in-progress work, and release or requeue anything it cannot complete before the shutdown deadline. Otherwise deploys create duplicates, stuck locks, or half-applied side effects.

### 5. What would you test before trusting graceful shutdown in production?

I would send SIGTERM during a slow HTTP request, during a database call, and while a job is running. The expected behavior is no new traffic after readiness flips, bounded drain time, clean resource closure, and clear logs for forced termination.

---

# Quick Practice

1. Explain Health Checks and Graceful Shutdown in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
