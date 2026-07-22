# Revision Notes: Capstone: Notes CLI

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Define requirements, data model, API contract, test plan, and deployment plan before coding.
* Best practice: Keep a small backlog of polish tasks: logs, metrics, indexes, rate limits, and docs.
* Best practice: Show both happy path and failure path behavior.
* Best practice: Write a final review note describing tradeoffs and next improvements.
* Avoid: Building many shallow endpoints with no validation, auth, tests, or deployment story.
* Avoid: Skipping README, env examples, API docs, and seed data.
* Avoid: Making demos that cannot be run by another developer.
* Avoid: Ignoring failure states and operational visibility.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| Commands | add, remove, list, read, search. |
| Storage | JSON file with safe read/write helpers. |
| Validation | Reject duplicate titles and empty bodies. |
| Tests | Pure note service tests and CLI smoke tests. |
| Polish | Help output, colored errors, and exit codes. |

---

# Interview Questions & Answers

### 1. Architecture review: how would you structure the Notes CLI so it is not just argument parsing glued to fs.writeFile?

I would split command parsing, note service, validation, and storage adapter. The service should work without the terminal so it can be tested directly, while the CLI layer only maps argv to service calls and exit codes.

### 2. Edge-case review: what can go wrong with a JSON-file note store?

The file can be missing, empty, corrupted, or written by two commands at once. I would handle parse errors clearly, write atomically through a temp file plus rename, reject duplicate normalized titles, and avoid losing data on partial writes.

### 3. Testing review: what tests prove this CLI is more than a demo?

Unit-test add, remove, list, search, duplicate titles, and invalid input against a temp storage path. Add a few CLI smoke tests that execute the binary and assert stdout, stderr, exit codes, and persistence between commands.

### 4. Security review: what risks still exist in a local CLI?

Do not let user-supplied titles become file paths, do not eval filters, and avoid printing raw control characters that can make terminal output misleading. Store data in a predictable app path with reasonable file permissions.

### 5. Deployability review: how would another developer install and run it reliably?

Expose a package bin entry, document Node version and commands, use cross-platform path handling, ship sample commands, and make failures return non-zero exit codes. A reviewer should be able to npm install and run the CLI without editing source files.

---

# Quick Practice

1. Explain Capstone: Notes CLI in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
