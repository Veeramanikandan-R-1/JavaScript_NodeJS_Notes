# Revision Notes: Transactions and Data Consistency

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Validate at the API boundary and enforce invariants at the database layer.
* Best practice: Design indexes from query patterns.
* Best practice: Use pagination, projection, and lean reads where appropriate.
* Best practice: Keep database access behind repository or service boundaries in larger apps.
* Avoid: Trusting request bodies and storing them directly.
* Avoid: Fetching unbounded result sets.
* Avoid: Adding indexes only after production data grows.
* Avoid: Treating Mongoose documents, plain objects, and JSON responses as the same thing.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| Invariant | Business rule that must always remain true. |
| Transaction | Group of database operations that commit or roll back together. |
| Idempotency | Safe repeated request behavior. |
| Optimistic concurrency | Detects conflicting updates through version or timestamp checks. |
| Write concern | MongoDB durability acknowledgement level. |

---

# Interview Questions & Answers

### 1. When do you actually need a MongoDB transaction?

Use a transaction when multiple writes must commit or roll back as one business operation, such as creating an order and reserving inventory. Do not use transactions to hide poor data modeling or for single-document atomic updates.

### 2. What is an example where a single-document atomic update is better than a transaction?

Incrementing a counter, changing status with a condition, or reserving one item can often be done with `findOneAndUpdate` and a predicate. That is simpler, faster, and usually easier to retry safely.

### 3. What failure behavior should you expect around transactions?

Transactions can fail with transient errors, write conflicts, or unknown commit results. The application should retry only safe operations and use idempotency keys when an external request might be submitted again.

### 4. How would you avoid double-charging a customer when database and payment operations both happen?

Do not put the external payment call blindly inside a database transaction. Use idempotency with the payment provider, persist operation state, and design a recovery flow for uncertain outcomes.

### 5. What consistency tradeoff do you accept when using eventual consistency instead of a transaction?

The system may temporarily show stale or incomplete state, but it can be more available and scalable. The key is to make reconciliation, retries, and user-visible status explicit rather than pretending every step is instant.

---

# Quick Practice

1. Explain Transactions and Data Consistency in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
