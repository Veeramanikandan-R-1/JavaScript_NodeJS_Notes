# Revision Notes: Layered Backend Architecture

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
| Controller | Transport adapter for HTTP or realtime events. |
| Service | Application use case and business workflow. |
| Repository | Persistence abstraction. |
| Integration client | Wrapper for third-party APIs. |
| Domain model | Core business concepts and invariants. |

---

# Interview Questions & Answers

### 1. In a controller-service-repository design, where should transaction boundaries live?

Usually in the service or application layer because it understands the full use case. Repositories should expose data operations, but they should not independently start transactions that prevent one business action from committing atomically.

### 2. What is a smell that your controllers contain too much business logic?

If controllers know validation rules, authorization decisions, persistence details, and orchestration, they are doing too much. They become hard to test without HTTP and impossible to reuse from jobs, CLI tasks, or message consumers.

### 3. How do you avoid turning the service layer into a giant dumping ground?

Keep services organized around use cases or domain capabilities, not generic helpers. Use small modules with clear inputs, return values, and dependencies; move pure domain rules into domain functions when they do not need infrastructure.

### 4. Where should authorization checks be placed in a layered backend?

Coarse authentication can happen in middleware, but resource-level authorization belongs close to the use case that loads the resource. That prevents direct service calls, background jobs, or alternate routes from bypassing ownership rules.

### 5. How would you review a PR that adds a new dependency from repository code back to HTTP middleware?

I would block it because it reverses the dependency direction. Data access should not know about Express request objects. Pass explicit values such as tenant id or actor id into the use case instead.

---

# Quick Practice

1. Explain Layered Backend Architecture in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
