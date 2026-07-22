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

### 1. What stages do you expect in a CI/CD pipeline for a backend API?

Install from lockfile, lint, type or static checks if used, unit tests, integration tests with real dependencies where practical, build artifact, security/dependency scan, migration check, deploy to staging, smoke test, then progressive production rollout.

### 2. How would you deploy a database schema change without downtime?

Make it backward compatible: add nullable columns or new tables first, deploy code that writes both or understands both shapes, backfill safely, switch reads, then remove old fields in a later deploy. One deploy should not require every instance to change at the same millisecond.

### 3. A canary deploy shows higher latency but no error spike. Do you roll forward or back?

I would pause rollout, compare canary versus baseline by route and dependency, inspect traces and resource saturation, then decide. If latency breaches SLO or keeps worsening, roll back quickly; if it is a known cold-start or cache-warmup effect, continue only with evidence.

### 4. What makes rollback unsafe even when the previous image still exists?

Irreversible migrations, changed message formats, incompatible cache keys, external API side effects, and feature flags left in a bad state can all break rollback. Good release design includes backward compatibility and a practiced rollback path.

### 5. Where should deployment configuration live?

Defaults can live in code, environment-specific values in deployment config, and secrets in a secret manager. A pipeline should promote the same artifact across environments instead of rebuilding different code for staging and production.

---

# Quick Practice

1. Explain Deployment and CI/CD in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
