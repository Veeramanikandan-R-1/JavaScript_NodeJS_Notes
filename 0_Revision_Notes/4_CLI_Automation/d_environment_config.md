# Revision Notes: Environment Variables and Configuration

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Use yargs, commander, or a small parser for non-trivial CLIs.
* Best practice: Use process.cwd for user intent and import.meta.url or __dirname for script-relative assets.
* Best practice: Make commands idempotent where possible.
* Best practice: Return useful exit codes and log enough context to diagnose failures.
* Avoid: Parsing process.argv manually once the command shape grows.
* Avoid: Writing user-facing output to stdout when it should be stderr, or returning wrong exit codes.
* Avoid: Assuming the current working directory is the same as the script directory.
* Avoid: Overwriting files without dry-run or confirmation behavior for risky tasks.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| Environment variable | Runtime-provided key/value configuration. |
| Secret | Sensitive value such as token, password, or private key. |
| Config validation | Startup check that required config is present and valid. |
| Twelve-factor | Practice of storing config in the environment. |
| Test config | Isolated configuration used by automated tests. |

---

# Interview Questions & Answers

### 1. What configuration belongs in environment variables, and what should stay in code or config files?

Environment variables are best for deployment-specific values such as ports, URLs, feature switches, and secret references. Stable application behavior, schemas, and complex structured settings are usually clearer in versioned config files or code.

### 2. How do you validate environment configuration at service startup?

Parse it once at the boundary, validate required values and types, normalize defaults, and crash early with a clear error if the process cannot run safely. Do not let missing config surface later as a random request failure.

### 3. A service accidentally connects to production MongoDB from a developer laptop. What config safeguards would you add?

Use separate credentials, explicit environment names, protected production secrets, and startup checks that reject dangerous combinations. For destructive tools, require an explicit production confirmation flag and log the target before doing work.

### 4. How do you handle secrets differently from ordinary environment config?

Secrets should come from a secret manager or protected runtime environment, never from committed `.env` files. They should be redacted in logs, rotated cleanly, and scoped to the minimum permissions the service needs.

### 5. Why is reading `process.env` throughout the codebase a maintainability problem?

It spreads parsing, defaults, and validation across unrelated modules. A central config module gives one place to document behavior, test bad config, and avoid inconsistent interpretations of the same environment variable.

---

# Quick Practice

1. Explain Environment Variables and Configuration in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
