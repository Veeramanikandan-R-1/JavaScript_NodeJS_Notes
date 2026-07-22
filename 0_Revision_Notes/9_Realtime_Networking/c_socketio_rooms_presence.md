# Revision Notes: Socket.io Rooms and Presence

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
| Room | Server-side grouping of sockets. |
| Presence | Knowledge of who is currently connected. |
| Broadcast | Send to other sockets, often excluding sender. |
| Join | Associate socket with room state. |
| Leave | Clean up socket state on disconnect or explicit exit. |

---

# Interview Questions & Answers

### 1. How do Socket.IO rooms differ from application authorization groups?

Rooms are an in-memory routing mechanism for broadcasts; they are not a security model by themselves. The server must authorize whether a socket may join a room and whether it may emit actions for that room. I would treat room membership as a delivery optimization backed by real domain permissions.

### 2. How would you implement presence for a user with multiple browser tabs or devices?

I would track presence by user id plus connection ids, not a single boolean. A user is online while at least one active socket remains. In a multi-node setup, presence should live in Redis or another shared store with TTLs so crashes do not leave users permanently online.

### 3. Why can disconnect events be unreliable for presence?

Processes can crash, networks can drop, and mobile clients can disappear without a clean disconnect. Presence needs heartbeat or TTL-based expiry, not only `disconnect` handlers. The UI should also communicate approximate presence rather than pretending it is a perfect fact.

### 4. How do you broadcast to a room without echoing to the sender?

In Socket.IO, I would use `socket.to(roomId).emit(...)` when the sender should not receive the event, and `io.to(roomId).emit(...)` when everyone including the sender should receive it. The choice matters for optimistic UI, duplicate rendering, and acknowledgement behavior.

### 5. What would you store for debugging room and presence issues?

I would record connection id, user id, node id, joined rooms, auth claims version, heartbeat time, and disconnect reason when available. For privacy, I would avoid logging message bodies unless explicitly sampled and sanitized.

---

# Quick Practice

1. Explain Socket.io Rooms and Presence in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
