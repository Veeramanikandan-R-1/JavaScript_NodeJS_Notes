# Node.js 3-Year Interview Gap Audit

Reviewed on 2026-07-21.

The notes already have a strong broad map: runtime internals, core modules, Express, MongoDB, auth, files, realtime, testing, performance, production, architecture, and capstone projects.

The biggest issue was not missing folders; it was that the interview prep files were too generic. They did not give enough concrete answers for real interview questions. I upgraded the interview prep section with practical Q&A, traps, code snippets, and production checklists.

Current-topic sanity checks used official docs where possible:

* Node.js release table: https://nodejs.org/en/about/previous-releases
* Node.js test runner docs: https://nodejs.org/api/test.html
* Node.js async context docs: https://nodejs.org/api/async_context.html
* Express 5 error handling docs: https://expressjs.com/en/5x/guide/error-handling/
* OWASP API Security Top 10 2023: https://owasp.org/API-Security/editions/2023/en/0x00-header/
* MongoDB Node.js driver transactions docs: https://www.mongodb.com/docs/drivers/node/current/crud/transactions/

---

# Added or Strengthened

| Topic | Status |
| ----- | ------ |
| Event loop, microtasks, thread pool, cluster, worker threads | Strengthened in `14_Interview_Prep/a_node_runtime_interview_questions.md` |
| Streams and backpressure | Strengthened in runtime interview prep |
| Event loop lag and profiling | Strengthened in runtime interview prep |
| Native `fetch`, Undici awareness, `AbortController` timeouts | Added in runtime interview prep |
| `AsyncLocalStorage` request context | Added in runtime interview prep |
| Express middleware lifecycle | Strengthened in Express interview prep |
| Express 5 async error handling | Added in Express interview prep |
| Reverse proxy and `trust proxy` | Added in Express interview prep |
| API status codes, idempotency, pagination, versioning | Strengthened in Express interview prep |
| SQL vs MongoDB comparison | Added in database/security interview prep |
| Indexes, transactions, race conditions | Strengthened in database/security interview prep |
| BOLA, mass assignment, SSRF, CSRF, CORS | Added in database/security interview prep |
| Access/refresh token tradeoffs | Added in database/security interview prep |
| Outbox pattern and idempotent jobs | Added in database/security and system design prep |
| System design answer framework | Strengthened in system design prep |
| Caching, queues, observability, deployment failures | Strengthened in system design prep |
| TypeScript backend interview checklist | Added in master checklist |
| Native `node:test` awareness | Added in master checklist |

---

# Still Worth Adding Later

These are useful if you want the repo to become even more complete:

* Dedicated TypeScript for Node.js folder.
* Dedicated PostgreSQL/SQL folder.
* Dedicated Redis patterns folder.
* Dedicated OpenTelemetry/observability implementation note.
* Dedicated NestJS or Fastify comparison note.
* Dedicated dependency/security supply-chain note.

They are now covered at interview-checklist level, but not as full chapter-level notes.

---

# Priority Study Path

1. `14_Interview_Prep/e_three_year_nodejs_interview_master_checklist.md`
2. `14_Interview_Prep/a_node_runtime_interview_questions.md`
3. `14_Interview_Prep/b_express_api_interview_questions.md`
4. `14_Interview_Prep/c_database_auth_security_interview.md`
5. `14_Interview_Prep/d_backend_system_design_interview.md`
6. `11_Performance_Scaling/a_event_loop_lag_profiling.md`
7. `12_Production_DevOps/a_logging_monitoring_observability.md`
8. `15_Capstone_Projects/e_production_ready_api_capstone.md`

For a 3-year role, practice explaining answers out loud with one production example and one debugging step for each topic.
