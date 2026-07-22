# Revision Notes: Background Jobs and Queues

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Build small end-to-end services and inspect every boundary: HTTP, validation, logs, database, tests, and deployment.
* Best practice: Prefer explicit configuration, clear module boundaries, and deterministic package installs.
* Best practice: Use the Node.js documentation, framework docs, and source code when behavior matters.
* Best practice: Write notes as mental models plus production failure modes, not only syntax snippets.
* Avoid: Learning only framework syntax and skipping runtime behavior.
* Avoid: Treating local development success as production readiness.
* Avoid: Keeping secrets, environment-specific paths, or one-off commands inside source code.
* Avoid: Ignoring error paths, shutdown behavior, and operational visibility.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| Queue | Durable list of work items. |
| Worker | Process that consumes jobs. |
| Retry | Automatic reattempt after transient failure. |
| Dead letter | Failed job storage after retry exhaustion. |
| Idempotent job | Job safe to run more than once. |

---

# Interview Questions & Answers

### 1. What makes a task a good candidate for a background queue?

A queue fits work that is slow, retryable, rate-limited, or not required to complete before responding to the user: emails, webhooks, reports, media processing, and third-party sync. I would keep truly synchronous decisions in the request path and move side effects that can tolerate eventual consistency to workers.

### 2. What does at-least-once delivery mean for job handlers?

The same job may run more than once, especially after worker crashes or timeout uncertainty. Handlers must be idempotent: use stable business keys, check existing state before writing, and make external calls with idempotency keys when providers support them. Assuming exactly-once execution is a production bug waiting to happen.

### 3. How do you handle poison jobs that keep failing?

I would use bounded retries with backoff, classify retryable versus permanent errors, and move exhausted jobs to a dead-letter queue with enough context to inspect safely. Alerts should fire on dead-letter rate, not on every transient failure. Fixing the bad input or code should allow a controlled replay.

### 4. How do you choose worker concurrency?

I start from the bottleneck: CPU, database, provider rate limit, memory, or network. Then I set concurrency so workers keep throughput high without overwhelming dependencies. For example, email workers may be limited by provider quotas, while image workers may need low concurrency because each job is CPU and memory heavy.

### 5. What belongs in a job payload?

A job should carry stable identifiers and minimal immutable data, not a huge copy of mutable application state. The worker can load current state by id, validate that the job is still relevant, and then perform the action. This keeps retries safer when the domain object changed after the job was enqueued.

---

# Quick Practice

1. Explain Background Jobs and Queues in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
