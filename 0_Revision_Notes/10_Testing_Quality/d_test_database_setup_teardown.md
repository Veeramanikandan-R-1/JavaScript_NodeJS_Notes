# Revision Notes: Test Database Setup and Teardown

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Use unit tests for pure logic and integration tests for API behavior.
* Best practice: Reset test data deterministically.
* Best practice: Mock external providers at the boundary, not internal services by default.
* Best practice: Make failures readable with good fixtures and explicit assertions.
* Avoid: Mocking so much that the test no longer proves production behavior.
* Avoid: Sharing test data across tests and creating order dependence.
* Avoid: Testing only happy paths.
* Avoid: Skipping auth, validation, and database edge cases.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| Setup | Creates known test state before tests run. |
| Teardown | Cleans up resources after tests run. |
| Seed data | Known records used by tests. |
| Isolation | Tests should not depend on other tests. |
| Test database | Separate database used only by automated tests. |

---

# Interview Questions & Answers

### 1. What are the tradeoffs between an in-memory database and a real test database?

An in-memory database is fast and simple, but it may not match production behavior for indexes, transactions, query plans, or driver quirks. A real test database is slower but gives higher confidence. For serious backend work, I prefer a real isolated database for integration tests and unit tests for pure logic.

### 2. How do you keep database tests isolated from each other?

Each test should create the data it needs and remove it afterward, or run inside a transaction that rolls back when the database supports it. Unique test data and per-suite schemas/databases also help. Tests should not depend on execution order or shared leftover records.

### 3. Why can `deleteMany({})` in teardown be dangerous or slow?

It can accidentally point at the wrong database if configuration is bad, and it gets expensive as collections grow. I want explicit test database names, environment guards, and indexes that support cleanup strategies. In some systems, dropping the database or using transactions is cleaner.

### 4. How would you test code that relies on unique indexes?

I would run against a database where the real index exists, insert the conflicting record, then assert the service maps the database duplicate-key error to the correct domain or HTTP error. Mocking this path often misses the exact timing and error shape.

### 5. What setup belongs in global test hooks versus individual tests?

Global hooks should start shared infrastructure and establish connections. Individual tests should create domain data relevant to their behavior. Putting too much domain setup globally makes tests coupled and hides why a specific assertion passes.

---

# Quick Practice

1. Explain Test Database Setup and Teardown in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
