# Revision Notes: Event Loop Lag and Profiling

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
| Event loop lag | Delay between when work is ready and when JavaScript can run it. |
| Profiler | Tool that shows where CPU time is spent. |
| p95 latency | 95 percent of requests complete at or below this duration. |
| Hot path | Code run frequently or under high load. |
| Blocking operation | Work that prevents the event loop from handling other tasks. |

---

# Interview Questions & Answers

### 1. What is event-loop lag, and why does it matter for an API?

Event-loop lag is the delay between when Node should run a callback and when it actually can. High lag means JavaScript is busy or blocked, so even simple requests, timers, and socket handling wait. Users experience it as latency spikes across unrelated endpoints.

### 2. How would you detect event-loop lag in production?

I would collect event-loop delay metrics with `perf_hooks.monitorEventLoopDelay()` or an APM agent, then correlate spikes with CPU, GC, endpoint traffic, payload sizes, and deployments. Logs should include request duration and route names so lag can be tied to specific workloads.

### 3. What kinds of code commonly block the event loop?

Large JSON parse/stringify, synchronous filesystem or crypto calls, expensive regex, CPU-heavy loops, compression, image processing, and processing huge arrays in one tick are common causes. The fix is to stream, chunk work, move CPU tasks to workers, or use native services where appropriate.

### 4. How do you profile a Node.js process with suspected CPU bottlenecks?

I would reproduce under load, capture a CPU profile using the inspector or `--cpu-prof`, and inspect flamegraphs for hot functions. I would also compare wall time with event-loop delay and GC metrics so I do not mistake database waiting for CPU saturation.

### 5. What is a good remediation if JSON responses are causing lag?

I would reduce payload size, paginate, avoid building massive objects in memory, stream where the client supports it, and consider faster serialization only after measuring. The best fix is usually changing the API shape so the server does less work per request.

---

# Quick Practice

1. Explain Event Loop Lag and Profiling in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
