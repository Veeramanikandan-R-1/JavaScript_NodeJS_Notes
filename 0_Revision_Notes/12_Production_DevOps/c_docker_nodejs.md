# Revision Notes: Docker for Node.js Services

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
| Image | Immutable filesystem and metadata used to create containers. |
| Container | Running instance of an image. |
| Dockerfile | Build recipe for an image. |
| Layer | Cached filesystem change in an image build. |
| Runtime user | Non-root user used to reduce container risk. |

---

# Interview Questions & Answers

### 1. What does a production-quality Dockerfile for a Node.js service need beyond "FROM node"?

It should use a pinned supported base image, npm ci, production dependencies only in the final image, a non-root user, a small build context, explicit working directory, and a sensible command. Multi-stage builds help keep compilers, test files, and dev dependencies out of runtime.

### 2. Why can Node apps ignore SIGTERM inside Docker, and how do you prevent it?

If Node is hidden behind a shell wrapper or a poor entrypoint, signals may not reach the process correctly. Use exec-form CMD, avoid unnecessary shell scripts, and make the app handle SIGTERM by draining HTTP servers and background work.

### 3. Should node_modules be copied from the host into the image?

No for a reliable production image. Install inside the image with npm ci so native modules match the container OS and lockfile. Host node_modules causes platform drift and makes builds hard to reproduce.

### 4. How do you handle secrets in containers?

Pass secrets through the orchestrator or secret manager at runtime, not through Dockerfile ENV, build args, or committed .env files. Also make sure logs and crash dumps do not echo secret values.

### 5. What checks would you run before approving a Node Docker image?

I would check image size, dependency lockfile use, CVE scan results, non-root execution, health/readiness integration, signal behavior, correct exposed port, and whether the image can run with only runtime configuration supplied.

---

# Quick Practice

1. Explain Docker for Node.js Services in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
