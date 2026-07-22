# Revision Notes: Password Hashing with bcrypt

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
| Hash | One-way derived value used for comparison. |
| Salt | Random value that prevents identical passwords from producing identical hashes. |
| Cost factor | Work factor that makes brute-force attempts slower. |
| compare | Checks plaintext input against a stored hash. |
| Credential stuffing | Attack using leaked passwords from other services. |

---

# Interview Questions & Answers

### 1. Why is bcrypt appropriate for password storage while a fast hash like SHA-256 is not?

Passwords need a slow, salted, adaptive hash so offline guessing is expensive after a database leak. SHA-256 is built for speed, which helps attackers test billions of guesses quickly.

### 2. How do you choose a bcrypt cost factor?

Benchmark it on production-like hardware and pick the highest cost that keeps signup and login latency acceptable under expected load. Revisit the cost over time because hardware changes.

### 3. What should happen during login when the password is correct but the stored hash uses an old cost?

Authenticate the user, then rehash the password with the current cost and store the upgraded hash. This upgrades security gradually without forcing every user through a password reset.

### 4. How do you prevent user enumeration in a login endpoint?

Return the same generic failure message and similar timing for unknown email and wrong password. Logging can keep internal detail, but the client should not learn whether the account exists.

### 5. What is the role of a pepper, and what risk comes with it?

A pepper is an application-level secret added before hashing so the database alone is not enough for offline cracking. If used, it must live in secret management and rotation needs careful planning because losing it can invalidate password verification.

---

# Quick Practice

1. Explain Password Hashing with bcrypt in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
