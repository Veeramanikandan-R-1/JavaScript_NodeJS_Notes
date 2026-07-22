# Revision Notes: Command Line Arguments and CLI Input

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
| argv[0] | Path to the node executable. |
| argv[1] | Path to the script being executed. |
| argv[2+] | User-provided arguments. |
| stdin | Readable stream for piped or typed input. |
| exit code | 0 for success, non-zero for failure. |

---

# Interview Questions & Answers

### 1. A migration script accepts `--tenant`, `--dry-run`, and optional stdin JSON. How would you design the argument handling so it is safe to run in production?

I would use a parser, require explicit tenant selection, validate stdin before doing any work, and make `--dry-run` print the exact planned writes. Risky commands should fail closed: no default tenant, no silent overwrite, clear stderr, and a non-zero exit code on validation errors.

### 2. When do you read from `process.argv` directly, and when do you bring in yargs or commander?

Direct `process.argv` is fine for a tiny one-off command with one or two positional arguments. Once there are flags, defaults, aliases, help text, subcommands, or validation, a real parser gives a more reliable contract and fewer production surprises.

### 3. A CLI works locally but fails in CI because it cannot find a template file. What would you check first?

I would check whether the code confused `process.cwd()` with the script directory. `cwd` reflects where the user launched the command, while script-relative assets should be resolved from `__dirname` or `import.meta.url`.

### 4. How should a backend CLI use stdout and stderr?

Machine-readable output should go to stdout so it can be piped to another command. Progress, warnings, prompts, and errors belong on stderr, otherwise automation that parses stdout becomes fragile.

### 5. What exit codes would you expect from a well-behaved internal automation CLI?

`0` means the requested operation completed successfully. Invalid input, missing config, partial failure, and unexpected exceptions should return non-zero codes, with enough stderr context for CI logs or an on-call engineer to diagnose the failure.

---

# Quick Practice

1. Explain Command Line Arguments and CLI Input in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
