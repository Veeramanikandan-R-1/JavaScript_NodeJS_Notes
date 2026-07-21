# 3-Year Node.js Interview Master Checklist

This is the audit checklist for the whole notes repo. The existing notes already cover core Node, Express, MongoDB, auth, testing, realtime, performance, production, and capstones. The items below are the missing or weak areas that most often decide a 3-year backend interview.

---

# What Was Missing or Too Light

| Area | Why it matters | Where to study now |
| ---- | -------------- | ------------------ |
| Modern Node runtime APIs | Interviewers expect current Node knowledge, not only callbacks and Express basics. | This file, Node runtime interview file |
| Native `fetch`, Undici, and timeouts | Backend services call other services constantly. | Runtime Q10 |
| `AbortController` | Prevents slow dependency calls from consuming resources. | Runtime Q10 |
| `AsyncLocalStorage` | Request IDs, tracing, tenancy, audit context. | Runtime Q11 |
| Native `node:test` | Modern Node has a stable built-in test runner. | Testing checklist below |
| Express 5 async error behavior | Common migration/interview topic. | Express Q4 |
| Reverse proxy and `trust proxy` | Affects IP, HTTPS, secure cookies, and rate limits. | Express Q12 |
| SQL/Postgres comparison | Many Node interviews are not Mongo-only. | Database Q1-Q7 |
| Object-level authorization | One of the most common real API vulnerabilities. | Security Q11-Q14 |
| Idempotency | Required for retries, payments, jobs, and webhooks. | Express Q6, System design |
| Outbox pattern | Bridges DB writes and async events safely. | Database Q22, System design |
| Observability with traces | 3-year engineers should debug distributed calls. | System design observability |
| Deployment failure modes | Strong interviews include shutdown, rollback, readiness. | System design deployment |
| TypeScript backend practice | Common in current Node teams. | Add to study plan below |

---

# Current Node Version Awareness

Know the policy rather than memorizing one version forever:

* Prefer active LTS Node versions for production.
* Avoid end-of-life Node versions.
* Check release notes before upgrading major versions.
* Pin supported versions with `engines`, CI matrix, Docker image tags, or runtime config.
* Test native dependencies and ESM/CommonJS behavior during upgrades.

As of the official Node release table checked on 2026-07-21, Node 24 and Node 22 are LTS lines, and Node 26 is Current.

---

# TypeScript Topics to Add to Your Practice

You do not need to rewrite all notes in TypeScript, but for interviews you should know:

* `tsconfig` basics: `target`, `module`, `moduleResolution`, `strict`, `esModuleInterop`, `skipLibCheck`.
* DTO/request types vs database model types.
* Runtime validation still matters; TypeScript does not validate incoming JSON.
* Using Zod/Joi/class-validator style schemas at API boundaries.
* Typing Express `Request`, `Response`, `NextFunction`.
* Avoiding `any` around auth user, config, and database results.
* Build/run flow: `tsx` or `ts-node` in dev, compiled JS in production, source maps for debugging.

Interview-ready answer:

```text
TypeScript improves developer safety, but it does not protect runtime boundaries. I still validate request bodies, environment variables, and external API responses at runtime.
```

---

# Testing Topics to Strengthen

Already covered: Jest, async tests, Supertest, DB setup, mocking.

Add these talking points:

* Unit tests for pure business logic.
* Integration tests through HTTP for API contracts.
* Contract tests or schema checks for external providers.
* Testcontainers or disposable DBs for realistic integration tests.
* Native `node:test` for lightweight projects.
* Avoid over-mocking database behavior in integration tests.
* CI should run tests, lint/typecheck, dependency audit, and build.

Native test runner example:

```js
import test from "node:test";
import assert from "node:assert/strict";

test("adds two numbers", () => {
  assert.equal(1 + 2, 3);
});
```

---

# Production Readiness Checklist

Before saying a Node API is production-ready, check:

* Config validation at startup.
* No secrets in source control or logs.
* Request body limits.
* Input validation and output shaping.
* Object-level authorization.
* Central error format.
* Request IDs and structured logs.
* Metrics for latency, errors, throughput, event loop delay.
* Graceful shutdown for HTTP, DB, cache, queues, workers, cron jobs.
* Health/readiness endpoints.
* Timeouts on outbound calls.
* Retry with backoff only where safe.
* Idempotency for creation/payment/webhook/job flows.
* Database indexes verified by query plans.
* Pagination on list endpoints.
* Rate limits using shared storage in multi-instance deployments.
* Docker image uses production install and non-root user.
* CI/CD has rollback path.

---

# 30-Minute Final Revision Plan

1. Event loop, microtasks, thread pool, cluster, workers.
2. Express middleware order, errors, validation, status codes.
3. Auth: JWT/session, refresh tokens, bcrypt, RBAC/ABAC.
4. Security: BOLA, mass assignment, SSRF, CSRF, CORS.
5. Database: indexes, transactions, pagination, race conditions.
6. Performance: event loop lag, memory leaks, streaming, caching.
7. Production: logs, metrics, traces, health checks, shutdown.
8. System design: API, data model, scaling, queues, failure modes.

---

# Mock Interview Prompts

Answer each in 3-5 minutes:

1. Explain how Node handles 1000 concurrent API requests.
2. Debug an endpoint whose p99 latency jumped from 200 ms to 5 seconds.
3. Design auth for a task manager API.
4. Design a file upload service with image resizing.
5. Explain how you would prevent duplicate orders.
6. Design pagination for an activity feed.
7. Explain how Express error handling changes between Express 4 and Express 5.
8. Compare MongoDB and PostgreSQL for an order management system.
9. Explain how you would add request tracing to a Node API.
10. Walk through graceful shutdown during a Kubernetes deploy.
