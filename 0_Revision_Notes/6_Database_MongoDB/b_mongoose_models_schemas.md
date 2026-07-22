# Revision Notes: Mongoose Models and Schemas

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
| Schema | Definition of fields, types, defaults, validation, indexes, and middleware. |
| Model | Constructor and query API for one collection. |
| Document | Model instance with methods and change tracking. |
| Middleware | Pre/post hooks for lifecycle behavior. |
| toJSON | Serialization hook for hiding private fields. |

---

# Interview Questions & Answers

### 1. What does a Mongoose schema give you beyond a plain MongoDB collection?

It gives casting, defaults, validation, middleware hooks, virtuals, instance methods, and a model API. Those are useful, but they also create behavior that reviewers must understand because not every rule lives in the database.

### 2. Why can Mongoose casting be both helpful and dangerous?

Casting makes common inputs convenient, such as string ids becoming ObjectIds. It is dangerous when invalid or surprising input is quietly transformed, so critical fields still need explicit boundary validation.

### 3. Where should you put business rules: schema validators, middleware, or services?

Simple document invariants can live in schema validation. Cross-document rules, authorization decisions, external calls, and workflow behavior belong in services because hooks can hide side effects and make tests harder.

### 4. How do `lean()` queries change behavior?

`lean()` returns plain JavaScript objects instead of hydrated Mongoose documents, which is faster and lighter for read-only responses. You lose document methods, getters, virtuals unless enabled, and change tracking.

### 5. What is a common production issue with Mongoose middleware?

Hooks can run on some operations but not others, for example document `save` hooks versus update queries. If critical behavior depends on middleware, tests must cover the exact write method used by the API.

---

# Quick Practice

1. Explain Mongoose Models and Schemas in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
