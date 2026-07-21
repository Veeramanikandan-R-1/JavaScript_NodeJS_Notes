# Revision Notes: CORS and Browser Security Boundaries

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
| Origin | Scheme, host, and port tuple. |
| Same-origin policy | Browser rule limiting cross-origin reads. |
| CORS | Server response headers that allow selected cross-origin browser reads. |
| Preflight | OPTIONS request used before certain cross-origin requests. |
| Credentials | Cookies or auth headers that need explicit CORS handling. |

---

# Interview Questions & Answers

### 1. How would you explain CORS and Browser Security Boundaries in a real backend project?

CORS and Browser Security Boundaries should be explained through the request or process flow it affects, the runtime behavior behind it, and the production tradeoff. A senior answer connects the API to latency, correctness, failure handling, and maintainability.

### 2. What happens internally when CORS and Browser Security Boundaries is involved?

Authentication proves who the caller is; authorization decides what that caller can do. JWTs are signed, not encrypted by default; anyone can decode the payload but cannot forge it without the signing secret. Browsers enforce CORS, while servers must still enforce authentication, authorization, validation, and rate limits.

### 3. What is a common production bug related to CORS and Browser Security Boundaries?

Putting sensitive data into JWT payloads.

### 4. How would you debug an issue in CORS and Browser Security Boundaries?

Reproduce the failing input, inspect logs and stack traces, isolate the boundary involved, add focused instrumentation, and write a regression test once the cause is known.

### 5. What should a senior engineer check in code review?

What can an attacker control? What secrets or PII could leak? Is authorization checked at the resource level?

---

# Quick Practice

1. Explain CORS and Browser Security Boundaries in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
