# Revision Notes: Setup, Tooling, and Project Workflow

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
| package.json | Project manifest with scripts, dependencies, metadata, and module type. |
| Lockfile | Pins transitive dependency versions so installs are reproducible. |
| Scripts | Create repeatable commands for dev, test, lint, start, build, and migrate. |
| Dev dependency | Tooling needed during development or CI but not at runtime. |
| Audit | Dependency vulnerability report that should be reviewed regularly. |

---

# Interview Questions & Answers

### 1. What do you check in a new Node.js service before you trust it on your machine?

I check the Node version, package manager, lockfile, scripts, environment variable expectations, test command, lint or format command, and whether setup is documented. A reproducible local workflow prevents team-level drift.

### 2. Why do teams pin Node versions with `.nvmrc`, `.node-version`, Volta, or engines?

Node version differences can change module behavior, built-in APIs, OpenSSL behavior, test results, and package compatibility. Pinning the runtime makes local, CI, and production behavior easier to compare.

### 3. What belongs in `npm scripts` for a backend project?

At minimum: start, dev, test, lint or check, format if used, and migration or build commands when relevant. Scripts should hide tool flags so CI and developers run the same workflow.

### 4. A service works locally but fails in CI after install. What do you investigate first?

I compare Node and package manager versions, lockfile usage, environment variables, native dependency builds, postinstall scripts, and OS assumptions. Most CI-only failures come from unreproducible installs or missing configuration.

### 5. How do you keep tooling helpful without slowing down the team?

Automate checks that catch real defects, keep commands fast, run stricter checks in CI when needed, and document the escape hatches. Tooling should reduce review noise, not become the work.

---

# Quick Practice

1. Explain Setup, Tooling, and Project Workflow in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
