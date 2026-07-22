# Revision Notes: Image Processing and Serving Files

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
| Sharp | Popular image processing library for resizing and format conversion. |
| Content-Type | Response header that tells clients the media type. |
| Cache-Control | Controls browser and CDN reuse. |
| Object storage | Durable storage such as S3-compatible buckets. |
| Virus scanning | Security step for untrusted uploads in higher-risk apps. |

---

# Interview Questions & Answers

### 1. An avatar upload triggers Sharp image resizing and your API latency spikes. What is happening?

Image decoding and resizing are CPU-heavy and memory-heavy. Even though Sharp uses native code and libuv workers, running it inline still competes with request handling and can exhaust CPU under concurrency. I would move expensive variants to a queue, keep a small synchronous path only if needed, and measure CPU, memory, and event-loop delay during peak uploads.

### 2. What checks do you add before processing user-uploaded images?

I would enforce byte-size and pixel-dimension limits, verify the file signature, reject unsupported formats, strip unsafe metadata, and handle decoder errors as normal bad-input cases. I would also guard against decompression bombs, because a small compressed image can expand into huge memory usage.

### 3. How would you serve private files without exposing your storage bucket?

The API should authorize the user, then either stream the file through the backend for strict control or issue a short-lived signed URL for efficient delivery. For large files, signed URLs plus correct object ACLs are usually better. The important part is that object keys are not treated as authorization.

### 4. What caching headers would you use for generated image variants?

For immutable variants addressed by a content hash, I would use long `Cache-Control` with `immutable` and let the CDN cache aggressively. For user avatars at stable URLs, I would use versioned URLs or ETags so clients do not see stale images forever. The cache strategy should match whether the URL changes when content changes.

### 5. How do you debug corrupted or rotated images in production?

I would keep the original object, record the processor version and transformation parameters, and reproduce with the same input. Rotation issues often come from EXIF orientation handling, while corruption may come from truncated uploads or streaming errors. A good pipeline stores enough metadata to replay the transform without asking the user to upload again.

---

# Quick Practice

1. Explain Image Processing and Serving Files in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
