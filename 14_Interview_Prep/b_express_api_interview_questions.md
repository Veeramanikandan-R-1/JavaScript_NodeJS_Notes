# Express and HTTP API Interview Questions for 3 Years Experience

At 3 years of experience, Express questions are rarely about `app.get` syntax. The real bar is whether you can design reliable request handling, consistent errors, validation, auth, and production behavior behind proxies and load balancers.

---

# Request Lifecycle

### 1. What is Express middleware?

Middleware is a function that runs during the request-response lifecycle. It can inspect or modify `req` and `res`, end the response, or call `next()` to continue. Middleware order matters because Express runs matching middleware in registration order.

Common middleware:

* `express.json()` for JSON body parsing.
* Request logging and request IDs.
* Authentication and authorization.
* Validation and sanitization.
* Rate limiting.
* Error handling.

### 2. What happens if middleware does not call `next()` or send a response?

The request hangs until the client or server times out. In production this wastes sockets, memory, and concurrency. Every path in middleware must either finish the response, call `next()`, or pass an error to `next(err)`.

### 3. Why keep controllers thin?

Thin controllers make APIs easier to test and maintain. The controller should parse input, call a service/use-case function, and map the result to HTTP. Business rules belong in services, data access belongs in repositories or model-specific modules, and cross-cutting behavior belongs in middleware.

```text
route -> validation -> auth -> controller -> service -> repository -> database
```

### 4. How should Express errors be handled?

Use one centralized error middleware at the end of the middleware chain. Convert known domain/application errors into stable HTTP responses, and log unexpected errors with request context.

```js
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const code = err.code || "INTERNAL_ERROR";

  req.log?.error({ err, status, code }, "request failed");

  res.status(status).json({
    error: {
      code,
      message: status >= 500 ? "Something went wrong" : err.message,
    },
  });
});
```

In Express 5, rejected promises from async handlers are passed to error handling automatically. In Express 4, projects often use wrappers or manual `try/catch` with `next(err)`.

---

# HTTP Contract Questions

### 5. Explain 400 vs 401 vs 403 vs 404 vs 409 vs 422.

| Status | Use |
| ------ | --- |
| 400 | Malformed request, invalid JSON, invalid query syntax. |
| 401 | Authentication required or invalid credentials/token. |
| 403 | Authenticated user is not allowed to perform the action. |
| 404 | Resource not found or intentionally hidden. |
| 409 | Conflict with current state, such as duplicate unique value or version conflict. |
| 422 | Valid syntax but semantically invalid input, if your API chooses to distinguish it from 400. |

Pick a consistent convention and document it.

### 6. What is idempotency?

An idempotent operation can be repeated without changing the final result beyond the first successful call. `GET`, `PUT`, and `DELETE` are expected to be idempotent by HTTP semantics. `POST` is often non-idempotent, but APIs can support idempotency keys for payment, order, or job creation flows.

### 7. How do you design pagination?

Offset pagination is simple but can become slow and inconsistent on changing data. Cursor pagination is better for large datasets and feeds because it uses stable ordered fields such as `createdAt` and `_id`.

Good pagination includes:

* Stable sort order.
* Limit maximum page size.
* Index matching filter and sort.
* Next cursor, not total count for every request unless necessary.

### 8. How do you version APIs?

Common strategies are URI versioning (`/v1/users`), header versioning, or backward-compatible evolution. For most teams, URI versioning plus additive changes is easiest. Avoid breaking response shapes without a migration plan.

---

# Validation and Security

### 9. Where should validation happen?

Validate at the boundary before business logic. Schema validation should check types, required fields, formats, length limits, allowed enum values, and unknown fields. Business validation should happen in the service layer where rules and database state are available.

### 10. What is mass assignment?

Mass assignment happens when an API blindly writes user-provided fields into a model. Example: accepting `{ "role": "admin" }` in a profile update route. Fix it by allow-listing writable fields and separating request DTOs from persistence models.

### 11. CORS vs authentication?

CORS controls whether browsers allow frontend JavaScript from another origin to read responses. It does not stop curl, Postman, backend services, or attackers from calling the API. Authentication and authorization must still be enforced server-side.

### 12. How do you protect APIs behind a reverse proxy?

Configure `trust proxy` only for proxies you actually trust, because headers like `X-Forwarded-For` can be spoofed if accepted from arbitrary clients. This affects `req.ip`, secure cookies, HTTPS detection, rate limiting, and logging.

Also use body size limits, request timeouts, rate limits, TLS termination awareness, and security headers.

### 13. Cookie auth vs bearer token auth?

Cookies are convenient for browser apps and can be `HttpOnly`, `Secure`, and `SameSite`, but need CSRF protection depending on the flow. Bearer tokens are common for APIs and mobile clients but must be protected from storage theft and sent over HTTPS only.

For browser-based sessions, a secure `HttpOnly` cookie is often safer than storing long-lived JWTs in localStorage.

---

# Performance and Reliability

### 14. How do you prevent large payload issues?

Set JSON/body limits, validate content type, stream file uploads, reject unsupported formats early, and avoid buffering large files in memory.

```js
app.use(express.json({ limit: "1mb" }));
```

### 15. How do you handle outbound API calls?

Use timeouts, retries only for safe/idempotent operations, exponential backoff with jitter, circuit breakers for repeated failures, and clear fallback behavior. Log dependency latency separately from total request latency.

### 16. How do you make request logging useful?

Use structured logs with request ID, method, path template, status code, duration, user/tenant ID when safe, error code, and dependency timings. Never log passwords, tokens, full authorization headers, or sensitive personal data.

### 17. What should be tested in an Express API?

Test through HTTP for route behavior:

* Happy path response shape.
* Validation failures.
* Auth and authorization failures.
* Not-found and conflict cases.
* Error middleware behavior.
* Database setup/teardown.
* External services mocked at the network/client boundary.

---

# Architecture Questions

### 18. How would you structure a medium Express app?

```text
src/
  app.js              # express app and middleware
  server.js           # listen, shutdown, process signals
  modules/users/
    users.routes.js
    users.controller.js
    users.service.js
    users.repository.js
    users.schema.js
  shared/
    errors.js
    logger.js
    config.js
```

Keep `app` separate from `server` so tests can import the app without opening a port.

### 19. Express vs Fastify vs NestJS?

Express is minimal and widely known. Fastify is performance-focused and schema-oriented. NestJS provides a batteries-included architecture with dependency injection, decorators, modules, guards, pipes, and interceptors.

The best choice depends on team skill, project size, performance needs, and architecture requirements. A 3-year engineer should be able to work in Express and understand why a team might choose Fastify or NestJS.

### 20. How do you handle file uploads safely?

Limit file size and count, validate MIME type and extension but do not trust them blindly, scan if required, store outside the application server when possible, generate safe names, avoid path traversal, and stream to object storage for large files.

---

# Production Traps

| Mistake | Why it hurts |
| ------- | ------------ |
| `app.use(cors())` with no policy | Can expose browser access too broadly. |
| No body limit | Large JSON can exhaust memory or block parsing. |
| Rate limit without correct proxy config | All users may share one IP or attackers may bypass limits. |
| Business logic inside routes | Hard to test, reuse, and reason about. |
| Returning raw errors | Leaks internals and creates unstable API contracts. |
| No request timeout | Slow clients or dependencies can tie up resources. |

---

# Practice Questions

1. Draw the middleware order for auth, validation, logging, route handler, and error handler.
2. How would you avoid duplicate order creation if the client retries?
3. Why should validation reject unknown fields?
4. How do you handle a database unique constraint error in HTTP?
5. What breaks when an Express app moves behind a load balancer?
6. What should a health endpoint check, and what should it not check?
7. How would you design a consistent error response format?
8. Why separate `app.js` and `server.js`?
9. What should happen when the client disconnects during a long request?
10. How would you test authorization for object ownership?
