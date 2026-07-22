# Revision Notes: JWT Authentication Tokens

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
| Header | JWT metadata such as algorithm and token type. |
| Payload | Claims such as subject, role, or expiration. |
| Signature | Proof that the token was signed by a trusted secret or private key. |
| Bearer token | Token sent in Authorization header. |
| Revocation | Invalidating a token before its natural expiration. |

---

# Interview Questions & Answers

### 1. What should you put in a JWT access token, and what should you leave out?

Put only stable, minimal claims needed for authorization decisions, such as subject, issuer, audience, expiry, and maybe role or tenant. Do not put secrets, personal data, or anything you need to revoke instantly without extra server-side checks.

### 2. How do you validate a JWT correctly on an API request?

Verify signature, algorithm, issuer, audience, expiry, and not-before if used. Then map the subject to current server-side state if account status, tenant membership, or token revocation matters.

### 3. Why are short-lived access tokens often paired with refresh tokens?

Short-lived access tokens limit damage if stolen, while refresh tokens let users stay signed in. Refresh tokens need stronger storage, rotation, reuse detection, and a way to revoke sessions.

### 4. How would you handle logout with JWTs?

For access tokens, logout usually deletes the client copy and relies on short expiry. For stronger logout, track token ids or session versions server-side and reject tokens that were revoked after issuance.

### 5. What is a common JWT mistake you look for in code review?

Accepting a decoded token without verifying it, or failing to pin expected algorithms, issuer, and audience. Another common issue is using long-lived tokens as if they were server-side sessions.

---

# Quick Practice

1. Explain JWT Authentication Tokens in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
