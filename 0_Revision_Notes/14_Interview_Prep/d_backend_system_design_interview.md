# Revision Notes: Backend System Design Interview Notes

Use this as the quick final pass before interviews. For full answers, read `14_Interview_Prep/d_backend_system_design_interview.md`.

---

# Answer Framework

```text
requirements -> APIs -> data model -> core flows -> consistency
security -> scale -> caching/queues -> observability -> deployment/failure modes
```

Start simple and correct. Add scale only where the requirement demands it.

---

# Must Cover

* Functional requirements.
* Non-functional requirements: latency, scale, consistency, security, cost.
* REST endpoints and response/error shape.
* Data model and indexes.
* Authentication and object-level authorization.
* Pagination for lists.
* Idempotency for retries and creation flows.
* Transactions or atomic operations for consistency.
* Queue for slow/retryable work.
* Cache strategy with TTL and invalidation.
* Observability: logs, metrics, traces, alerts.
* Deployment: health, readiness, graceful shutdown, rollback.

---

# Scaling Node Services

1. Keep the service stateless.
2. Add indexes and pagination.
3. Measure slow routes and event loop delay.
4. Run multiple processes/containers.
5. Move CPU-heavy work to workers or jobs.
6. Add cache for measured hot reads.
7. Use queues for slow/retryable workflows.
8. Split services only when team or scale boundaries justify it.

---

# Reliability Patterns

| Need | Pattern |
| ---- | ------- |
| Prevent duplicate user/order | Unique index or idempotency key |
| Multiple writes together | Transaction |
| Publish event after DB write | Outbox pattern |
| Retry work safely | Queue with idempotent handler |
| Avoid stale overwrite | Optimistic locking/version |
| Handle provider failure | Timeout, retry with backoff, circuit breaker |
| Debug production issue | Request IDs, metrics, traces, logs |

---

# Traps

| Trap | Better approach |
| ---- | --------------- |
| Jump to microservices | Start with modular monolith unless needed. |
| Ignore data model | Data model drives correctness and performance. |
| Cache everything | Cache measured hot paths with invalidation rules. |
| No failure mode | Explain what happens when each dependency fails. |
| No auth design | Include object-level authorization. |
| No operations plan | Include health checks, shutdown, rollback, observability. |

---

# Quick Practice

1. Design task manager API.
2. Design file upload and image processing.
3. Design realtime chat scaling.
4. Design notification service.
5. Design payment order flow with idempotency.
