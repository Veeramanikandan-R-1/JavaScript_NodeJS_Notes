# Revision Notes: child_process Module

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Prefer path helpers, fs/promises, pipeline, AbortController, and explicit error handling.
* Best practice: Use streams for large or continuous data.
* Best practice: Wrap low-level core modules behind small application-specific helpers.
* Best practice: Know the core APIs well enough to debug framework behavior.
* Avoid: Building paths with string concatenation instead of the path module.
* Avoid: Loading large files fully into memory when a stream would be safer.
* Avoid: Forgetting error listeners on EventEmitters and streams.
* Avoid: Mixing CommonJS and ESM without understanding loading semantics.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| exec | Runs a shell command and buffers output. |
| spawn | Starts a process and streams stdio. |
| fork | Starts another Node.js process with IPC support. |
| stdio | stdin, stdout, and stderr streams. |
| IPC | Inter-process communication channel. |

---

# Interview Questions & Answers

### 1. When do you choose `spawn()` over `exec()`?

Use `spawn()` for long-running commands or large output because it streams stdio. Use `exec()` only for simple shell commands with small bounded output and no untrusted input.

### 2. Why is shelling out with user input dangerous?

If user input reaches a shell command, it can become command injection. Prefer `execFile()` or `spawn()` with an argument array, validate allowed values, and avoid `shell: true`.

### 3. What is the `maxBuffer` problem with `exec()`?

`exec()` buffers stdout and stderr in memory and fails when output exceeds the limit. For commands that may produce large output, stream with `spawn()` and enforce your own limits.

### 4. What do you need to clean up when a request starts a child process but the client disconnects?

Cancel or kill the child, close stdio, clear timers, and remove listeners. Otherwise abandoned processes keep consuming CPU, memory, file descriptors, or locks.

### 5. How do you report child process failure cleanly?

Capture exit code, signal, stderr snippets, timeout status, and command identity without leaking secrets. Treat non-zero exits as expected operational failures, not mysterious application crashes.

---

# Quick Practice

1. Explain child_process Module in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
