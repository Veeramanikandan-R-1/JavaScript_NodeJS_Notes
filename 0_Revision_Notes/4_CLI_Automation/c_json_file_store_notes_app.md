# Revision Notes: JSON File Store Notes App

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
| JSON file store | Small local persistence mechanism for learning or simple tools. |
| Atomic write | Write temp file then rename to reduce corruption risk. |
| Schema | Expected shape of stored data. |
| Migration | Changing data shape as the app evolves. |
| Locking | Protecting writes when multiple processes may edit the same file. |

---

# Interview Questions & Answers

### 1. A notes CLI stores data in a JSON file. What problems appear as soon as two commands run at the same time?

Both commands may read the same old file and then overwrite each other's updates. For a real tool, I would use a lock, atomic write through a temp file plus rename, or move the state into a database if concurrent writes matter.

### 2. How would you prevent a corrupted JSON file from losing all user notes?

Write to a temporary file, fsync where appropriate, then rename atomically so the old file remains valid until the new file is complete. I would also keep backups or recovery behavior for parse failures.

### 3. What validation belongs around a file-backed notes app?

Validate note shape, required fields, maximum sizes, allowed status values, and duplicate identifiers before writing. Treat the JSON file as untrusted input because users can edit it manually or previous versions may have written older shapes.

### 4. When would you stop using a JSON file and switch to SQLite or a server-side database?

I would switch when concurrent writes, querying, migrations, auditing, or multi-device access become real requirements. JSON files are fine for simple local state, but they become expensive once you need database guarantees.

### 5. How should the CLI behave if the data file does not exist or contains invalid JSON?

A missing file can be initialized intentionally, preferably with a clear path. Invalid JSON should fail loudly, keep the broken file untouched, and tell the user how to recover rather than silently replacing it with an empty store.

---

# Quick Practice

1. Explain JSON File Store Notes App in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
