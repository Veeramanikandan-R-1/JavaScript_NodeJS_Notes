# REST API Design (Senior Backend Node.js Engineer Perspective)

Before going deeper into frameworks or libraries, understand this topic as part of real backend engineering: designing predictable resource-oriented APIs.

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
| Resource | Domain object exposed through a URL. |
| Representation | JSON shape sent to clients. |
| Idempotency | Repeated request has same practical effect. |
| Versioning | Strategy for evolving contracts safely. |
| Pagination | Bounded list response pattern. |

---

# 3. Internal Working

* Architecture is the set of boundaries that lets a backend change safely as requirements grow.
* A request usually crosses transport, application, domain, persistence, and integration layers.
* The right abstraction is the one that protects business rules from framework and infrastructure churn.

---

# 4. Common Mistakes

* Creating too many layers before the domain needs them.
* Letting controllers own business rules and database details.
* Using microservices to solve code organization problems.
* Building APIs without versioning, idempotency, and backward compatibility thinking.

---

# 5. Best Practices

* Start simple, then introduce boundaries where change pressure appears.
* Keep controllers, services, repositories, and external clients distinct in larger services.
* Document API contracts and failure behavior.
* Review architecture through real user flows and operational failure modes.

---

# 6. Code Example

```text
GET    /tasks
POST   /tasks
GET    /tasks/:id
PATCH  /tasks/:id
DELETE /tasks/:id
```

---

# 7. Real-world Scenarios

* Building a service where rest api design affects correctness or latency.
* Debugging a production issue caused by a weak mental model of rest api design.
* Explaining rest api design in a senior backend interview with tradeoffs and examples.

---

# 8. Senior Deep Dive

## When to Use

* Start simple, then introduce boundaries where change pressure appears.
* Keep controllers, services, repositories, and external clients distinct in larger services.
* Document API contracts and failure behavior.
* Review architecture through real user flows and operational failure modes.

## Debug Checklist

* Reproduce with the smallest input and environment that fails.
* Inspect logs, stack traces, request data, resource usage, and dependency behavior.
* What is the production failure mode?
* How do tests prove it?
* How would a teammate maintain it?

## Code Review Checklist

* What is the production failure mode?
* How do tests prove it?
* How would a teammate maintain it?

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
| Resource | Domain object exposed through a URL. |
| Representation | JSON shape sent to clients. |
| Idempotency | Repeated request has same practical effect. |
| Versioning | Strategy for evolving contracts safely. |
| Pagination | Bounded list response pattern. |

---

# Interview Questions with Answers

### 1. When should POST be idempotent, and how would you implement it?

Payment, order creation, and retry-prone commands should support idempotency keys. Store the key with request fingerprint and final response so a client retry returns the same result instead of creating duplicate side effects.

### 2. How do you design pagination for a table that changes while users are paging?

Prefer cursor pagination for large or frequently changing datasets. The cursor should encode stable sort fields such as createdAt and id. Offset pagination is simpler but can skip or duplicate records as rows are inserted or deleted.

### 3. What should an error response include in a public REST API?

Use a stable machine-readable code, human-readable message, request id, and field-level validation details when relevant. Do not leak stack traces, database errors, or authorization internals.

### 4. How do PUT and PATCH differ in a code review?

PUT should represent replacing the resource with a complete representation, while PATCH changes selected fields. In practice I check that partial updates cannot accidentally null fields, bypass validation, or change immutable fields.

### 5. How do you enforce multi-tenant resource ownership in REST routes?

Do not trust tenant or user ids from the path alone. Load the resource through a query scoped by the authenticated actor or tenant, and return 404 or 403 consistently based on the product security policy.

---

# Hands-on Exercises

## Exercise 1

Build a small example that demonstrates this topic: REST API Design.

### Solution

Keep it focused, handle one failure path, and write down what happens internally.

## Exercise 2

Turn this topic into a code review checklist: REST API Design.

### Solution

Include these checks: What is the production failure mode? How do tests prove it? How would a teammate maintain it?

---

# Senior Backend Engineer Takeaway

For senior-level work, REST API Design is not only an API or syntax detail. You should be able to explain the mental model, choose the right pattern for a product requirement, identify common failure modes, and verify behavior with tests, logs, profiling, and production-aware review.
