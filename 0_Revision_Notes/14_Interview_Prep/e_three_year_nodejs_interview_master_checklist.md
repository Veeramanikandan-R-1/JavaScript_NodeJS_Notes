# Revision Notes: 3-Year Node.js Interview Master Checklist

Use this as the shortest possible last-day revision.

---

# Runtime

* Event loop phases and microtasks.
* `process.nextTick` vs Promise microtasks vs `setImmediate` vs `setTimeout`.
* libuv thread pool and `UV_THREADPOOL_SIZE`.
* Streams and backpressure.
* Cluster vs worker threads.
* Memory leaks and heap snapshots.
* Event loop lag and CPU profiling.
* Native `fetch`, timeouts, and `AbortController`.
* `AsyncLocalStorage` for request context.
* Graceful shutdown.

---

# Express and APIs

* Middleware order.
* Centralized error handling.
* Express 4 vs Express 5 async errors.
* Request validation and sanitization.
* Status codes.
* Pagination.
* Idempotency.
* `trust proxy`.
* Rate limiting.
* File upload safety.

---

# Data, Auth, Security

* SQL vs MongoDB.
* Indexes and query plans.
* Transactions and race conditions.
* JWT vs sessions.
* Access vs refresh tokens.
* Password hashing.
* RBAC vs ABAC.
* BOLA and object ownership.
* Mass assignment.
* CSRF, XSS, SSRF, CORS.
* Secrets management.

---

# Production and Design

* Logs, metrics, traces.
* Request IDs.
* Health and readiness.
* Docker and CI/CD basics.
* Queue retries and dead-letter queues.
* Outbox pattern.
* Cache TTL and invalidation.
* Horizontal scaling of stateless Node services.
* WebSocket scaling with shared adapter/sticky sessions.
* Rollback and deploy failure modes.
