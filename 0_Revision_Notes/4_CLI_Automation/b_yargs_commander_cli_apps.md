# Revision Notes: yargs and Commander CLI Apps

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
| Command | Named action such as add, remove, list, or deploy. |
| Option | Flag that modifies behavior. |
| Positional | Required or optional argument based on position. |
| Help output | Self-documenting usage text. |
| Validation | Reject invalid input before doing work. |

---

# Interview Questions & Answers

### 1. You are building an internal `users import` CLI with several subcommands. Why might commander or yargs be a better choice than a hand-rolled parser?

They give you subcommands, required options, defaults, help output, coercion, and validation in one predictable contract. That matters when the CLI becomes part of release, migration, or support workflows used by multiple engineers.

### 2. How do you keep CLI parsing separate from business logic?

The command layer should parse flags, validate shape, and call a service function with typed inputs. The service should not know whether the request came from a CLI, HTTP route, or test; that makes it easier to test and reuse.

### 3. How would you test a yargs or commander CLI without making the tests brittle?

I would test the core handler as a normal function and keep a smaller set of integration tests for parsing, help text, exit codes, stdout, and stderr. Snapshotting full help output is usually too brittle unless the CLI contract really depends on it.

### 4. A command has `--force`, `--dry-run`, and `--yes`. What behavior would you insist on during review?

`--dry-run` must not mutate anything, `--force` should be scoped to a specific safety check, and `--yes` should only skip prompts after inputs are fully validated. Dangerous combinations should either be rejected or documented by tests.

### 5. How do you handle async failures inside CLI command handlers?

Await the handler, catch top-level errors once, print a useful message to stderr, and set a non-zero exit code. Avoid swallowing stack traces in debug mode, but do not dump secrets or huge payloads into CI logs.

---

# Quick Practice

1. Explain yargs and Commander CLI Apps in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
