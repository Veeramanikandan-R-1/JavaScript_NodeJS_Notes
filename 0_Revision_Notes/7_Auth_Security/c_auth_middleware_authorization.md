# Revision Notes: Auth Middleware and Authorization

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Hash passwords with bcrypt, argon2, or another password-hashing algorithm.
* Best practice: Keep secrets in environment-managed secret stores, never in source.
* Best practice: Use middleware for authentication and policy checks.
* Best practice: Add input validation, rate limiting, security headers, and audit-friendly logs.
* Avoid: Putting sensitive data into JWT payloads.
* Avoid: Storing plaintext passwords or using fast hashes for passwords.
* Avoid: Confusing CORS with backend access control.
* Avoid: Returning different error details that leak user existence or internal state.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| Authentication middleware | Loads the caller from a credential such as a token. |
| Authorization | Policy decision for a specific action. |
| Resource ownership | Ensures users can only access their own data unless policy allows more. |
| Role | Coarse permission grouping such as admin or member. |
| Policy | Reusable rule for access decisions. |

---

# Interview Questions & Answers

### 1. How would you explain Auth Middleware and Authorization in a real backend project?

Auth Middleware and Authorization should be explained through the request or process flow it affects, the runtime behavior behind it, and the production tradeoff. A senior answer connects the API to latency, correctness, failure handling, and maintainability.

### 2. What happens internally when Auth Middleware and Authorization is involved?

Authentication proves who the caller is; authorization decides what that caller can do. JWTs are signed, not encrypted by default; anyone can decode the payload but cannot forge it without the signing secret. Browsers enforce CORS, while servers must still enforce authentication, authorization, validation, and rate limits.

### 3. What is a common production bug related to Auth Middleware and Authorization?

Putting sensitive data into JWT payloads.

### 4. How would you debug an issue in Auth Middleware and Authorization?

Reproduce the failing input, inspect logs and stack traces, isolate the boundary involved, add focused instrumentation, and write a regression test once the cause is known.

### 5. What should a senior engineer check in code review?

What can an attacker control? What secrets or PII could leak? Is authorization checked at the resource level?

---

# Quick Practice

1. Explain Auth Middleware and Authorization in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
