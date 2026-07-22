# Revision Notes: Filtering, Pagination, and Sorting

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
| filter | Narrows results by fields such as completed or owner. |
| limit | Maximum number of results to return. |
| skip | Number of matching results to skip. |
| sort | Ordering rule such as createdAt descending. |
| cursor pagination | Pagination using a stable cursor instead of large skip values. |

---

# Interview Questions & Answers

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

# Quick Practice

1. Explain Filtering, Pagination, and Sorting in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
