# Health Checks and Graceful Shutdown (Senior Backend Node.js Engineer Perspective)

Before going deeper into frameworks or libraries, understand this topic as part of real backend engineering: coordinating app lifecycle with process managers and deploy systems.

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
| Liveness | Whether the process should be restarted. |
| Readiness | Whether the process can receive traffic. |
| SIGTERM | Common signal sent during deploy or stop. |
| Drain | Stop accepting new work and let current work finish. |
| Timeout | Maximum shutdown wait before forced exit. |

---

# 3. Internal Working

* Production services run under process managers, containers, orchestrators, load balancers, and monitoring systems.
* Config, secrets, logging, metrics, health checks, deployments, and rollback plans are part of the application.
* Graceful shutdown coordinates HTTP servers, queues, timers, and database connections during deploys or crashes.

---

# 4. Common Mistakes

* Hardcoding dev config into production code.
* Deploying without health checks and rollback paths.
* Logging sensitive data.
* Treating Docker as a packaging trick instead of a runtime contract.

---

# 5. Best Practices

* Make services stateless where possible and externalize durable state.
* Expose health and readiness endpoints.
* Use structured logs, metrics, traces, and alerting.
* Practice deployments and failure recovery before production incidents.

---

# 6. Code Example

```js
let ready = true;
app.get("/healthz", (req, res) => res.json({ ok: true }));
app.get("/readyz", (req, res) => res.status(ready ? 200 : 503).json({ ready }));

process.on("SIGTERM", () => {
  ready = false;
  server.close(() => process.exit(0));
});
```

---

# 7. Real-world Scenarios

* Building a service where health checks and graceful shutdown affects correctness or latency.
* Debugging a production issue caused by a weak mental model of health checks and graceful shutdown.
* Explaining health checks and graceful shutdown in a senior backend interview with tradeoffs and examples.

---

# 8. Senior Deep Dive

## When to Use

* Make services stateless where possible and externalize durable state.
* Expose health and readiness endpoints.
* Use structured logs, metrics, traces, and alerting.
* Practice deployments and failure recovery before production incidents.

## Debug Checklist

* Reproduce with the smallest input and environment that fails.
* Inspect logs, stack traces, request data, resource usage, and dependency behavior.
* Can this deploy safely?
* Can this shut down gracefully?
* Can we diagnose it at 2 AM?

## Code Review Checklist

* Can this deploy safely?
* Can this shut down gracefully?
* Can we diagnose it at 2 AM?

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
| Liveness | Whether the process should be restarted. |
| Readiness | Whether the process can receive traffic. |
| SIGTERM | Common signal sent during deploy or stop. |
| Drain | Stop accepting new work and let current work finish. |
| Timeout | Maximum shutdown wait before forced exit. |

---

# Interview Questions with Answers

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

# Hands-on Exercises

## Exercise 1

Build a small example that demonstrates this topic: Health Checks and Graceful Shutdown.

### Solution

Keep it focused, handle one failure path, and write down what happens internally.

## Exercise 2

Turn this topic into a code review checklist: Health Checks and Graceful Shutdown.

### Solution

Include these checks: Can this deploy safely? Can this shut down gracefully? Can we diagnose it at 2 AM?

---

# Senior Backend Engineer Takeaway

For senior-level work, Health Checks and Graceful Shutdown is not only an API or syntax detail. You should be able to explain the mental model, choose the right pattern for a product requirement, identify common failure modes, and verify behavior with tests, logs, profiling, and production-aware review.
