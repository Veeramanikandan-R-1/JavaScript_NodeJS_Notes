# Backend System Design Interview Notes for Node.js

For 3 years of experience, system design interviews usually stay medium-scale: design a REST API, chat backend, job system, file upload pipeline, notification service, or URL shortener. The goal is not to invent huge architecture. The goal is to show clear requirements, data model, APIs, reliability, and scaling steps.

---

# Answer Framework

Use this flow:

```text
requirements -> APIs -> data model -> core flows -> consistency
security -> scale -> caching/queues -> observability -> deployment/failure modes
```

Start with assumptions. Then design the simplest correct system. Add scale only where the requirement demands it.

---

# 1. Requirements

Ask or state:

* Who are the users?
* What are the core actions?
* Read-heavy or write-heavy?
* Expected traffic and data size?
* Latency needs?
* Consistency needs?
* Authentication and authorization needs?
* Retention, audit, compliance, or deletion rules?

Good sentence:

```text
I will first design for correctness and clean API contracts, then show how I would scale the hot paths.
```

---

# 2. API Design

For REST APIs, describe endpoints, request body, response shape, status codes, pagination, filtering, and idempotency.

Example:

```http
POST /orders
Idempotency-Key: 7f6a...

{
  "items": [{ "productId": "p1", "quantity": 2 }],
  "addressId": "addr1"
}
```

Responses should be stable:

```json
{
  "data": {
    "id": "ord_123",
    "status": "pending"
  }
}
```

Error format:

```json
{
  "error": {
    "code": "INSUFFICIENT_STOCK",
    "message": "Some items are no longer available"
  }
}
```

---

# 3. Data Model

Explain entities, ownership, indexes, and lifecycle.

Example for task manager:

```text
users(id, email, password_hash, created_at)
tasks(id, user_id, title, status, due_at, created_at, updated_at)
indexes:
  users(email unique)
  tasks(user_id, status, created_at desc)
```

For MongoDB:

```text
users: { _id, email, passwordHash }
tasks: { _id, userId, title, status, createdAt, updatedAt }
indexes:
  { email: 1 } unique
  { userId: 1, status: 1, createdAt: -1 }
```

---

# 4. Consistency and Reliability

Mention the right tool for the consistency need:

| Need | Pattern |
| ---- | ------- |
| Prevent duplicate user email | Unique index |
| Prevent duplicate payment/order | Idempotency key |
| Update multiple records together | Transaction |
| Publish event after DB write | Outbox pattern |
| Retry background work | Queue with idempotent handler |
| Avoid stale update overwrite | Optimistic locking/version field |
| Handle repeated external callback | Dedup table or unique event ID |

---

# 5. Caching

Use cache for measured read-heavy paths. Define key, value, TTL, invalidation, and stale data tolerance.

Patterns:

* Cache-aside: app reads cache, falls back to DB, writes cache.
* Write-through: write cache and DB together.
* TTL-based cache: acceptable for slightly stale data.
* Negative cache: cache missing lookups carefully to reduce repeated misses.

Common risks:

* Cache stampede.
* Stale authorization data.
* No tenant/user in cache key.
* Caching sensitive data too broadly.

---

# 6. Queues and Background Jobs

Use queues for slow, retryable, or non-user-blocking work: emails, image processing, report generation, webhook delivery, notifications, and third-party sync.

Good job design:

* Job payload has stable IDs, not huge objects.
* Handler is idempotent.
* Retries use backoff.
* Dead-letter queue captures repeated failure.
* Job status is visible.
* Metrics include queue depth, age, success/failure rate.

---

# 7. Scaling Node Services

Scale in this order:

1. Keep the process stateless.
2. Add proper indexes and pagination.
3. Measure event loop delay and slow dependencies.
4. Run multiple Node processes or containers.
5. Use load balancer health checks.
6. Move CPU-heavy work to workers/jobs.
7. Add cache for hot reads.
8. Partition data or split services only when needed.

Node-specific notes:

* Do not store durable session state in memory.
* WebSockets need sticky sessions or a shared adapter such as Redis.
* CPU-heavy endpoints can hurt every request in the same process.
* Graceful shutdown must stop HTTP and queue consumers.

---

# 8. Observability

A strong design includes:

* Structured logs with request ID.
* Metrics for latency, errors, throughput, saturation.
* Traces across API, DB, cache, queue, and external services.
* Dashboards for p95/p99 latency and dependency health.
* Alerts on user-impacting symptoms, not only CPU.

Useful RED metrics:

* Rate: requests per second.
* Errors: failed requests.
* Duration: latency distribution.

Useful saturation metrics:

* CPU and memory.
* Event loop delay.
* DB pool usage.
* Queue depth and oldest job age.

---

# 9. Security in Design Answers

Always mention:

* Authentication.
* Object-level authorization.
* Tenant isolation if multi-tenant.
* Input validation.
* Rate limiting and abuse control.
* Secrets management.
* Audit logs for sensitive actions.
* Secure file upload handling if files exist.
* Data retention and deletion if personal data exists.

---

# 10. Deployment and Failure Modes

A production design should answer:

* How does the service start and load config?
* What does readiness check?
* What happens during deploy?
* How are old and new versions compatible?
* How does rollback work?
* What happens if DB/cache/queue/external API is down?
* What data can be lost?
* What work is retried?

Graceful shutdown:

```text
SIGTERM -> stop accepting requests -> finish in-flight work with timeout
-> stop queue consumers -> close DB/cache connections -> exit
```

---

# Example: Design a Notification Service

Requirements:

* Users receive email and in-app notifications.
* API should return quickly.
* Delivery should retry.
* Users can see notification history.

Design:

```text
API service:
  POST /notifications
  validates request, checks permission, stores notification row/document
  enqueues delivery job

Worker:
  picks job, sends email, updates delivery status
  retries with backoff
  sends repeated failures to DLQ

Database:
  notifications(id, user_id, type, title, body, status, created_at)
  notification_deliveries(id, notification_id, channel, status, attempts)

Indexes:
  notifications(user_id, created_at desc)
  notification_deliveries(status, created_at)
```

Reliability:

* Idempotency key prevents duplicate notification creation.
* Job handler checks if delivery already succeeded before sending.
* Outbox pattern can be used if event publishing must be atomic with DB write.

Observability:

* Request ID follows API to job logs.
* Metrics for queue depth, delivery success, provider errors, retry count.

---

# Common System Design Prompts

Practice these:

1. Design a task manager API.
2. Design URL shortener.
3. Design file upload and image processing.
4. Design notification service.
5. Design realtime chat.
6. Design audit log service.
7. Design payment order flow.
8. Design rate limiter.
9. Design API gateway for microservices.
10. Design background report generation.

---

# Interview Traps

| Trap | Better approach |
| ---- | --------------- |
| Jumping straight to microservices | Start with a modular monolith unless scale/team boundaries justify services. |
| Ignoring data model | Data model drives correctness and performance. |
| No failure handling | Every dependency can fail; state fallback and retry behavior. |
| Cache everywhere | Cache only measured hot paths with invalidation rules. |
| No auth model | Always enforce object-level authorization. |
| No operational story | Include health checks, logs, metrics, deploy, rollback, and alerts. |

---

# 3-Year Experience Bar

You should be able to design a service that:

* Has clear APIs and status codes.
* Uses indexes based on access patterns.
* Handles auth and object ownership.
* Uses queues for slow/retryable work.
* Has basic caching with TTL/invalidation.
* Scales stateless Node processes horizontally.
* Handles graceful shutdown and deploys.
* Has observability enough to debug production issues.
