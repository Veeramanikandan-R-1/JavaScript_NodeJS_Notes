# Filtering, Pagination, and Sorting (Senior Backend Node.js Engineer Perspective)

Before going deeper into frameworks or libraries, understand this topic as part of real backend engineering: returning bounded query results that clients can page through reliably.

---

# 1. Fundamentals

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.

---

# 2. Core Concepts

| Concept | Practical meaning |
| ------- | ----------------- |
| filter | Narrows results by fields such as completed or owner. |
| limit | Maximum number of results to return. |
| skip | Number of matching results to skip. |
| sort | Ordering rule such as createdAt descending. |
| cursor pagination | Pagination using a stable cursor instead of large skip values. |

---

# 3. Internal Working

* A Node API talks to databases through drivers or ORMs/ODMs that manage network calls and serialization.
* MongoDB stores documents; Mongoose adds schemas, validation, middleware, and model methods.
* Database performance depends heavily on indexes, query shape, connection pooling, and result size.

---

# 4. Common Mistakes

* Trusting request bodies and storing them directly.
* Fetching unbounded result sets.
* Adding indexes only after production data grows.
* Treating Mongoose documents, plain objects, and JSON responses as the same thing.

---

# 5. Best Practices

* Validate at the API boundary and enforce invariants at the database layer.
* Design indexes from query patterns.
* Use pagination, projection, and lean reads where appropriate.
* Keep database access behind repository or service boundaries in larger apps.

---

# 6. Code Example

```js
const tasks = await Task.find({ owner: req.user._id, completed })
  .limit(Number(req.query.limit) || 20)
  .skip(Number(req.query.skip) || 0)
  .sort({ createdAt: req.query.sort === "oldest" ? 1 : -1 });
```

---

# 7. Real-world Scenarios

* Building a service where filtering, pagination, and sorting affects correctness or latency.
* Debugging a production issue caused by a weak mental model of filtering, pagination, and sorting.
* Explaining filtering, pagination, and sorting in a senior backend interview with tradeoffs and examples.

---

# 8. Senior Deep Dive

## When to Use

* Validate at the API boundary and enforce invariants at the database layer.
* Design indexes from query patterns.
* Use pagination, projection, and lean reads where appropriate.
* Keep database access behind repository or service boundaries in larger apps.

## Debug Checklist

* Reproduce with the smallest input and environment that fails.
* Inspect logs, stack traces, request data, resource usage, and dependency behavior.
* Is the query indexed?
* Is the result bounded?
* Does the data model enforce the invariant?

## Code Review Checklist

* Is the query indexed?
* Is the result bounded?
* Does the data model enforce the invariant?

---

# Revision Notes

* This topic matters because backend bugs affect users, data, security, and operations.
* Learn the runtime mental model before memorizing framework syntax.
* Prefer small examples, tests, and production-style failure checks.
* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| filter | Narrows results by fields such as completed or owner. |
| limit | Maximum number of results to return. |
| skip | Number of matching results to skip. |
| sort | Ordering rule such as createdAt descending. |
| cursor pagination | Pagination using a stable cursor instead of large skip values. |

---

# Interview Questions with Answers

### 1. Why is offset pagination with `skip` a problem on large MongoDB collections?

Large skips force the database to walk past many records before returning a page, which gets slower as the page number grows. Cursor pagination based on an indexed sort key is usually more stable for high-volume lists.

### 2. How would you design cursor pagination for a feed sorted by newest first?

Sort by `createdAt` and a tie-breaker like `_id`, then pass the last seen pair as the cursor. The next query uses a range condition on those fields so pagination remains deterministic when rows share timestamps.

### 3. How do you safely expose filtering to API clients?

Allowlist fields and operators, validate values, and cap limits. Do not let clients submit arbitrary Mongo filters, regexes, or sort keys because that can create slow queries or security bugs.

### 4. What can go wrong if sorting is not deterministic?

Records can appear on multiple pages or be skipped when many documents have the same sort value. Add a stable tie-breaker, usually `_id`, to make pagination repeatable.

### 5. How do you debug a list endpoint that became slow after adding filters?

Capture the exact filter and sort, run `explain`, and compare it to existing indexes. I would also check default limits, projections, regex use, and whether the API now allows unindexed sort combinations.

---

# Hands-on Exercises

## Exercise 1

Build a small example that demonstrates this topic: Filtering, Pagination, and Sorting.

### Solution

Keep it focused, handle one failure path, and write down what happens internally.

## Exercise 2

Turn this topic into a code review checklist: Filtering, Pagination, and Sorting.

### Solution

Include these checks: Is the query indexed? Is the result bounded? Does the data model enforce the invariant?

---

# Senior Backend Engineer Takeaway

For senior-level work, Filtering, Pagination, and Sorting is not only an API or syntax detail. You should be able to explain the mental model, choose the right pattern for a product requirement, identify common failure modes, and verify behavior with tests, logs, profiling, and production-aware review.
