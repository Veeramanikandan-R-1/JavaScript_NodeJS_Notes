# Revision Notes: Message Queues and Event-driven Design

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Start simple, then introduce boundaries where change pressure appears.
* Best practice: Keep controllers, services, repositories, and external clients distinct in larger services.
* Best practice: Document API contracts and failure behavior.
* Best practice: Review architecture through real user flows and operational failure modes.
* Avoid: Creating too many layers before the domain needs them.
* Avoid: Letting controllers own business rules and database details.
* Avoid: Using microservices to solve code organization problems.
* Avoid: Building APIs without versioning, idempotency, and backward compatibility thinking.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| Producer | Code that publishes a message. |
| Consumer | Code that handles a message. |
| Topic | Named stream of related events. |
| At-least-once | Delivery model where duplicates are possible. |
| Outbox | Pattern for reliably publishing events after database writes. |

---

# Interview Questions & Answers

### 1. A consumer processes the same payment event twice. What design mistake do you look for first?

The consumer probably assumes exactly-once delivery. Real systems are usually at-least-once, so handlers need idempotency keys, unique constraints, or processed-event records around the side effect.

### 2. When would you choose a queue over a synchronous HTTP call?

Use a queue when work can happen asynchronously, needs retry, absorbs bursts, or fans out to other systems. Keep HTTP when the caller needs an immediate answer and the dependency is part of the user-facing transaction.

### 3. How do you handle poison messages?

Use bounded retries with backoff, then move the message to a dead-letter queue with enough metadata to debug. Infinite retry loops hide the real failure and can block good messages behind bad ones.

### 4. What problem does the outbox pattern solve?

It prevents the gap where the database commit succeeds but publishing the event fails. Write the domain change and outbound event in the same transaction, then have a relay publish the outbox record reliably.

### 5. How do ordering requirements affect queue design?

Ordering usually requires partitioning by an entity key, such as orderId or userId, and accepting lower parallelism within that key. Global ordering is expensive and often unnecessary if the domain can define a narrower ordering guarantee.

---

# Quick Practice

1. Explain Message Queues and Event-driven Design in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
