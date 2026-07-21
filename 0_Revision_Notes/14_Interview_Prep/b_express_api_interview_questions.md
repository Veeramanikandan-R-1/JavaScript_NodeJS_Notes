# Revision Notes: Express API Interview Questions

Use this as the quick final pass before interviews. For full answers, read `14_Interview_Prep/b_express_api_interview_questions.md`.

---

# Must Remember

* Middleware runs in registration order.
* Every middleware path must send a response, call `next()`, or call `next(err)`.
* Keep controllers thin: parse input, call service, map result to HTTP.
* Centralize validation, auth, and error response formatting.
* Express 5 passes rejected promises from async handlers to error middleware automatically. Express 4 often needs wrappers or manual `try/catch`.
* Body size limits protect memory and latency.
* CORS is not authentication.
* `trust proxy` affects client IP, HTTPS detection, secure cookies, logging, and rate limiting.
* Idempotency keys are important for retries around creation/payment/order flows.
* Cursor pagination is usually better than offset pagination for large changing datasets.

---

# Status Codes

| Status | Use |
| ------ | --- |
| 400 | Bad request syntax or malformed input. |
| 401 | Not authenticated. |
| 403 | Authenticated but not allowed. |
| 404 | Resource not found or hidden. |
| 409 | Conflict with current state. |
| 422 | Semantically invalid input, if your API uses this convention. |
| 429 | Too many requests. |
| 500 | Unexpected server error. |

---

# Strong API Structure

```text
request -> request id/logging -> body parser -> auth -> validation
-> controller -> service -> repository -> database -> response
```

Recommended files:

```text
src/app.js
src/server.js
src/modules/users/users.routes.js
src/modules/users/users.controller.js
src/modules/users/users.service.js
src/modules/users/users.repository.js
src/shared/errors.js
src/shared/config.js
src/shared/logger.js
```

---

# Traps

| Trap | Correct answer |
| ---- | -------------- |
| No response and no `next()` | Request hangs. |
| Raw `req.body` update | Mass assignment risk. |
| Generic 500 for validation | Use a client error status and stable error shape. |
| Rate limiting behind proxy without config | Can punish all users or be bypassed. |
| Raw error messages to clients | Can leak internals. |

---

# Quick Practice

1. Explain middleware order.
2. Design a centralized error response.
3. Explain 401 vs 403.
4. Explain idempotency keys.
5. Explain what changes behind a reverse proxy.
