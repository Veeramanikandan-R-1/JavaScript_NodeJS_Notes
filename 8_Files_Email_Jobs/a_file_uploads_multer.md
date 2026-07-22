# File Uploads with Multer (Senior Backend Node.js Engineer Perspective)

Before going deeper into frameworks or libraries, understand this topic as part of real backend engineering: accepting multipart uploads safely in Express.

---

# 1. Fundamentals

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.

---

# 2. Core Concepts

| Concept | Practical meaning |
| ------- | ----------------- |
| multipart/form-data | Encoding used for browser file uploads. |
| Multer | Express middleware for parsing multipart uploads. |
| File filter | Rejects invalid file type or extension. |
| Size limit | Protects memory, disk, and downstream processors. |
| Storage engine | Controls memory, disk, or custom upload storage behavior. |

---

# 3. Internal Working

* Node.js runs JavaScript on V8 and exposes server-side APIs through native bindings and libuv.
* A backend request normally flows through networking, routing, validation, business logic, persistence, and response serialization.
* Good backend code is measured by correctness, latency, reliability, security, observability, and maintainability.

---

# 4. Common Mistakes

* Learning only framework syntax and skipping runtime behavior.
* Treating local development success as production readiness.
* Keeping secrets, environment-specific paths, or one-off commands inside source code.
* Ignoring error paths, shutdown behavior, and operational visibility.

---

# 5. Best Practices

* Build small end-to-end services and inspect every boundary: HTTP, validation, logs, database, tests, and deployment.
* Prefer explicit configuration, clear module boundaries, and deterministic package installs.
* Use the Node.js documentation, framework docs, and source code when behavior matters.
* Write notes as mental models plus production failure modes, not only syntax snippets.

---

# 6. Code Example

```js
const upload = multer({
  limits: { fileSize: 1_000_000 },
  fileFilter(req, file, cb) {
    cb(undefined, file.originalname.match(/\.(png|jpg|jpeg)$/i));
  },
});

app.post("/users/me/avatar", auth, upload.single("avatar"), async (req, res) => {
  req.user.avatar = req.file.buffer;
  await req.user.save();
  res.sendStatus(204);
});
```

---

# 7. Real-world Scenarios

* Building a service where file uploads with multer affects correctness or latency.
* Debugging a production issue caused by a weak mental model of file uploads with multer.
* Explaining file uploads with multer in a senior backend interview with tradeoffs and examples.

---

# 8. Senior Deep Dive

## When to Use

* Build small end-to-end services and inspect every boundary: HTTP, validation, logs, database, tests, and deployment.
* Prefer explicit configuration, clear module boundaries, and deterministic package installs.
* Use the Node.js documentation, framework docs, and source code when behavior matters.
* Write notes as mental models plus production failure modes, not only syntax snippets.

## Debug Checklist

* Reproduce with the smallest input and environment that fails.
* Inspect logs, stack traces, request data, resource usage, and dependency behavior.
* What is the production failure mode?
* How do tests prove it?
* How would a teammate maintain it?

## Code Review Checklist

* What is the production failure mode?
* How do tests prove it?
* How would a teammate maintain it?

---

# Revision Notes

* This topic matters because backend bugs affect users, data, security, and operations.
* Learn the runtime mental model before memorizing framework syntax.
* Prefer small examples, tests, and production-style failure checks.
* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| multipart/form-data | Encoding used for browser file uploads. |
| Multer | Express middleware for parsing multipart uploads. |
| File filter | Rejects invalid file type or extension. |
| Size limit | Protects memory, disk, and downstream processors. |
| Storage engine | Controls memory, disk, or custom upload storage behavior. |

---

# Interview Questions with Answers

### 1. A user uploads a 200 MB video through an Express endpoint using Multer. What design concerns do you look for?

I would not let the request sit in memory. I would enforce size limits, authenticate before parsing when possible, stream to disk or object storage, return a clear 413/400 on limit failures, and keep timeout behavior predictable. For large media, I usually prefer direct-to-object-storage uploads with a signed URL and then have the API verify the completed object.

### 2. Why is checking `file.mimetype` alone not enough for upload validation?

`file.mimetype` comes from the client-provided multipart metadata, so it can be faked. I would combine extension allowlists, magic-byte sniffing for supported formats, strict size limits, and downstream scanner or processor validation. The server should treat the uploaded bytes as untrusted until every validation step passes.

### 3. When would you use Multer memory storage versus disk storage?

Memory storage is acceptable for small files that are immediately inspected or uploaded elsewhere, with a strict limit and low concurrency expectation. Disk storage is safer for larger files or processing pipelines, but it needs cleanup, isolated temp directories, and protection against path traversal and disk exhaustion. For production uploads at scale, streaming to object storage is usually the better boundary.

### 4. How do you avoid orphaned files when the database write fails after upload?

I would model upload as a multi-step workflow: upload to a temporary key, validate/process it, write the database record, then promote or mark the object active. If the DB write fails, a cleanup job removes temporary objects. For critical flows, the object record should include state such as `pending`, `active`, and `failed` so retries and cleanup are idempotent.

### 5. What would you want to see in logs and metrics for file uploads?

I would log request id, user id, upload type, file size, validation outcome, storage key, and failure reason without logging sensitive filenames unnecessarily. Metrics should include upload count, rejection count by reason, storage latency, processing latency, file-size distribution, and temp-file cleanup failures.

---

# Hands-on Exercises

## Exercise 1

Build a small example that demonstrates this topic: File Uploads with Multer.

### Solution

Keep it focused, handle one failure path, and write down what happens internally.

## Exercise 2

Turn this topic into a code review checklist: File Uploads with Multer.

### Solution

Include these checks: What is the production failure mode? How do tests prove it? How would a teammate maintain it?

---

# Senior Backend Engineer Takeaway

For senior-level work, File Uploads with Multer is not only an API or syntax detail. You should be able to explain the mental model, choose the right pattern for a product requirement, identify common failure modes, and verify behavior with tests, logs, profiling, and production-aware review.
