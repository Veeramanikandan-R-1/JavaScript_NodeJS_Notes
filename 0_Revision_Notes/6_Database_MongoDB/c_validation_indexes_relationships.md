# Revision Notes: Validation, Indexes, and Relationships

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
| Validator | Rule that rejects invalid data. |
| Unique index | Database-level uniqueness guarantee. |
| Reference | ObjectId relationship to another collection. |
| Populate | Mongoose helper that resolves references. |
| Cascade delete | Removing dependent records when owner is deleted. |

---

# Interview Questions & Answers

### 1. What validation should live in MongoDB indexes instead of only application code?

Uniqueness and some existence constraints should be enforced with indexes because application checks can race. For example, unique email per tenant needs a compound unique index, not just a pre-create query.

### 2. How do you model relationships in MongoDB: embed or reference?

Embed when the child data is read with the parent, bounded in size, and updated together. Reference when the data grows independently, is shared, or needs separate lifecycle and query patterns.

### 3. A query filters by `tenantId` and `status`, then sorts by `createdAt`. What index would you consider?

I would consider a compound index like `{ tenantId: 1, status: 1, createdAt: -1 }`, based on actual cardinality and query patterns. The goal is to support both filtering and sort without scanning too much data.

### 4. What is the risk of adding indexes casually to fix every slow query?

Indexes speed reads but slow writes and consume memory and storage. Too many overlapping indexes can hurt write-heavy workloads, so I would verify with explain plans and production-like query frequency.

### 5. How do you enforce referential integrity when MongoDB does not behave like a relational database?

Use application-level checks, transactions when multiple documents must change together, and cleanup jobs for eventual consistency. For critical ownership boundaries, include identifiers like `tenantId` in related documents and indexes.

---

# Quick Practice

1. Explain Validation, Indexes, and Relationships in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
