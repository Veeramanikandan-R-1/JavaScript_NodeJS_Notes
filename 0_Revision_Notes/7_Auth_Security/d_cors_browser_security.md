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

### 1. What problem does CORS solve, and what does it not solve?

CORS controls which browser origins may read responses from your API. It is not authentication, authorization, CSRF protection by itself, or a defense for non-browser clients.

### 2. Why is `Access-Control-Allow-Origin: *` dangerous with credentialed browser requests?

Browsers do not allow wildcard origins with credentials, and trying to work around that usually signals a broken trust boundary. Credentialed APIs should allow explicit origins and include `Vary: Origin` when responses differ by origin.

### 3. How do preflight requests affect API behavior?

For non-simple cross-origin requests, the browser sends an `OPTIONS` request first to check allowed methods and headers. The server must answer that preflight without requiring the actual route handler to run.

### 4. A frontend says CORS is failing, but the API logs show a `500`. What do you investigate?

The browser may display it as a CORS error if the failed response lacks CORS headers. I would fix the server error first and ensure error responses still pass through the CORS middleware.

### 5. How does CORS interact with cookies?

Cookies require `credentials: include` on the client, `Access-Control-Allow-Credentials: true` on the server, and an explicit allowed origin. Cookie attributes such as `SameSite`, `Secure`, and domain still decide whether the browser sends them.

---

# Quick Practice

1. Explain CORS and Browser Security Boundaries in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
