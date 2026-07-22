# Revision Notes: MongoDB Native Driver and CRUD

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
| Collection | Group of MongoDB documents. |
| Document | JSON-like record stored as BSON. |
| ObjectId | Common MongoDB identifier type. |
| CRUD | Create, read, update, delete. |
| Connection pool | Reusable set of database network connections. |

---

# Interview Questions & Answers

### 1. When would you use the native MongoDB driver instead of Mongoose?

I would use the native driver when I want direct control over queries, aggregation, sessions, bulk writes, or a thin data layer without schema abstractions. It is also a good fit for services that already validate data at the API boundary.

### 2. What is the difference between `findOne`, `insertOne`, `updateOne`, and `findOneAndUpdate` from an API design perspective?

`findOne` reads, `insertOne` creates, `updateOne` reports write counts, and `findOneAndUpdate` can atomically modify and return a document. For APIs that need the updated resource in the response, `findOneAndUpdate` often avoids a race-prone second read.

### 3. How do you prevent a client from injecting arbitrary MongoDB operators into a filter?

Build filters from an allowlist of fields and operators instead of spreading `req.query` or `req.body` into Mongo calls. Reject objects where only scalars are expected, especially around auth-sensitive lookups.

### 4. What should you check when a CRUD endpoint is slow in MongoDB?

Inspect the query shape, indexes, projection, sort, limit, and explain plan. Also check whether the endpoint is fetching large documents or doing multiple round trips that could be collapsed.

### 5. How do you handle `ObjectId` values safely in route parameters?

Validate the id format before querying and convert it explicitly to `ObjectId`. If the id is invalid, return a client error or `404` based on your API policy, but do not let cast errors leak as generic `500`s.

---

# Quick Practice

1. Explain MongoDB Native Driver and CRUD in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
