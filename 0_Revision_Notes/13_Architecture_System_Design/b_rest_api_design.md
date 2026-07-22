# Revision Notes: REST API Design

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
| Resource | Domain object exposed through a URL. |
| Representation | JSON shape sent to clients. |
| Idempotency | Repeated request has same practical effect. |
| Versioning | Strategy for evolving contracts safely. |
| Pagination | Bounded list response pattern. |

---

# Interview Questions & Answers

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

# Quick Practice

1. Explain REST API Design in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
