# Revision Notes: File Uploads with Multer

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
| multipart/form-data | Encoding used for browser file uploads. |
| Multer | Express middleware for parsing multipart uploads. |
| File filter | Rejects invalid file type or extension. |
| Size limit | Protects memory, disk, and downstream processors. |
| Storage engine | Controls memory, disk, or custom upload storage behavior. |

---

# Interview Questions & Answers

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

# Quick Practice

1. Explain File Uploads with Multer in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
