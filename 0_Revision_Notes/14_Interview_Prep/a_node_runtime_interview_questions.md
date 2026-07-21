# Revision Notes: Node Runtime Interview Questions

Use this as the quick final pass before interviews. For full answers, read `14_Interview_Prep/a_node_runtime_interview_questions.md`.

---

# Must Remember

* JavaScript runs on one main thread per Node process, but Node handles concurrency using the event loop, OS async I/O, and libuv's thread pool.
* Node is best for I/O-heavy services. CPU-heavy JavaScript can block all requests in that process.
* Event loop phases commonly discussed: timers, pending callbacks, poll, check, close callbacks.
* Microtasks run between phases. `process.nextTick` has special priority and can starve the loop if abused.
* The libuv thread pool handles selected native work such as many `fs` calls, `dns.lookup`, zlib, and crypto.
* Streams need backpressure handling. Prefer `pipeline` for stream chains.
* Use cluster/multiple processes for server concurrency across CPU cores.
* Use worker threads for CPU-heavy JavaScript work.
* Use `AbortController` and timeouts for outbound calls.
* Use `AsyncLocalStorage` for request context such as request ID or tenant ID.
* On uncaught fatal errors, log, stop accepting new work, drain briefly, close resources, and restart.

---

# Fast Interview Answers

### Is Node single-threaded?

JavaScript execution is single-threaded per process, but Node itself uses the event loop, OS async I/O, and a libuv thread pool. It scales well for I/O-heavy work, but CPU-heavy JS can block the event loop.

### `await` blocks or not?

`await` pauses the current async function, not the whole process. The event loop can handle other work while the awaited I/O is pending. If the awaited function runs CPU-heavy synchronous code, that code still blocks.

### Cluster vs worker threads?

Cluster means multiple processes, each with its own memory and event loop, usually for scaling HTTP servers. Worker threads run JavaScript in parallel inside one process, usually for CPU-heavy tasks.

### How to debug event loop lag?

Measure event loop delay, CPU, memory, p95/p99 latency, slow routes, database timings, and dependency latency. Then inspect CPU profiles, heap snapshots, synchronous calls, large JSON work, regex backtracking, and unbounded loops.

### What is graceful shutdown?

On `SIGTERM` or `SIGINT`, stop accepting new requests, let in-flight work finish within a timeout, stop queue consumers, close DB/cache connections, and exit.

---

# Traps

| Trap | Correct answer |
| ---- | -------------- |
| `setTimeout(fn, 0)` runs immediately. | It runs in a future timers phase when eligible. |
| Increasing `UV_THREADPOOL_SIZE` fixes all performance. | It only helps thread-pool-bound work. |
| JWT is encrypted. | JWT is usually signed and readable. |
| CORS is API security. | CORS is browser read control, not authorization. |
| In-memory sessions are fine everywhere. | They break with multiple processes, restarts, and horizontal scaling. |

---

# Quick Practice

1. Explain event loop and microtasks in two minutes.
2. Explain why `process.nextTick` can be dangerous.
3. Give one example of thread-pool saturation.
4. Explain stream backpressure.
5. Explain how you would handle a slow third-party API.
