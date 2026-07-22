# Revision Notes: TCP, UDP, and Node Networking

* This topic is a production backend concern, not just a syntax detail.
* A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.
* The practical goal is to build services that are correct, observable, secure, and easy to change.
* Use small examples to learn the API, then connect the API to real request flows and failure modes.
* Best practice: Model events as contracts with names, payloads, permissions, and acknowledgement behavior.
* Best practice: Externalize shared realtime state through Redis or another coordination layer when scaling.
* Best practice: Add heartbeat, reconnection, and idempotency behavior.
* Best practice: Test events with multiple clients and failure scenarios.
* Avoid: Storing room state only in memory and then scaling to multiple instances.
* Avoid: Trusting client-sent events without server-side validation and authorization.
* Avoid: Ignoring disconnect, reconnect, duplicate messages, and acknowledgement timeouts.
* Avoid: Using realtime transport where simple polling or SSE would be enough.

---

# Cheat Sheet

| Concept | Practical meaning |
| ------- | ----------------- |
| TCP | Reliable ordered byte stream used by HTTP and WebSockets. |
| UDP | Connectionless datagrams useful for latency-sensitive protocols. |
| Socket | Endpoint for network communication. |
| Port | Number identifying a service on a host. |
| Backpressure | Networking streams also need flow control. |

---

# Interview Questions & Answers

### 1. How do TCP and UDP differences affect backend design?

TCP gives ordered, reliable byte streams with congestion control, so it suits HTTP, WebSockets, database connections, and most application protocols. UDP is message-oriented and does not guarantee delivery or ordering, so the application must handle loss, duplication, and sequencing if it cares. I would choose UDP only when latency or custom transport behavior is worth that extra complexity.

### 2. What does it mean that TCP is a stream, not a message protocol?

A single `data` event may contain half a message, one message, or multiple messages. The application must implement framing, such as length-prefixing or delimiters, and buffer partial input safely. Treating each chunk as one complete message is a classic networking bug.

### 3. How would you protect a raw TCP server from slow or abusive clients?

I would set socket timeouts, cap buffer sizes, reject oversized frames, limit concurrent connections per source, and apply backpressure when writes return false. I would also log connection lifecycle and parse errors, because raw TCP lacks the guardrails Express gives you for HTTP.

### 4. Why can writing too fast to a socket become a memory problem?

`socket.write()` queues data when the kernel or peer cannot keep up. If the code ignores the boolean return value and keeps writing, memory can grow until the process is unhealthy. The fix is to pause producing data and resume on the `drain` event.

### 5. When would you reach for Node's `net` or `dgram` modules directly?

I would use them for custom protocols, internal agents, telemetry collectors, proxies, or integration with legacy systems. For normal product APIs I would use HTTP or WebSockets, because tooling, observability, security, and operational support are much better.

---

# Quick Practice

1. Explain TCP, UDP, and Node Networking in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
