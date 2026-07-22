# Revision Notes: npm, package.json, and SemVer

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
| npm | Package manager installed with Node.js. |
| Dependency | Code needed by the app at runtime. |
| Dev dependency | Tooling used for tests, linting, local dev, or builds. |
| SemVer | Versioning convention: major.minor.patch. |
| Caret range | ^1.2.3 allows compatible minor and patch updates below 2.0.0. |

---

# Interview Questions & Answers

### 1. What is the practical difference between `dependencies` and `devDependencies` in a Node.js backend?

`dependencies` are needed to run the service; `devDependencies` support development, testing, linting, or build steps. The distinction matters for production installs, image size, attack surface, and startup failures.

### 2. Why is committing `package-lock.json` important for backend services?

The lockfile records the resolved dependency tree so installs are repeatable across laptops, CI, and production. Without it, a transitive update can change behavior without a code change.

### 3. What risk does the caret range `^1.2.3` introduce?

It allows compatible minor and patch updates under SemVer, but packages can still ship regressions or accidental breaking changes. Lockfiles, review, automated tests, and dependency update discipline reduce that risk.

### 4. A package works locally but crashes in production with `MODULE_NOT_FOUND`. What do you check?

I check whether it is incorrectly listed as a dev dependency, whether production install omitted it, whether the lockfile was used, and whether the runtime path or module type changed. I also inspect the container or deployment artifact.

### 5. How do you evaluate adding a new npm package to a production backend?

I look at maintenance, transitive dependencies, security history, license, API stability, bundle or install cost, and whether native builds are involved. A small helper package can still become a production liability.

---

# Quick Practice

1. Explain npm, package.json, and SemVer in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
