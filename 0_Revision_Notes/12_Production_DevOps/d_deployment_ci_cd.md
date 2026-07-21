# Revision Notes: Deployment and CI/CD

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
| CI | Runs checks on every change. |
| CD | Automates release or deployment steps. |
| Artifact | Built output or image deployed to runtime. |
| Rollback | Returning to previous known-good version. |
| Migration | Database change coordinated with application deployment. |

---

# Interview Questions & Answers

### 1. How would you explain Deployment and CI/CD in a real backend project?

Deployment and CI/CD should be explained through the request or process flow it affects, the runtime behavior behind it, and the production tradeoff. A senior answer connects the API to latency, correctness, failure handling, and maintainability.

### 2. What happens internally when Deployment and CI/CD is involved?

Production services run under process managers, containers, orchestrators, load balancers, and monitoring systems. Config, secrets, logging, metrics, health checks, deployments, and rollback plans are part of the application. Graceful shutdown coordinates HTTP servers, queues, timers, and database connections during deploys or crashes.

### 3. What is a common production bug related to Deployment and CI/CD?

Hardcoding dev config into production code.

### 4. How would you debug an issue in Deployment and CI/CD?

Reproduce the failing input, inspect logs and stack traces, isolate the boundary involved, add focused instrumentation, and write a regression test once the cause is known.

### 5. What should a senior engineer check in code review?

Can this deploy safely? Can this shut down gracefully? Can we diagnose it at 2 AM?

---

# Quick Practice

1. Explain Deployment and CI/CD in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
