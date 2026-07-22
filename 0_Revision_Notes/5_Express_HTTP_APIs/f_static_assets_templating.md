# Revision Notes: Static Assets and Templating

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Keep route handlers thin: parse input, call a service, send a response.
* Best practice: Centralize validation, authentication, and error mapping.
* Best practice: Use correct status codes and response shapes.
* Best practice: Test APIs through HTTP using Supertest or an equivalent tool.
* Avoid: Forgetting to return after sending a response and accidentally continuing request logic.
* Avoid: Putting business logic directly inside route handlers.
* Avoid: Letting validation, auth, and error behavior drift across routes.
* Avoid: Using generic 500 responses for client input errors.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| express.static | Middleware that exposes files from a directory. |
| View engine | Template renderer such as Handlebars or Pug. |
| Public directory | Folder whose files are intentionally browser-accessible. |
| 404 page | Fallback response for unknown routes. |
| Cache headers | Headers that control browser and CDN caching. |

---

# Interview Questions & Answers

### 1. When would you serve static assets from Express, and when would you move them to a CDN or object storage?

Express is fine for small internal apps or local development. For public, high-traffic, cacheable assets, a CDN or object storage is better because it reduces app load and handles caching, range requests, and global delivery well.

### 2. What cache headers would you use for fingerprinted static assets?

For hashed filenames, use a long `Cache-Control` lifetime with `immutable` because content changes create a new URL. For non-fingerprinted files like `index.html`, use shorter caching or revalidation.

### 3. What security concern comes with rendering server-side templates?

Unescaped user input can create XSS. Use the template engine's escaping by default, avoid raw HTML insertion unless reviewed, and combine it with sensible CSP headers for defense in depth.

### 4. A user reports that a newly deployed CSS file is not loading. What would you check?

I would check asset path generation, reverse proxy base paths, static middleware order, cache headers, and whether the HTML references a fingerprint that actually exists in the deployed build.

### 5. How do you avoid leaking private files through `express.static`?

Serve only a dedicated public directory, never the project root or upload root. Disable directory listing where relevant and keep secrets, source files, and private uploads outside the static path.

---

# Quick Practice

1. Explain Static Assets and Templating in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
