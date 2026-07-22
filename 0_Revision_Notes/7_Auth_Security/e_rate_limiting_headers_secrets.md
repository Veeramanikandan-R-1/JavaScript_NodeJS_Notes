# Revision Notes: Rate Limiting, Security Headers, and Secrets

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
| Rate limit | Caps request volume by identity or IP over time. |
| Helmet | Express middleware that sets common security headers. |
| Secret rotation | Changing secrets safely without downtime. |
| PII | Personally identifiable information that must be minimized in logs. |
| Threat model | List of likely attackers, assets, and failure modes. |

---

# Interview Questions & Answers

### 1. How would you rate-limit login without locking out an entire office behind one IP?

Use layered keys such as IP, account identifier, and device/session signals, with stricter limits on repeated failures. Keep responses generic and add monitoring so attackers cannot use the limiter to easily deny service to real users.

### 2. What security headers do you expect on a typical Express API?

At minimum I look for headers managed by Helmet, including sensible defaults around content sniffing, frame embedding, referrer policy, and HSTS when using HTTPS. CSP matters more for pages that render browser-executed content.

### 3. How should secrets be handled across local development, CI, and production?

Local can use uncommitted `.env` files, CI should use protected secret variables, and production should use a secret manager or platform secret store. Logs and error reports must redact secret values.

### 4. What makes distributed rate limiting harder than in-memory rate limiting?

Multiple app instances need a shared counter, usually Redis or a gateway, and the limiter must handle latency and store outages. In-memory limits reset on deploys and can be bypassed by spreading requests across instances.

### 5. A secret was accidentally committed to git. What steps do you take?

Rotate the secret immediately, audit usage, remove it from current code, and treat repository history as compromised. History cleanup is useful, but rotation is the security fix because clones and caches may already exist.

---

# Quick Practice

1. Explain Rate Limiting, Security Headers, and Secrets in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
