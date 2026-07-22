# Revision Notes: Sending Emails with Providers

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Build small end-to-end services and inspect every boundary: HTTP, validation, logs, database, tests, and deployment.
* Best practice: Prefer explicit configuration, clear module boundaries, and deterministic package installs.
* Best practice: Use the Node.js documentation, framework docs, and source code when behavior matters.
* Best practice: Write notes as mental models plus production failure modes, not only syntax snippets.
* Avoid: Learning only framework syntax and skipping runtime behavior.
* Avoid: Treating local development success as production readiness.
* Avoid: Keeping secrets, environment-specific paths, or one-off commands inside source code.
* Avoid: Ignoring error paths, shutdown behavior, and operational visibility.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| Transactional email | Email triggered by user or system events. |
| Provider client | SDK or API wrapper for SendGrid, SES, Mailgun, or similar. |
| Template | Reusable email body with variables. |
| Idempotency | Avoiding duplicate sends on retries. |
| Suppression | Provider-side list of bounced or unsubscribed recipients. |

---

# Interview Questions & Answers

### 1. Why should password reset emails usually be sent through a background job instead of directly in the request?

The user-facing request should not depend on provider latency or temporary email failures. I would create the reset token transactionally, enqueue an email job, and return a neutral response. The worker can retry provider errors, track delivery status, and avoid making the API slow or flaky.

### 2. How do you prevent duplicate emails when a job is retried?

Retries must be idempotent. I would store an email intent with a stable idempotency key, include that key in job payloads, and record provider message ids or send status. If the worker receives the same job again, it should detect that the intent is already sent or superseded instead of sending a second email blindly.

### 3. What provider-level issues matter in a production email system?

I look for rate limits, bounce and complaint webhooks, SPF/DKIM/DMARC setup, sandbox versus production domains, template rendering failures, and provider failover behavior. Good email code also separates transactional messages from marketing traffic so reputation problems in one stream do not break the other.

### 4. A candidate says the email API returned 202, so the email was delivered. Is that correct?

No. A 202 or success response usually means the provider accepted the message, not that the recipient received it. Delivery, bounce, deferral, spam placement, and complaints arrive later through provider events. The app should track accepted versus delivered versus bounced as different states.

### 5. What data should not go into email templates or logs?

I would avoid putting secrets, raw reset tokens, full access links in logs, sensitive PII, or internal error details into templates or telemetry. Reset links should use short-lived tokens, and logs should reference message ids and intent ids rather than full message bodies.

---

# Quick Practice

1. Explain Sending Emails with Providers in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
