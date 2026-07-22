# Revision Notes: OAuth Basics for Node APIs

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
| Resource owner | User who owns the protected data. |
| Client | Application requesting access. |
| Authorization server | System that authenticates user and issues tokens. |
| Access token | Token used to call an API. |
| Refresh token | Longer-lived token used to get new access tokens. |

---

# Interview Questions & Answers

### 1. In OAuth, what is the difference between the resource owner, client, authorization server, and resource server?

The resource owner is the user, the client is the app asking for access, the authorization server issues tokens, and the resource server hosts the API being accessed. Mixing up these roles usually leads to confused security decisions.

### 2. Why should a backend web app use authorization code flow with PKCE instead of implicit flow?

Authorization code with PKCE keeps tokens out of the URL fragment and protects the code exchange from interception. Implicit flow is legacy for most modern apps and has weaker token handling properties.

### 3. What should you validate when handling an OAuth callback?

Validate `state` to prevent CSRF, verify the code exchange with the expected redirect URI and PKCE verifier, and validate any ID token issuer, audience, expiry, and nonce when OpenID Connect is involved.

### 4. How do OAuth scopes affect backend authorization?

Scopes describe delegated permissions granted to the client, not every business rule in your app. The backend still needs resource ownership, tenant, account status, and policy checks before allowing actions.

### 5. How would you store and refresh provider access tokens safely?

Store tokens encrypted or in a protected credential store, keep refresh tokens especially restricted, and rotate when the provider supports it. Handle refresh failures by marking the connection unhealthy rather than retrying forever with bad credentials.

---

# Quick Practice

1. Explain OAuth Basics for Node APIs in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
