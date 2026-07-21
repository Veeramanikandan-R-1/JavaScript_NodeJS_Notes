# Node Runtime Interview Questions for 3 Years Experience

Use this file to practice crisp, production-aware answers. For a 3-year Node.js backend interview, the interviewer usually wants proof that you can reason about the runtime under load, not just define APIs.

---

# Must-Know Answer Pattern

Use this structure:

1. Define the concept in one sentence.
2. Explain what Node does internally.
3. Name the tradeoff or failure mode.
4. Give a production example.
5. Mention how you would measure or debug it.

Example:

```text
Node.js runs JavaScript on a main thread, but it handles concurrency through the event loop, OS async I/O, and libuv's thread pool for selected native work. This is excellent for I/O-heavy APIs, but CPU-heavy JavaScript can block every request in that process. I would detect that using p95/p99 latency, event loop delay, CPU profiles, and route-level timings.
```

---

# High-Frequency Runtime Questions

### 1. Is Node.js single-threaded?

JavaScript execution in one Node process runs mainly on one thread. Node itself is not only one thread: libuv uses an event loop, the OS handles many socket operations asynchronously, and libuv has a worker thread pool for selected tasks such as file system work, DNS lookup through `dns.lookup`, compression, crypto, and some native operations.

The senior answer is: Node is single-threaded for JavaScript execution per process, but concurrent for I/O through the event loop and native layers.

### 2. How does Node handle many concurrent HTTP requests?

Node accepts requests through the HTTP server, runs lightweight JavaScript callbacks on the event loop, and delegates slow I/O to the OS, database driver, network stack, or libuv thread pool. While one request waits for I/O, the event loop can process other ready callbacks.

The limit is CPU-heavy JavaScript, large synchronous work, slow serialization, huge JSON payloads, and overloaded downstream dependencies.

### 3. What are the main event loop phases?

The common phases are timers, pending callbacks, poll, check, and close callbacks. `setTimeout` callbacks run in the timers phase when eligible, I/O callbacks usually run around poll, `setImmediate` runs in the check phase, and close events run in close callbacks.

Microtasks run between these steps. In Node, `process.nextTick` has special priority and can starve the event loop if abused. Promise callbacks run in the microtask queue.

### 4. Difference between `process.nextTick`, `queueMicrotask`, Promise microtasks, `setTimeout`, and `setImmediate`?

`process.nextTick` runs before other microtasks in Node and should be used sparingly for compatibility or cleanup after the current call stack. Promise callbacks and `queueMicrotask` run as microtasks. `setTimeout(fn, 0)` schedules a timer for a future timers phase. `setImmediate` schedules work for the check phase, often after I/O callbacks.

Interview trap: never say `setTimeout(fn, 0)` means "immediately"; it means "after at least the timer threshold and when the event loop can run it."

### 5. What goes into the libuv thread pool?

Common examples are many `fs` operations, CPU-heavy crypto APIs like `pbkdf2`, zlib compression, and `dns.lookup`. Most socket networking does not consume a libuv worker thread in the same way; the OS async I/O mechanisms handle it.

Increasing `UV_THREADPOOL_SIZE` can help only when the bottleneck is thread-pool work. It will not fix blocking JavaScript, slow database queries, or saturated remote services.

### 6. How would you debug event loop lag?

Measure first:

```js
import { monitorEventLoopDelay } from "node:perf_hooks";

const delay = monitorEventLoopDelay({ resolution: 20 });
delay.enable();

setInterval(() => {
  console.log({
    p95Ms: Math.round(delay.percentile(95) / 1e6),
    p99Ms: Math.round(delay.percentile(99) / 1e6),
  });
  delay.reset();
}, 10_000);
```

Then inspect CPU profiles, heap snapshots, slow routes, slow queries, synchronous file/crypto calls, JSON parsing/stringifying of large payloads, regex backtracking, and loops over large arrays.

### 7. Cluster vs worker threads?

Use cluster or multiple processes to run multiple server instances across CPU cores. Each process has its own memory, event loop, and failure boundary.

Use worker threads for CPU-heavy JavaScript tasks inside an application, such as image processing, parsing large files, compression workflows, or expensive calculations. Workers share process resources and can communicate through messages or shared memory, but they add complexity.

Short answer: cluster scales request handling across processes; worker threads parallelize CPU-heavy JavaScript.

### 8. What is backpressure in Node streams?

Backpressure means the writable side cannot consume data as fast as the readable side produces it. If ignored, memory grows because chunks keep buffering.

Use `stream.pipeline` or await drain signals instead of manually pushing unlimited chunks.

```js
import { pipeline } from "node:stream/promises";
import fs from "node:fs";
import zlib from "node:zlib";

await pipeline(
  fs.createReadStream("input.log"),
  zlib.createGzip(),
  fs.createWriteStream("input.log.gz"),
);
```

### 9. CommonJS vs ES modules?

CommonJS uses `require` and `module.exports`; ES modules use `import` and `export`. ES modules are statically analyzable and support top-level `await`. CommonJS loads synchronously and is still common in older Node projects.

Know interop pain points: file extensions, `"type": "module"`, default exports from CommonJS, `__dirname` replacement using `import.meta.url`, and tooling compatibility.

### 10. What are `AbortController` and request timeouts used for?

They cancel slow or no-longer-needed async work. In services, every outbound HTTP call should have a timeout, and cancellation should propagate when useful.

```js
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 3000);

try {
  const res = await fetch("https://api.example.com/users", {
    signal: controller.signal,
  });
  return await res.json();
} finally {
  clearTimeout(timeout);
}
```

Without timeouts, one slow dependency can consume sockets, memory, and request capacity.

### 11. What is `AsyncLocalStorage` used for?

`AsyncLocalStorage` keeps request-scoped context available across asynchronous calls. It is commonly used for correlation IDs, tenant IDs, audit metadata, and trace context without passing `req.id` through every function.

The risk is context leakage or memory issues if used carelessly with long-lived handles. Prefer small context values and clean middleware boundaries.

```js
import { AsyncLocalStorage } from "node:async_hooks";
import crypto from "node:crypto";

const requestContext = new AsyncLocalStorage();

app.use((req, res, next) => {
  requestContext.run({ requestId: crypto.randomUUID() }, next);
});

export function getRequestId() {
  return requestContext.getStore()?.requestId;
}
```

### 12. How do you handle uncaught exceptions and unhandled rejections?

Do not treat them as normal recoverable errors. Log with enough context, stop accepting new work, drain in-flight requests briefly, close database/queue connections, and let the process restart under a process manager or orchestrator.

Application errors should be handled near request boundaries. Process-level handlers are the last line of defense.

### 13. What is graceful shutdown?

Graceful shutdown means that on `SIGTERM` or `SIGINT`, the service stops accepting new requests, allows existing requests to finish within a timeout, closes HTTP servers, database pools, queue consumers, timers, and exits.

This matters during deploys, container termination, autoscaling, and crashes.

### 14. How do memory leaks happen in Node?

Common causes are unbounded arrays/maps, forgotten timers, event listeners that are never removed, caches without TTL/size limits, retaining large request objects in closures, and buffering streams.

Debug with RSS/heap metrics, heap snapshots, allocation profiling, and load tests that compare memory before and after traffic.

### 15. How do you explain Node performance tuning?

Start with measurement: p50/p95/p99 latency, throughput, CPU, memory, event loop delay, garbage collection, database timings, and dependency latency.

Then fix the actual bottleneck:

* Slow DB query: add index, change query, paginate, denormalize carefully.
* Blocking CPU: optimize algorithm, move to worker thread, or offload job.
* Large payload: stream, compress, paginate, limit body size.
* External API: add timeout, retry with backoff, circuit breaker, cache, fallback.
* Process saturation: run multiple stateless processes behind a load balancer.

---

# Production Interview Traps

| Claim | Better answer |
| ----- | ------------- |
| Node is single-threaded, so it cannot scale. | One process has one main JS thread, but Node scales I/O well and can use multiple processes or workers. |
| `await` blocks Node. | `await` pauses the current async function, not the whole event loop, unless the awaited work itself performs blocking CPU work. |
| Increasing thread pool size improves all performance. | It only helps when thread-pool tasks are the bottleneck. |
| CORS protects APIs from all clients. | CORS is a browser policy, not authorization. |
| JWT is encrypted. | JWT is usually signed, readable, and must not contain secrets. |

---

# 3-Year Experience Bar

You should be able to:

* Explain event loop order with a small code example.
* Identify blocking code in an API route.
* Know when to use streams instead of buffering.
* Explain thread pool saturation.
* Compare cluster, PM2, containers, and worker threads.
* Add timeouts to outbound HTTP calls.
* Design graceful shutdown for HTTP, DB, queues, and cron jobs.
* Use logs, metrics, traces, and profiles to debug production issues.
* Discuss Node LTS upgrades and dependency compatibility.

---

# Practice Questions

1. Why can `JSON.stringify` become a performance issue?
2. What happens if a stream consumer is slower than the producer?
3. Why might four concurrent `crypto.pbkdf2` calls delay file reads?
4. How would you prevent a slow third-party API from taking down your service?
5. Why is in-memory session state risky with cluster or Kubernetes?
6. How would you preserve request IDs across service layers?
7. What would you measure before adding Redis cache?
8. How do you safely shut down a worker that is processing jobs?
9. What is the difference between retrying an idempotent and non-idempotent request?
10. How would you investigate rising memory usage after every deploy?
