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

### 1. How would you explain REST API Design in a real backend project?

REST API Design should be explained through the request or process flow it affects, the runtime behavior behind it, and the production tradeoff. A senior answer connects the API to latency, correctness, failure handling, and maintainability.

### 2. What happens internally when REST API Design is involved?

Architecture is the set of boundaries that lets a backend change safely as requirements grow. A request usually crosses transport, application, domain, persistence, and integration layers. The right abstraction is the one that protects business rules from framework and infrastructure churn.

### 3. What is a common production bug related to REST API Design?

Creating too many layers before the domain needs them.

### 4. How would you debug an issue in REST API Design?

Reproduce the failing input, inspect logs and stack traces, isolate the boundary involved, add focused instrumentation, and write a regression test once the cause is known.

### 5. What should a senior engineer check in code review?

What is the production failure mode? How do tests prove it? How would a teammate maintain it?

---

# Quick Practice

1. Explain REST API Design in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
