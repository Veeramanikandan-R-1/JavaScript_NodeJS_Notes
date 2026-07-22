# Revision Notes: Capstone: Realtime Chat App

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
| Join page | Collects username and room. |
| Messages | Server validates and broadcasts chat events. |
| Location sharing | Optional event with coordinates. |
| Rooms | Track users per room. |
| Scrolling | Client keeps newest messages visible. |

---

# Interview Questions & Answers

### 1. Architecture review: what are the main backend components?

Use HTTP for login and room management, a WebSocket gateway for realtime events, a message service for persistence, and a pub/sub adapter such as Redis when scaling beyond one process. Keep room authorization out of the socket event handler body.

### 2. Edge-case review: what breaks chat apps in interviews?

Reconnects can duplicate messages, users can send before joining, room membership can change mid-connection, messages may arrive out of order across nodes, and offline users need a clear unread or missed-message strategy.

### 3. Testing review: how do you test realtime behavior?

Run multi-client socket integration tests for join, leave, send, unauthorized room access, disconnect, reconnect, and duplicate delivery. Unit-test message validation and use fake timers for heartbeat or idle-timeout behavior.

### 4. Security review: what would you check before exposing sockets publicly?

Authenticate the handshake, authorize every room subscription, validate message size and type, rate-limit sends, restrict allowed origins, and avoid trusting user ids sent in socket payloads.

### 5. Deployability review: what changes when the chat service runs on multiple instances?

You need sticky sessions or a compatible adapter, shared pub/sub for room events, graceful socket draining on deploy, connection and message-rate metrics, and a plan for Redis or broker failure.

---

# Quick Practice

1. Explain Capstone: Realtime Chat App in two minutes.
2. Write a tiny code example from memory.
3. Name one security, performance, or reliability risk.
4. Describe how you would debug a related production issue.
