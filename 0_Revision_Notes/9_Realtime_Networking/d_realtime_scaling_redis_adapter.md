# Revision Notes: Realtime Scaling and Redis Adapter

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
| Adapter | Socket.io component that coordinates rooms across servers. |
| Pub/sub | Messaging pattern where publishers broadcast to subscribers. |
| Sticky session | Load balancer behavior that keeps a client on one backend. |
| Distributed presence | Presence state shared across instances. |
| Fanout | Sending one event to many connected clients. |

---

# Interview Questions & Answers

### 1. Why does Socket.IO need an adapter when you run multiple Node processes?

Without an adapter, each process only knows about sockets connected to itself. If process A emits to a room whose members are connected to process B, those clients will miss the message. The Redis adapter publishes room events across processes so broadcasts reach sockets regardless of which process owns the connection.

### 2. Do you still need sticky sessions with a Redis adapter?

Usually yes for the initial transport behavior, especially when long polling is enabled, because a client's handshake and polling requests must reach the same server. If you force WebSocket-only transport, sticky sessions may be less critical, but I still verify the load balancer behavior rather than assuming.

### 3. What happens to realtime delivery when Redis is slow or unavailable?

Cross-node broadcasts can be delayed or missed, while sockets on the same node may still work. For critical events, Redis pub/sub should not be the only durable record; persist the event and let clients recover by sequence or snapshot. The system should expose adapter errors and reconnect behavior in metrics.

### 4. How do you scale a high-fanout room?

I would measure fanout size, payload size, serialization cost, and per-node send queues. Then I would reduce payloads, shard rooms if the domain allows it, use namespaces carefully, and move durable event history out of Socket.IO. Very large broadcasts often need product-level throttling or aggregation, not just more nodes.

### 5. What metrics prove your realtime cluster is healthy?

I would watch connected sockets per node, room counts, publish latency, adapter errors, reconnect rate, emitted events per second, dropped or timed-out acknowledgements, process memory, and event-loop delay. Uneven connection distribution is also a sign that load balancing or sticky routing is wrong.

---

# Quick Practice

1. Explain Realtime Scaling and Redis Adapter in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
