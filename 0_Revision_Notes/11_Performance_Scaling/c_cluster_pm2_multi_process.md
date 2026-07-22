# Revision Notes: Cluster, PM2, and Multi-process Scaling

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Measure p50, p95, p99 latency, event loop lag, CPU, memory, and database timings.
* Best practice: Use streaming, pagination, compression, caching, and indexes deliberately.
* Best practice: Scale stateless processes horizontally.
* Best practice: Use worker threads only for clear CPU-bound jobs.
* Avoid: Adding cluster workers before fixing slow queries or blocking JavaScript.
* Avoid: Keeping state in memory and then expecting multi-process scaling to work.
* Avoid: Increasing UV_THREADPOOL_SIZE without understanding the actual bottleneck.
* Avoid: Caching data without invalidation and freshness rules.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| cluster | Core module that forks worker processes. |
| PM2 | Process manager that can run clustered Node apps. |
| Worker process | Separate process with its own event loop and memory. |
| Round robin | Common strategy for distributing connections. |
| Stateless process | Process that does not own durable user state in memory. |

---

# Interview Questions & Answers

### 1. Why does clustering help a Node.js HTTP server?

A single Node process runs JavaScript on one main thread, so it cannot use all CPU cores for request handling. Clustering runs multiple processes that share incoming traffic, improving CPU utilization and isolation. It does not make shared memory magically safe; each process has its own heap.

### 2. What breaks when you move from one process to multiple processes?

In-memory sessions, local caches, scheduled jobs, rate limit counters, and WebSocket room state stop being globally correct. Anything that must be shared needs Redis, a database, a queue, or another external coordination mechanism. Multi-process scaling exposes hidden state assumptions.

### 3. How should graceful shutdown work in a clustered app?

The process should stop accepting new connections, let in-flight requests finish within a timeout, close database and queue connections, and exit with a clear code. The process manager can then replace it. For WebSockets, you also need a drain or reconnect strategy.

### 4. What is PM2 responsible for, and what is still your application's responsibility?

PM2 can run multiple instances, restart crashed processes, manage logs, and help with zero-downtime reloads. The application still owns health checks, graceful shutdown, idempotent startup, external state, and correct behavior during restarts.

### 5. How do you decide between vertical clustering and horizontal scaling?

I use clustering to utilize cores on a machine and horizontal scaling for capacity, availability, deployment flexibility, and fault isolation. The app should be stateless enough for both. The decision depends on bottlenecks, traffic shape, infrastructure, and failure-domain requirements.

---

# Quick Practice

1. Explain Cluster, PM2, and Multi-process Scaling in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
