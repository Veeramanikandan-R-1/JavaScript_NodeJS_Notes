const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function ensureDir(dir) {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
}

function writeFile(file, content) {
  const target = path.join(root, file);
  ensureDir(path.dirname(file));
  fs.writeFileSync(target, content.trimEnd() + "\n", "utf8");
}

function list(items) {
  return items.map((item) => `* ${item}`).join("\n");
}

function numbered(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function table(rows) {
  return [
    "| Concept | Practical meaning |",
    "| ------- | ----------------- |",
    ...rows.map(([a, b]) => `| ${a} | ${b} |`),
  ].join("\n");
}

function codeBlock(language, code) {
  return "```" + language + "\n" + code.trim() + "\n```";
}

function area(topic) {
  if (topic.folder.includes("Runtime")) return "runtime";
  if (topic.folder.includes("Core_Modules")) return "core";
  if (topic.folder.includes("Express")) return "express";
  if (topic.folder.includes("Database")) return "database";
  if (topic.folder.includes("Auth")) return "security";
  if (topic.folder.includes("Realtime")) return "realtime";
  if (topic.folder.includes("Testing")) return "testing";
  if (topic.folder.includes("Performance")) return "performance";
  if (topic.folder.includes("Production")) return "production";
  if (topic.folder.includes("Architecture")) return "architecture";
  if (topic.folder.includes("Interview")) return "interview";
  if (topic.folder.includes("Capstone")) return "capstone";
  if (topic.folder.includes("CLI")) return "cli";
  return "foundation";
}

const defaults = {
  foundation: {
    internals: [
      "Node.js runs JavaScript on V8 and exposes server-side APIs through native bindings and libuv.",
      "A backend request normally flows through networking, routing, validation, business logic, persistence, and response serialization.",
      "Good backend code is measured by correctness, latency, reliability, security, observability, and maintainability.",
    ],
    mistakes: [
      "Learning only framework syntax and skipping runtime behavior.",
      "Treating local development success as production readiness.",
      "Keeping secrets, environment-specific paths, or one-off commands inside source code.",
      "Ignoring error paths, shutdown behavior, and operational visibility.",
    ],
    practices: [
      "Build small end-to-end services and inspect every boundary: HTTP, validation, logs, database, tests, and deployment.",
      "Prefer explicit configuration, clear module boundaries, and deterministic package installs.",
      "Use the Node.js documentation, framework docs, and source code when behavior matters.",
      "Write notes as mental models plus production failure modes, not only syntax snippets.",
    ],
  },
  runtime: {
    internals: [
      "JavaScript executes on the main thread; libuv and the operating system handle asynchronous I/O behind the scenes.",
      "The event loop advances through phases, while microtasks and process.nextTick run at special checkpoints.",
      "CPU-heavy JavaScript blocks the event loop unless it is moved to worker threads, separate processes, or external systems.",
    ],
    mistakes: [
      "Saying Node.js is multithreaded without separating JavaScript execution, libuv thread pool work, worker threads, and cluster workers.",
      "Using synchronous filesystem, crypto, compression, or JSON-heavy work on hot request paths.",
      "Assuming promises make CPU work non-blocking.",
      "Using global error handlers as normal control flow instead of last-resort safety nets.",
    ],
    practices: [
      "Keep hot request handlers non-blocking and short.",
      "Measure event loop delay and slow operations before optimizing.",
      "Understand which work uses the libuv thread pool and which work uses the OS directly.",
      "Use graceful shutdown so in-flight requests and database connections close predictably.",
    ],
  },
  core: {
    internals: [
      "Core modules are part of Node.js and do not require npm installation.",
      "Many core APIs expose both callback and promise variants; modern application code usually prefers promise APIs.",
      "Streams, HTTP requests, process I/O, and many filesystem objects are event-driven abstractions.",
    ],
    mistakes: [
      "Building paths with string concatenation instead of the path module.",
      "Loading large files fully into memory when a stream would be safer.",
      "Forgetting error listeners on EventEmitters and streams.",
      "Mixing CommonJS and ESM without understanding loading semantics.",
    ],
    practices: [
      "Prefer path helpers, fs/promises, pipeline, AbortController, and explicit error handling.",
      "Use streams for large or continuous data.",
      "Wrap low-level core modules behind small application-specific helpers.",
      "Know the core APIs well enough to debug framework behavior.",
    ],
  },
  cli: {
    internals: [
      "A CLI is a Node.js process with arguments, stdin, stdout, stderr, exit codes, and environment variables.",
      "Long-running CLI tools need cancellation, progress output, and careful filesystem safety.",
      "Many automation scripts become production dependencies, so they deserve tests and predictable behavior.",
    ],
    mistakes: [
      "Parsing process.argv manually once the command shape grows.",
      "Writing user-facing output to stdout when it should be stderr, or returning wrong exit codes.",
      "Assuming the current working directory is the same as the script directory.",
      "Overwriting files without dry-run or confirmation behavior for risky tasks.",
    ],
    practices: [
      "Use yargs, commander, or a small parser for non-trivial CLIs.",
      "Use process.cwd for user intent and import.meta.url or __dirname for script-relative assets.",
      "Make commands idempotent where possible.",
      "Return useful exit codes and log enough context to diagnose failures.",
    ],
  },
  express: {
    internals: [
      "Express is a routing and middleware layer on top of Node's HTTP server.",
      "Middleware runs in registration order and must either end the response or call next.",
      "Requests and responses are streams, even when Express hides most stream details.",
    ],
    mistakes: [
      "Forgetting to return after sending a response and accidentally continuing request logic.",
      "Putting business logic directly inside route handlers.",
      "Letting validation, auth, and error behavior drift across routes.",
      "Using generic 500 responses for client input errors.",
    ],
    practices: [
      "Keep route handlers thin: parse input, call a service, send a response.",
      "Centralize validation, authentication, and error mapping.",
      "Use correct status codes and response shapes.",
      "Test APIs through HTTP using Supertest or an equivalent tool.",
    ],
  },
  database: {
    internals: [
      "A Node API talks to databases through drivers or ORMs/ODMs that manage network calls and serialization.",
      "MongoDB stores documents; Mongoose adds schemas, validation, middleware, and model methods.",
      "Database performance depends heavily on indexes, query shape, connection pooling, and result size.",
    ],
    mistakes: [
      "Trusting request bodies and storing them directly.",
      "Fetching unbounded result sets.",
      "Adding indexes only after production data grows.",
      "Treating Mongoose documents, plain objects, and JSON responses as the same thing.",
    ],
    practices: [
      "Validate at the API boundary and enforce invariants at the database layer.",
      "Design indexes from query patterns.",
      "Use pagination, projection, and lean reads where appropriate.",
      "Keep database access behind repository or service boundaries in larger apps.",
    ],
  },
  security: {
    internals: [
      "Authentication proves who the caller is; authorization decides what that caller can do.",
      "JWTs are signed, not encrypted by default; anyone can decode the payload but cannot forge it without the signing secret.",
      "Browsers enforce CORS, while servers must still enforce authentication, authorization, validation, and rate limits.",
    ],
    mistakes: [
      "Putting sensitive data into JWT payloads.",
      "Storing plaintext passwords or using fast hashes for passwords.",
      "Confusing CORS with backend access control.",
      "Returning different error details that leak user existence or internal state.",
    ],
    practices: [
      "Hash passwords with bcrypt, argon2, or another password-hashing algorithm.",
      "Keep secrets in environment-managed secret stores, never in source.",
      "Use middleware for authentication and policy checks.",
      "Add input validation, rate limiting, security headers, and audit-friendly logs.",
    ],
  },
  realtime: {
    internals: [
      "Realtime systems keep long-lived connections and push events instead of relying only on request-response polling.",
      "WebSockets provide bidirectional communication; Socket.io adds reconnection, fallbacks, rooms, and acknowledgements.",
      "Presence and room state must be carefully owned when the app runs across multiple processes.",
    ],
    mistakes: [
      "Storing room state only in memory and then scaling to multiple instances.",
      "Trusting client-sent events without server-side validation and authorization.",
      "Ignoring disconnect, reconnect, duplicate messages, and acknowledgement timeouts.",
      "Using realtime transport where simple polling or SSE would be enough.",
    ],
    practices: [
      "Model events as contracts with names, payloads, permissions, and acknowledgement behavior.",
      "Externalize shared realtime state through Redis or another coordination layer when scaling.",
      "Add heartbeat, reconnection, and idempotency behavior.",
      "Test events with multiple clients and failure scenarios.",
    ],
  },
  testing: {
    internals: [
      "A good backend test suite checks pure functions, services, HTTP behavior, database integration, and critical production flows.",
      "Jest runs test files in isolated workers; async tests must return or await promises.",
      "Supertest drives Express apps without requiring a real network port.",
    ],
    mistakes: [
      "Mocking so much that the test no longer proves production behavior.",
      "Sharing test data across tests and creating order dependence.",
      "Testing only happy paths.",
      "Skipping auth, validation, and database edge cases.",
    ],
    practices: [
      "Use unit tests for pure logic and integration tests for API behavior.",
      "Reset test data deterministically.",
      "Mock external providers at the boundary, not internal services by default.",
      "Make failures readable with good fixtures and explicit assertions.",
    ],
  },
  performance: {
    internals: [
      "Node performance is usually about event loop health, I/O latency, payload size, database queries, and CPU hotspots.",
      "The libuv thread pool handles selected blocking native operations; cluster and PM2 scale across CPU cores with multiple processes.",
      "Worker threads parallelize CPU-heavy JavaScript inside a process.",
    ],
    mistakes: [
      "Adding cluster workers before fixing slow queries or blocking JavaScript.",
      "Keeping state in memory and then expecting multi-process scaling to work.",
      "Increasing UV_THREADPOOL_SIZE without understanding the actual bottleneck.",
      "Caching data without invalidation and freshness rules.",
    ],
    practices: [
      "Measure p50, p95, p99 latency, event loop lag, CPU, memory, and database timings.",
      "Use streaming, pagination, compression, caching, and indexes deliberately.",
      "Scale stateless processes horizontally.",
      "Use worker threads only for clear CPU-bound jobs.",
    ],
  },
  production: {
    internals: [
      "Production services run under process managers, containers, orchestrators, load balancers, and monitoring systems.",
      "Config, secrets, logging, metrics, health checks, deployments, and rollback plans are part of the application.",
      "Graceful shutdown coordinates HTTP servers, queues, timers, and database connections during deploys or crashes.",
    ],
    mistakes: [
      "Hardcoding dev config into production code.",
      "Deploying without health checks and rollback paths.",
      "Logging sensitive data.",
      "Treating Docker as a packaging trick instead of a runtime contract.",
    ],
    practices: [
      "Make services stateless where possible and externalize durable state.",
      "Expose health and readiness endpoints.",
      "Use structured logs, metrics, traces, and alerting.",
      "Practice deployments and failure recovery before production incidents.",
    ],
  },
  architecture: {
    internals: [
      "Architecture is the set of boundaries that lets a backend change safely as requirements grow.",
      "A request usually crosses transport, application, domain, persistence, and integration layers.",
      "The right abstraction is the one that protects business rules from framework and infrastructure churn.",
    ],
    mistakes: [
      "Creating too many layers before the domain needs them.",
      "Letting controllers own business rules and database details.",
      "Using microservices to solve code organization problems.",
      "Building APIs without versioning, idempotency, and backward compatibility thinking.",
    ],
    practices: [
      "Start simple, then introduce boundaries where change pressure appears.",
      "Keep controllers, services, repositories, and external clients distinct in larger services.",
      "Document API contracts and failure behavior.",
      "Review architecture through real user flows and operational failure modes.",
    ],
  },
  interview: {
    internals: [
      "Senior interviews test mental models, tradeoffs, debugging clarity, and production judgment.",
      "The best answers connect syntax to runtime behavior and real incidents.",
      "System design answers should state assumptions, constraints, data model, APIs, scaling path, and failure modes.",
    ],
    mistakes: [
      "Giving definitions without examples.",
      "Saying Node is single-threaded without explaining libuv, worker threads, and clustering.",
      "Designing for massive scale before solving correctness and data modeling.",
      "Ignoring security, observability, and deployment in backend designs.",
    ],
    practices: [
      "Answer with: definition, internals, tradeoff, production example, and debugging approach.",
      "Draw request flow and data ownership before picking technologies.",
      "Mention limits and how you would measure them.",
      "Practice explaining failures you have seen and how you would prevent them.",
    ],
  },
  capstone: {
    internals: [
      "A capstone should prove you can build, test, secure, deploy, and operate a backend feature set.",
      "Project quality shows in boundaries, edge cases, tests, documentation, and operational behavior.",
      "The best backend projects are small enough to finish and deep enough to expose real tradeoffs.",
    ],
    mistakes: [
      "Building many shallow endpoints with no validation, auth, tests, or deployment story.",
      "Skipping README, env examples, API docs, and seed data.",
      "Making demos that cannot be run by another developer.",
      "Ignoring failure states and operational visibility.",
    ],
    practices: [
      "Define requirements, data model, API contract, test plan, and deployment plan before coding.",
      "Keep a small backlog of polish tasks: logs, metrics, indexes, rate limits, and docs.",
      "Show both happy path and failure path behavior.",
      "Write a final review note describing tradeoffs and next improvements.",
    ],
  },
};

function withDefaults(topic) {
  const d = defaults[area(topic)];
  return {
    ...topic,
    internals: [...d.internals, ...(topic.internals || [])],
    mistakes: [...d.mistakes, ...(topic.mistakes || [])],
    practices: [...d.practices, ...(topic.practices || [])],
  };
}

function topic(folder, file, title, focus, concepts, example, options = {}) {
  return withDefaults({
    folder,
    file,
    title,
    focus,
    concepts,
    example,
    fundamentals: options.fundamentals || [
      "This topic is a production backend concern, not just a syntax detail.",
      `A senior Node.js engineer should understand the runtime behavior, the API contract, and the operational risks.`,
      `The practical goal is to build services that are correct, observable, secure, and easy to change.`,
      `Use small examples to learn the API, then connect the API to real request flows and failure modes.`,
    ],
    scenarios: options.scenarios || [
      `Building a service where ${title.toLowerCase()} affects correctness or latency.`,
      `Debugging a production issue caused by a weak mental model of ${title.toLowerCase()}.`,
      `Explaining ${title.toLowerCase()} in a senior backend interview with tradeoffs and examples.`,
    ],
    image: options.image,
    senior: options.senior,
    interview: options.interview,
    exercises: options.exercises,
    sourceNote: options.sourceNote,
  });
}

const diagrams = {
  "assets/diagrams/node_runtime_architecture.svg": `
<svg xmlns="http://www.w3.org/2000/svg" width="920" height="420" viewBox="0 0 920 420">
  <rect width="920" height="420" fill="#f8fafc"/>
  <text x="36" y="44" font-family="Arial" font-size="26" font-weight="700" fill="#0f172a">Node.js Runtime Architecture</text>
  <rect x="40" y="90" width="220" height="90" rx="10" fill="#dbeafe" stroke="#2563eb"/>
  <text x="70" y="125" font-family="Arial" font-size="18" font-weight="700" fill="#1e3a8a">JavaScript Code</text>
  <text x="70" y="152" font-family="Arial" font-size="14" fill="#1e3a8a">Your app, modules, callbacks</text>
  <rect x="350" y="70" width="220" height="120" rx="10" fill="#dcfce7" stroke="#16a34a"/>
  <text x="405" y="112" font-family="Arial" font-size="18" font-weight="700" fill="#14532d">V8 Engine</text>
  <text x="390" y="140" font-family="Arial" font-size="14" fill="#14532d">Parses and runs JavaScript</text>
  <rect x="650" y="90" width="220" height="90" rx="10" fill="#fef3c7" stroke="#d97706"/>
  <text x="705" y="125" font-family="Arial" font-size="18" font-weight="700" fill="#78350f">Node APIs</text>
  <text x="687" y="152" font-family="Arial" font-size="14" fill="#78350f">fs, net, http, crypto, timers</text>
  <rect x="130" y="270" width="260" height="90" rx="10" fill="#ede9fe" stroke="#7c3aed"/>
  <text x="225" y="305" font-family="Arial" font-size="18" font-weight="700" fill="#4c1d95">libuv</text>
  <text x="168" y="332" font-family="Arial" font-size="14" fill="#4c1d95">Event loop and thread pool</text>
  <rect x="530" y="270" width="260" height="90" rx="10" fill="#fee2e2" stroke="#dc2626"/>
  <text x="607" y="305" font-family="Arial" font-size="18" font-weight="700" fill="#7f1d1d">Operating System</text>
  <text x="570" y="332" font-family="Arial" font-size="14" fill="#7f1d1d">Sockets, files, DNS, processes</text>
  <path d="M260 135 H350" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M570 135 H650" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M760 180 C760 245 650 245 650 270" fill="none" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M460 190 C460 240 300 230 260 270" fill="none" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M390 315 H530" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#334155"/></marker></defs>
</svg>`,
  "assets/diagrams/event_loop_phases.svg": `
<svg xmlns="http://www.w3.org/2000/svg" width="920" height="420" viewBox="0 0 920 420">
  <rect width="920" height="420" fill="#f8fafc"/>
  <text x="36" y="44" font-family="Arial" font-size="26" font-weight="700" fill="#0f172a">Node.js Event Loop Phases</text>
  <g font-family="Arial" font-size="15" fill="#0f172a">
    <rect x="60" y="105" width="150" height="70" rx="10" fill="#dbeafe" stroke="#2563eb"/><text x="108" y="146">Timers</text>
    <rect x="250" y="105" width="150" height="70" rx="10" fill="#dcfce7" stroke="#16a34a"/><text x="276" y="146">Pending callbacks</text>
    <rect x="440" y="105" width="150" height="70" rx="10" fill="#fef3c7" stroke="#d97706"/><text x="500" y="146">Poll</text>
    <rect x="630" y="105" width="150" height="70" rx="10" fill="#ede9fe" stroke="#7c3aed"/><text x="684" y="146">Check</text>
    <rect x="345" y="240" width="230" height="70" rx="10" fill="#fee2e2" stroke="#dc2626"/><text x="405" y="282">Close callbacks</text>
    <text x="61" y="356" font-size="16" fill="#334155">Microtasks run between turns. process.nextTick runs before promise microtasks in Node.js.</text>
  </g>
  <path d="M210 140 H250" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M400 140 H440" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M590 140 H630" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M705 175 C705 230 575 220 575 250" fill="none" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M345 275 C200 275 135 220 135 175" fill="none" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#334155"/></marker></defs>
</svg>`,
  "assets/diagrams/stream_backpressure.svg": `
<svg xmlns="http://www.w3.org/2000/svg" width="920" height="360" viewBox="0 0 920 360">
  <rect width="920" height="360" fill="#f8fafc"/>
  <text x="36" y="44" font-family="Arial" font-size="26" font-weight="700" fill="#0f172a">Streams and Backpressure</text>
  <rect x="70" y="110" width="190" height="85" rx="10" fill="#dbeafe" stroke="#2563eb"/>
  <text x="118" y="145" font-family="Arial" font-size="18" font-weight="700" fill="#1e3a8a">Readable</text>
  <text x="105" y="172" font-family="Arial" font-size="14" fill="#1e3a8a">file, request, socket</text>
  <rect x="365" y="110" width="190" height="85" rx="10" fill="#dcfce7" stroke="#16a34a"/>
  <text x="413" y="145" font-family="Arial" font-size="18" font-weight="700" fill="#14532d">Transform</text>
  <text x="402" y="172" font-family="Arial" font-size="14" fill="#14532d">compress, parse, hash</text>
  <rect x="660" y="110" width="190" height="85" rx="10" fill="#fef3c7" stroke="#d97706"/>
  <text x="708" y="145" font-family="Arial" font-size="18" font-weight="700" fill="#78350f">Writable</text>
  <text x="706" y="172" font-family="Arial" font-size="14" fill="#78350f">file, response, socket</text>
  <path d="M260 152 H365" stroke="#334155" stroke-width="4" marker-end="url(#arrow)"/>
  <path d="M555 152 H660" stroke="#334155" stroke-width="4" marker-end="url(#arrow)"/>
  <path d="M735 205 C735 285 180 285 180 205" fill="none" stroke="#dc2626" stroke-width="4" marker-end="url(#arrow)"/>
  <text x="270" y="260" font-family="Arial" font-size="16" fill="#7f1d1d">If the writable side is slow, backpressure tells the readable side to slow down.</text>
  <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#334155"/></marker></defs>
</svg>`,
  "assets/diagrams/http_request_lifecycle.svg": `
<svg xmlns="http://www.w3.org/2000/svg" width="920" height="390" viewBox="0 0 920 390">
  <rect width="920" height="390" fill="#f8fafc"/>
  <text x="36" y="44" font-family="Arial" font-size="26" font-weight="700" fill="#0f172a">Express Request Lifecycle</text>
  <g font-family="Arial" font-size="15" fill="#0f172a">
    <rect x="40" y="105" width="130" height="70" rx="9" fill="#dbeafe" stroke="#2563eb"/><text x="75" y="146">Client</text>
    <rect x="220" y="105" width="130" height="70" rx="9" fill="#dcfce7" stroke="#16a34a"/><text x="250" y="146">Middleware</text>
    <rect x="400" y="105" width="130" height="70" rx="9" fill="#fef3c7" stroke="#d97706"/><text x="430" y="146">Route</text>
    <rect x="580" y="105" width="130" height="70" rx="9" fill="#ede9fe" stroke="#7c3aed"/><text x="613" y="146">Service</text>
    <rect x="760" y="105" width="130" height="70" rx="9" fill="#fee2e2" stroke="#dc2626"/><text x="786" y="146">Database</text>
    <rect x="305" y="255" width="310" height="65" rx="9" fill="#e2e8f0" stroke="#475569"/><text x="360" y="294">Error middleware maps failures</text>
  </g>
  <path d="M170 140 H220" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M350 140 H400" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M530 140 H580" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M710 140 H760" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M825 175 C825 225 465 225 465 255" fill="none" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M305 288 C180 288 105 230 105 175" fill="none" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#334155"/></marker></defs>
</svg>`,
  "assets/diagrams/jwt_auth_flow.svg": `
<svg xmlns="http://www.w3.org/2000/svg" width="920" height="390" viewBox="0 0 920 390">
  <rect width="920" height="390" fill="#f8fafc"/>
  <text x="36" y="44" font-family="Arial" font-size="26" font-weight="700" fill="#0f172a">JWT Authentication Flow</text>
  <g font-family="Arial" font-size="15" fill="#0f172a">
    <rect x="60" y="105" width="170" height="70" rx="9" fill="#dbeafe" stroke="#2563eb"/><text x="96" y="146">Login request</text>
    <rect x="310" y="105" width="170" height="70" rx="9" fill="#dcfce7" stroke="#16a34a"/><text x="334" y="146">Verify password</text>
    <rect x="560" y="105" width="170" height="70" rx="9" fill="#fef3c7" stroke="#d97706"/><text x="595" y="146">Sign token</text>
    <rect x="310" y="245" width="170" height="70" rx="9" fill="#ede9fe" stroke="#7c3aed"/><text x="350" y="286">Auth header</text>
    <rect x="560" y="245" width="220" height="70" rx="9" fill="#fee2e2" stroke="#dc2626"/><text x="596" y="286">Verify signature + claims</text>
  </g>
  <path d="M230 140 H310" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M480 140 H560" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M645 175 C645 215 395 205 395 245" fill="none" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <path d="M480 280 H560" stroke="#334155" stroke-width="3" marker-end="url(#arrow)"/>
  <text x="74" y="348" font-family="Arial" font-size="16" fill="#334155">JWT payload is readable. Keep secrets out of claims and protect transport with HTTPS.</text>
  <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#334155"/></marker></defs>
</svg>`,
  "assets/diagrams/scaling_models.svg": `
<svg xmlns="http://www.w3.org/2000/svg" width="920" height="410" viewBox="0 0 920 410">
  <rect width="920" height="410" fill="#f8fafc"/>
  <text x="36" y="44" font-family="Arial" font-size="26" font-weight="700" fill="#0f172a">Node.js Scaling Models</text>
  <rect x="55" y="100" width="230" height="210" rx="10" fill="#dbeafe" stroke="#2563eb"/>
  <text x="100" y="135" font-family="Arial" font-size="19" font-weight="700" fill="#1e3a8a">Thread Pool</text>
  <text x="85" y="172" font-family="Arial" font-size="14" fill="#1e3a8a">Native background workers</text>
  <text x="85" y="200" font-family="Arial" font-size="14" fill="#1e3a8a">fs, crypto, dns.lookup</text>
  <text x="85" y="228" font-family="Arial" font-size="14" fill="#1e3a8a">Mostly invisible to app code</text>
  <rect x="345" y="100" width="230" height="210" rx="10" fill="#dcfce7" stroke="#16a34a"/>
  <text x="415" y="135" font-family="Arial" font-size="19" font-weight="700" fill="#14532d">Cluster</text>
  <text x="375" y="172" font-family="Arial" font-size="14" fill="#14532d">Multiple Node processes</text>
  <text x="375" y="200" font-family="Arial" font-size="14" fill="#14532d">Scale HTTP across CPU cores</text>
  <text x="375" y="228" font-family="Arial" font-size="14" fill="#14532d">No shared memory by default</text>
  <rect x="635" y="100" width="230" height="210" rx="10" fill="#fef3c7" stroke="#d97706"/>
  <text x="690" y="135" font-family="Arial" font-size="19" font-weight="700" fill="#78350f">Worker Threads</text>
  <text x="665" y="172" font-family="Arial" font-size="14" fill="#78350f">Parallel JavaScript workers</text>
  <text x="665" y="200" font-family="Arial" font-size="14" fill="#78350f">CPU-heavy calculations</text>
  <text x="665" y="228" font-family="Arial" font-size="14" fill="#78350f">Message passing, optional shared memory</text>
</svg>`,
};

function writeDiagrams() {
  for (const [file, svg] of Object.entries(diagrams)) {
    writeFile(file, svg);
  }
}

const topics = [
  topic("1_Foundation", "a_backend_nodejs_roadmap.md", "Backend Node.js Roadmap", "how Node.js, HTTP, databases, security, testing, deployment, and production operations fit together", [
    ["Runtime", "Node.js runs JavaScript outside the browser and exposes server-side APIs."],
    ["HTTP APIs", "Express or similar frameworks receive requests, run middleware, call services, and send responses."],
    ["Data", "Most backend features depend on durable state, indexes, migrations, validation, and consistency rules."],
    ["Security", "Authentication, authorization, secrets, CORS, input validation, and rate limits protect the system."],
    ["Operations", "Logs, metrics, health checks, process management, and deployment workflows keep services alive."],
  ], codeBlock("text", `
Study path:

Node runtime and event loop
Core modules: path, fs, events, streams, http
CLI tools and automation
Express APIs and middleware
MongoDB/Mongoose and data modeling
Authentication, authorization, and security
Testing, debugging, and observability
Performance, scaling, Docker, and deployment
System design and capstone projects
`), { image: "../assets/diagrams/node_runtime_architecture.svg" }),

  topic("1_Foundation", "b_setup_tooling_workflow.md", "Setup, Tooling, and Project Workflow", "setting up repeatable Node.js projects with package scripts, lockfiles, dev tools, and repository hygiene", [
    ["package.json", "Project manifest with scripts, dependencies, metadata, and module type."],
    ["Lockfile", "Pins transitive dependency versions so installs are reproducible."],
    ["Scripts", "Create repeatable commands for dev, test, lint, start, build, and migrate."],
    ["Dev dependency", "Tooling needed during development or CI but not at runtime."],
    ["Audit", "Dependency vulnerability report that should be reviewed regularly."],
  ], codeBlock("json", `
{
  "type": "module",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "test": "jest --runInBand",
    "lint": "eslint ."
  },
  "dependencies": {
    "express": "^5.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
`)),

  topic("1_Foundation", "c_node_vs_browser_runtime.md", "Node.js Runtime vs Browser Runtime", "understanding what JavaScript gets from V8 versus what each host runtime adds", [
    ["V8", "The JavaScript engine shared by Chrome and Node.js."],
    ["Browser host APIs", "DOM, document, window, fetch, storage, rendering, and user events."],
    ["Node host APIs", "fs, net, http, process, Buffer, streams, crypto, and worker threads."],
    ["globalThis", "Standard global reference available across modern JavaScript runtimes."],
    ["Runtime fit", "Node.js is excellent for I/O-heavy servers, CLIs, automation, and network services."],
  ], codeBlock("js", `
console.log(globalThis === global);
console.log(typeof window);   // undefined in Node.js
console.log(process.version);
console.log(process.argv);
`)),

  topic("1_Foundation", "d_npm_package_json_semver.md", "npm, package.json, and SemVer", "using npm dependencies safely in backend projects", [
    ["npm", "Package manager installed with Node.js."],
    ["Dependency", "Code needed by the app at runtime."],
    ["Dev dependency", "Tooling used for tests, linting, local dev, or builds."],
    ["SemVer", "Versioning convention: major.minor.patch."],
    ["Caret range", "^1.2.3 allows compatible minor and patch updates below 2.0.0."],
  ], codeBlock("bash", `
npm init -y
npm install express
npm install --save-dev jest nodemon
npm audit
npm audit fix
`)),

  topic("1_Foundation", "e_debugging_nodejs.md", "Debugging Node.js Applications", "debugging server-side JavaScript through logs, breakpoints, stack traces, inspectors, and reproducible inputs", [
    ["Stack trace", "Shows the call path that produced an error."],
    ["Inspector", "Node's debugging protocol used by Chrome DevTools and VS Code."],
    ["Breakpoint", "Pauses execution at a selected line or condition."],
    ["Reproduction", "Smallest input and environment that triggers the failure."],
    ["Observability", "Logs, metrics, and traces that make production failures diagnosable."],
  ], codeBlock("bash", `
node --inspect-brk src/server.js
node --trace-warnings src/server.js
DEBUG=app:* npm run dev
`)),

  topic("2_Node_Runtime_Internals", "a_v8_libuv_node_architecture.md", "V8, libuv, and Node Architecture", "the runtime architecture that explains why Node.js can handle many concurrent I/O operations", [
    ["V8", "Executes JavaScript and manages the JS heap."],
    ["libuv", "Provides the event loop, thread pool, filesystem, TCP, timers, and platform abstraction."],
    ["Bindings", "Native bridge between JavaScript APIs and C/C++ implementation."],
    ["Event loop", "Coordinates callbacks when asynchronous work becomes ready."],
    ["Thread pool", "Background native workers for selected blocking operations."],
  ], codeBlock("text", `
JavaScript code
  -> Node API such as fs.readFile
  -> native binding
  -> libuv thread pool or OS async facility
  -> callback/promise continuation returns to event loop
`), { image: "../assets/diagrams/node_runtime_architecture.svg" }),

  topic("2_Node_Runtime_Internals", "b_event_loop_phases_microtasks.md", "Event Loop Phases and Microtasks", "understanding timers, poll, check, close callbacks, promises, and process.nextTick ordering", [
    ["Timers", "Runs callbacks scheduled by setTimeout and setInterval when ready."],
    ["Poll", "Receives new I/O events and may wait for more I/O."],
    ["Check", "Runs setImmediate callbacks."],
    ["Close callbacks", "Runs close event callbacks for handles such as sockets."],
    ["Microtasks", "Promise jobs and nextTick callbacks that run between larger event-loop steps."],
  ], codeBlock("js", `
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
Promise.resolve().then(() => console.log("promise"));
process.nextTick(() => console.log("nextTick"));
console.log("sync");
`), { image: "../assets/diagrams/event_loop_phases.svg" }),

  topic("2_Node_Runtime_Internals", "c_callbacks_promises_async_await.md", "Callbacks, Promises, and async-await", "choosing and debugging asynchronous control flow in Node.js", [
    ["Callback", "Function passed to be called later, usually with error-first convention."],
    ["Promise", "Object representing eventual success or failure."],
    ["async function", "Function that always returns a promise and lets you await inside it."],
    ["Error-first callback", "Node convention where the first callback argument is an error."],
    ["Concurrency", "Starting independent async work together instead of awaiting sequentially."],
  ], codeBlock("js", `
async function loadUserWithTasks(userRepo, taskRepo, userId) {
  const user = await userRepo.findById(userId);
  if (!user) return null;

  const tasks = await taskRepo.findByOwner(user.id);
  return { ...user, tasks };
}
`)),

  topic("2_Node_Runtime_Internals", "d_process_object_env_signals.md", "process Object, Environment, and Signals", "using process utilities for args, environment variables, resource usage, and shutdown signals", [
    ["process.argv", "Arguments passed to the Node process."],
    ["process.env", "Environment variables for config and secrets references."],
    ["process.cwd", "Directory where the process was started."],
    ["Signals", "OS notifications such as SIGTERM and SIGINT."],
    ["Exit code", "Numeric status returned to the parent process or shell."],
  ], codeBlock("js", `
process.on("SIGTERM", async () => {
  console.log("shutdown requested");
  await closeServer();
  await closeDatabase();
  process.exit(0);
});

console.log(process.cwd());
console.log(process.memoryUsage());
`)),

  topic("2_Node_Runtime_Internals", "e_commonjs_vs_es_modules.md", "CommonJS vs ES Modules", "understanding module loading, exports, interop, and project-level module strategy", [
    ["CommonJS", "Legacy Node module system using require and module.exports."],
    ["ESM", "Standard JavaScript module system using import and export."],
    ["type field", "package.json option that controls whether .js files are ESM or CJS."],
    ["Dynamic import", "Asynchronous import expression that can load ESM from CJS."],
    ["Interop", "Rules for importing CJS from ESM and ESM from CJS."],
  ], codeBlock("js", `
// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from "./math.js";
console.log(add(2, 3));
`)),

  topic("2_Node_Runtime_Internals", "f_error_handling_graceful_shutdown.md", "Advanced Error Handling and Graceful Shutdown", "handling operational errors, programmer errors, unhandled rejections, and controlled process shutdown", [
    ["Operational error", "Expected runtime failure such as invalid input, timeout, or database unavailable."],
    ["Programmer error", "Bug such as undefined access, bad invariant, or wrong API usage."],
    ["Error middleware", "Express middleware with err, req, res, next signature."],
    ["Unhandled rejection", "Promise rejection that was not caught."],
    ["Graceful shutdown", "Stop accepting work, finish or cancel in-flight work, close resources, then exit."],
  ], codeBlock("js", `
app.use((err, req, res, next) => {
  req.log?.error({ err }, "request failed");
  const status = err.statusCode || 500;
  res.status(status).json({
    error: status >= 500 ? "Internal server error" : err.message,
  });
});
`)),

  topic("3_Core_Modules", "a_path_module_paths.md", "path Module and Safe Paths", "building cross-platform paths and avoiding current-working-directory surprises", [
    ["path.join", "Joins and normalizes path segments."],
    ["path.resolve", "Resolves segments into an absolute path."],
    ["__dirname", "Directory of the current CommonJS module."],
    ["process.cwd", "Directory where Node was started."],
    ["path.parse", "Breaks a path into root, dir, base, ext, and name."],
  ], codeBlock("js", `
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.resolve(__dirname, "..", "uploads");
console.log(path.join(uploadsDir, "avatar.png"));
`), { sourceNote: "Source covered path.join, path.resolve, __dirname, process.cwd, path.normalize, path.parse, and interview traps." }),

  topic("3_Core_Modules", "b_fs_module_files_directories.md", "fs Module, Files, and Directories", "reading, writing, listing, deleting, and watching files safely", [
    ["fs/promises", "Promise-based filesystem API for modern async code."],
    ["readFile", "Reads an entire file into memory."],
    ["createReadStream", "Reads a file incrementally as chunks."],
    ["mkdir recursive", "Creates parent directories if needed."],
    ["fs.access", "Checks permissions but should not replace handling real operation errors."],
  ], codeBlock("js", `
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export async function writeJson(file, value) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(value, null, 2));
}

export async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}
`)),

  topic("3_Core_Modules", "c_buffers_binary_data.md", "Buffers and Binary Data", "handling bytes for files, network packets, images, crypto, and streams", [
    ["Buffer", "Node representation of raw bytes."],
    ["Encoding", "How bytes map to strings, such as utf8 or base64."],
    ["Binary protocol", "Format where raw bytes matter, such as images or sockets."],
    ["Memory", "Buffers allocate memory outside normal JavaScript string representation."],
    ["Chunk", "Piece of binary data emitted by a stream."],
  ], codeBlock("js", `
const input = Buffer.from("hello", "utf8");
console.log(input);
console.log(input.toString("hex"));
console.log(Buffer.from("aGVsbG8=", "base64").toString("utf8"));
`)),

  topic("3_Core_Modules", "d_streams_backpressure_pipeline.md", "Streams, Backpressure, and pipeline", "processing large or continuous data safely without loading everything into memory", [
    ["Readable", "Produces chunks."],
    ["Writable", "Consumes chunks."],
    ["Duplex", "Readable and writable at the same time."],
    ["Transform", "Changes chunks while passing them through."],
    ["Backpressure", "Signal that the consumer is slower than the producer."],
  ], codeBlock("js", `
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";

await pipeline(
  createReadStream("access.log"),
  createGzip(),
  createWriteStream("access.log.gz")
);
`), { image: "../assets/diagrams/stream_backpressure.svg" }),

  topic("3_Core_Modules", "e_events_eventemitter.md", "events Module and EventEmitter", "using event-driven APIs without leaking listeners or swallowing errors", [
    ["EventEmitter", "Object that lets callers subscribe to and emit named events."],
    ["on", "Registers a listener."],
    ["once", "Registers a listener that is removed after the first event."],
    ["emit", "Triggers listeners for an event name."],
    ["error event", "Special event that can crash the process if emitted without a listener."],
  ], codeBlock("js", `
import { EventEmitter } from "node:events";

class JobQueue extends EventEmitter {
  complete(job) {
    this.emit("completed", job);
  }
}

const queue = new JobQueue();
queue.on("completed", (job) => console.log("done", job.id));
queue.complete({ id: "email-1" });
`)),

  topic("3_Core_Modules", "f_http_https_core_server.md", "http and https Core Modules", "understanding the lower-level server APIs that Express builds on", [
    ["createServer", "Creates an HTTP server with a request listener."],
    ["IncomingMessage", "Readable request stream."],
    ["ServerResponse", "Writable response stream."],
    ["Headers", "Metadata for request and response behavior."],
    ["Status code", "Numeric result category such as 200, 400, 401, 403, 404, or 500."],
  ], codeBlock("js", `
import http from "node:http";

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  res.writeHead(404);
  res.end("Not found");
});

server.listen(3000);
`)),

  topic("3_Core_Modules", "g_child_processes.md", "child_process Module", "running external programs and separate Node processes safely", [
    ["exec", "Runs a shell command and buffers output."],
    ["spawn", "Starts a process and streams stdio."],
    ["fork", "Starts another Node.js process with IPC support."],
    ["stdio", "stdin, stdout, and stderr streams."],
    ["IPC", "Inter-process communication channel."],
  ], codeBlock("js", `
import { spawn } from "node:child_process";

const child = spawn("node", ["worker.js"], { stdio: ["ignore", "pipe", "pipe"] });
child.stdout.on("data", (chunk) => process.stdout.write(chunk));
child.stderr.on("data", (chunk) => process.stderr.write(chunk));
child.on("exit", (code) => console.log("child exited", code));
`)),

  topic("4_CLI_Automation", "a_process_argv_cli_input.md", "Command Line Arguments and CLI Input", "reading user intent from arguments, stdin, and environment variables", [
    ["argv[0]", "Path to the node executable."],
    ["argv[1]", "Path to the script being executed."],
    ["argv[2+]", "User-provided arguments."],
    ["stdin", "Readable stream for piped or typed input."],
    ["exit code", "0 for success, non-zero for failure."],
  ], codeBlock("js", `
const [, , command, name] = process.argv;

if (command === "hello" && name) {
  console.log("Hello " + name);
  process.exit(0);
}

console.error("Usage: node cli.js hello <name>");
process.exit(1);
`)),

  topic("4_CLI_Automation", "b_yargs_commander_cli_apps.md", "yargs and Commander CLI Apps", "building maintainable multi-command CLIs", [
    ["Command", "Named action such as add, remove, list, or deploy."],
    ["Option", "Flag that modifies behavior."],
    ["Positional", "Required or optional argument based on position."],
    ["Help output", "Self-documenting usage text."],
    ["Validation", "Reject invalid input before doing work."],
  ], codeBlock("js", `
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command("add <title>", "add a note", (cmd) =>
    cmd.positional("title", { type: "string", demandOption: true })
  )
  .strict()
  .help()
  .parse();
`)),

  topic("4_CLI_Automation", "c_json_file_store_notes_app.md", "JSON File Store Notes App", "using filesystem APIs to persist simple CLI data before introducing a database", [
    ["JSON file store", "Small local persistence mechanism for learning or simple tools."],
    ["Atomic write", "Write temp file then rename to reduce corruption risk."],
    ["Schema", "Expected shape of stored data."],
    ["Migration", "Changing data shape as the app evolves."],
    ["Locking", "Protecting writes when multiple processes may edit the same file."],
  ], codeBlock("js", `
import { readFile, writeFile } from "node:fs/promises";

export async function loadNotes(file) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

export async function saveNotes(file, notes) {
  await writeFile(file, JSON.stringify(notes, null, 2));
}
`)),

  topic("4_CLI_Automation", "d_environment_config.md", "Environment Variables and Configuration", "managing configuration cleanly across local, test, staging, and production", [
    ["Environment variable", "Runtime-provided key/value configuration."],
    ["Secret", "Sensitive value such as token, password, or private key."],
    ["Config validation", "Startup check that required config is present and valid."],
    ["Twelve-factor", "Practice of storing config in the environment."],
    ["Test config", "Isolated configuration used by automated tests."],
  ], codeBlock("js", `
const required = ["PORT", "MONGODB_URL", "JWT_SECRET"];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error("Missing required env var: " + key);
  }
}

export const config = {
  port: Number(process.env.PORT),
  mongoUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
};
`)),

  topic("5_Express_HTTP_APIs", "a_express_intro_http_server.md", "Express Introduction and HTTP Server", "using Express as a thin HTTP layer over Node core", [
    ["app", "Express application that registers middleware and routes."],
    ["Route", "HTTP method plus path plus handler."],
    ["Middleware", "Function that runs during request handling."],
    ["Request", "Incoming HTTP data."],
    ["Response", "Outgoing HTTP data."],
  ], codeBlock("js", `
import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(3000, () => console.log("listening on 3000"));
`), { image: "../assets/diagrams/http_request_lifecycle.svg" }),

  topic("5_Express_HTTP_APIs", "b_routing_controllers_services.md", "Routing, Controllers, and Services", "separating transport concerns from business logic", [
    ["Router", "Grouped route definitions for one resource or feature."],
    ["Controller", "HTTP adapter that maps request to service call and service result to response."],
    ["Service", "Business logic that should not depend on Express."],
    ["Repository", "Persistence boundary."],
    ["DTO", "Input or output shape crossing a boundary."],
  ], codeBlock("js", `
router.post("/tasks", async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.user.id, req.body);
    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
});
`)),

  topic("5_Express_HTTP_APIs", "c_middleware_request_lifecycle.md", "Express Middleware and Request Lifecycle", "composing auth, parsing, validation, logging, and error behavior predictably", [
    ["Order", "Middleware runs in the order it is registered."],
    ["next", "Passes control to the next middleware."],
    ["Terminating middleware", "Sends a response and does not call next."],
    ["Error middleware", "Four-argument middleware that handles failures."],
    ["Route-level middleware", "Middleware applied only to selected routes."],
  ], codeBlock("js", `
function requireAuth(req, res, next) {
  if (!req.user) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  next();
}

app.get("/me", requireAuth, (req, res) => res.json({ user: req.user }));
`)),

  topic("5_Express_HTTP_APIs", "d_status_codes_api_errors.md", "Status Codes and API Error Design", "returning errors that are correct for clients and safe for production", [
    ["400", "Bad request or validation failure."],
    ["401", "Caller is not authenticated."],
    ["403", "Caller is authenticated but not allowed."],
    ["404", "Resource not found or intentionally hidden."],
    ["500", "Unexpected server failure."],
  ], codeBlock("js", `
class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

throw new HttpError(403, "You cannot update this task");
`)),

  topic("5_Express_HTTP_APIs", "e_validation_sanitization.md", "Validation and Sanitization", "protecting API boundaries before data reaches business logic or databases", [
    ["Validation", "Checks whether input is acceptable."],
    ["Sanitization", "Transforms input into safe normalized form."],
    ["Allowlist", "Accept known fields and reject or ignore everything else."],
    ["Schema", "Reusable definition of input shape and constraints."],
    ["Error mapping", "Converting validation failures into useful 400 responses."],
  ], codeBlock("js", `
const allowedUpdates = ["description", "completed"];
const updates = Object.keys(req.body);
const isValid = updates.every((key) => allowedUpdates.includes(key));

if (!isValid) {
  res.status(400).json({ error: "Invalid updates" });
  return;
}
`)),

  topic("5_Express_HTTP_APIs", "f_static_assets_templating.md", "Static Assets and Templating", "serving HTML, CSS, images, and dynamic pages from Express", [
    ["express.static", "Middleware that exposes files from a directory."],
    ["View engine", "Template renderer such as Handlebars or Pug."],
    ["Public directory", "Folder whose files are intentionally browser-accessible."],
    ["404 page", "Fallback response for unknown routes."],
    ["Cache headers", "Headers that control browser and CDN caching."],
  ], codeBlock("js", `
import path from "node:path";
import express from "express";

app.set("view engine", "hbs");
app.set("views", path.join(process.cwd(), "templates", "views"));
app.use(express.static(path.join(process.cwd(), "public")));

app.get("", (req, res) => res.render("index", { title: "Weather" }));
`)),

  topic("6_Database_MongoDB", "a_mongodb_driver_crud.md", "MongoDB Native Driver and CRUD", "connecting to MongoDB and performing create, read, update, and delete operations", [
    ["Collection", "Group of MongoDB documents."],
    ["Document", "JSON-like record stored as BSON."],
    ["ObjectId", "Common MongoDB identifier type."],
    ["CRUD", "Create, read, update, delete."],
    ["Connection pool", "Reusable set of database network connections."],
  ], codeBlock("js", `
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL);
await client.connect();

const db = client.db("task-manager");
const task = await db.collection("tasks").findOne({ _id: new ObjectId(id) });
`)),

  topic("6_Database_MongoDB", "b_mongoose_models_schemas.md", "Mongoose Models and Schemas", "using schema-backed models for validation and database access", [
    ["Schema", "Definition of fields, types, defaults, validation, indexes, and middleware."],
    ["Model", "Constructor and query API for one collection."],
    ["Document", "Model instance with methods and change tracking."],
    ["Middleware", "Pre/post hooks for lifecycle behavior."],
    ["toJSON", "Serialization hook for hiding private fields."],
  ], codeBlock("js", `
const taskSchema = new mongoose.Schema({
  description: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);
`)),

  topic("6_Database_MongoDB", "c_validation_indexes_relationships.md", "Validation, Indexes, and Relationships", "modeling data so queries stay correct and fast as data grows", [
    ["Validator", "Rule that rejects invalid data."],
    ["Unique index", "Database-level uniqueness guarantee."],
    ["Reference", "ObjectId relationship to another collection."],
    ["Populate", "Mongoose helper that resolves references."],
    ["Cascade delete", "Removing dependent records when owner is deleted."],
  ], codeBlock("js", `
userSchema.pre("deleteOne", { document: true }, async function () {
  await Task.deleteMany({ owner: this._id });
});

taskSchema.index({ owner: 1, completed: 1, createdAt: -1 });
`)),

  topic("6_Database_MongoDB", "d_filtering_pagination_sorting.md", "Filtering, Pagination, and Sorting", "returning bounded query results that clients can page through reliably", [
    ["filter", "Narrows results by fields such as completed or owner."],
    ["limit", "Maximum number of results to return."],
    ["skip", "Number of matching results to skip."],
    ["sort", "Ordering rule such as createdAt descending."],
    ["cursor pagination", "Pagination using a stable cursor instead of large skip values."],
  ], codeBlock("js", `
const tasks = await Task.find({ owner: req.user._id, completed })
  .limit(Number(req.query.limit) || 20)
  .skip(Number(req.query.skip) || 0)
  .sort({ createdAt: req.query.sort === "oldest" ? 1 : -1 });
`)),

  topic("6_Database_MongoDB", "e_database_transactions_consistency.md", "Transactions and Data Consistency", "knowing when one write is not enough and how to preserve invariants", [
    ["Invariant", "Business rule that must always remain true."],
    ["Transaction", "Group of database operations that commit or roll back together."],
    ["Idempotency", "Safe repeated request behavior."],
    ["Optimistic concurrency", "Detects conflicting updates through version or timestamp checks."],
    ["Write concern", "MongoDB durability acknowledgement level."],
  ], codeBlock("js", `
const session = await mongoose.startSession();
await session.withTransaction(async () => {
  await Account.updateOne({ _id: from }, { $inc: { balance: -amount } }, { session });
  await Account.updateOne({ _id: to }, { $inc: { balance: amount } }, { session });
});
await session.endSession();
`)),

  topic("7_Auth_Security", "a_password_hashing_bcrypt.md", "Password Hashing with bcrypt", "storing passwords safely with slow salted hashes", [
    ["Hash", "One-way derived value used for comparison."],
    ["Salt", "Random value that prevents identical passwords from producing identical hashes."],
    ["Cost factor", "Work factor that makes brute-force attempts slower."],
    ["compare", "Checks plaintext input against a stored hash."],
    ["Credential stuffing", "Attack using leaked passwords from other services."],
  ], codeBlock("js", `
import bcrypt from "bcryptjs";

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

const isMatch = await bcrypt.compare(password, user.password);
`)),

  topic("7_Auth_Security", "b_jwt_authentication_tokens.md", "JWT Authentication Tokens", "using signed tokens without confusing readability with secrecy", [
    ["Header", "JWT metadata such as algorithm and token type."],
    ["Payload", "Claims such as subject, role, or expiration."],
    ["Signature", "Proof that the token was signed by a trusted secret or private key."],
    ["Bearer token", "Token sent in Authorization header."],
    ["Revocation", "Invalidating a token before its natural expiration."],
  ], codeBlock("js", `
import jwt from "jsonwebtoken";

const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
const payload = jwt.verify(token, process.env.JWT_SECRET);
`), { image: "../assets/diagrams/jwt_auth_flow.svg" }),

  topic("7_Auth_Security", "c_auth_middleware_authorization.md", "Auth Middleware and Authorization", "protecting routes and checking resource ownership", [
    ["Authentication middleware", "Loads the caller from a credential such as a token."],
    ["Authorization", "Policy decision for a specific action."],
    ["Resource ownership", "Ensures users can only access their own data unless policy allows more."],
    ["Role", "Coarse permission grouping such as admin or member."],
    ["Policy", "Reusable rule for access decisions."],
  ], codeBlock("js", `
async function auth(req, res, next) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id: payload.sub, "tokens.token": token });
    if (!req.user) throw new Error("not authenticated");
    next();
  } catch {
    res.status(401).json({ error: "Please authenticate" });
  }
}
`)),

  topic("7_Auth_Security", "d_cors_browser_security.md", "CORS and Browser Security Boundaries", "understanding what the browser enforces and what the server must still protect", [
    ["Origin", "Scheme, host, and port tuple."],
    ["Same-origin policy", "Browser rule limiting cross-origin reads."],
    ["CORS", "Server response headers that allow selected cross-origin browser reads."],
    ["Preflight", "OPTIONS request used before certain cross-origin requests."],
    ["Credentials", "Cookies or auth headers that need explicit CORS handling."],
  ], codeBlock("js", `
import cors from "cors";

app.use(cors({
  origin: ["https://app.example.com"],
  credentials: true,
}));
`)),

  topic("7_Auth_Security", "e_rate_limiting_headers_secrets.md", "Rate Limiting, Security Headers, and Secrets", "reducing common API abuse and accidental exposure", [
    ["Rate limit", "Caps request volume by identity or IP over time."],
    ["Helmet", "Express middleware that sets common security headers."],
    ["Secret rotation", "Changing secrets safely without downtime."],
    ["PII", "Personally identifiable information that must be minimized in logs."],
    ["Threat model", "List of likely attackers, assets, and failure modes."],
  ], codeBlock("js", `
import helmet from "helmet";
import rateLimit from "express-rate-limit";

app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
}));
`)),

  topic("7_Auth_Security", "f_oauth_basics.md", "OAuth Basics for Node APIs", "delegating access without sharing user passwords", [
    ["Resource owner", "User who owns the protected data."],
    ["Client", "Application requesting access."],
    ["Authorization server", "System that authenticates user and issues tokens."],
    ["Access token", "Token used to call an API."],
    ["Refresh token", "Longer-lived token used to get new access tokens."],
  ], codeBlock("text", `
User clicks "Continue with Provider"
  -> app redirects to authorization server
  -> user signs in and consents
  -> app receives authorization code
  -> backend exchanges code for tokens
  -> backend creates local session or account link
`)),

  topic("8_Files_Email_Jobs", "a_file_uploads_multer.md", "File Uploads with Multer", "accepting multipart uploads safely in Express", [
    ["multipart/form-data", "Encoding used for browser file uploads."],
    ["Multer", "Express middleware for parsing multipart uploads."],
    ["File filter", "Rejects invalid file type or extension."],
    ["Size limit", "Protects memory, disk, and downstream processors."],
    ["Storage engine", "Controls memory, disk, or custom upload storage behavior."],
  ], codeBlock("js", `
const upload = multer({
  limits: { fileSize: 1_000_000 },
  fileFilter(req, file, cb) {
    cb(undefined, file.originalname.match(/\\.(png|jpg|jpeg)$/i));
  },
});

app.post("/users/me/avatar", auth, upload.single("avatar"), async (req, res) => {
  req.user.avatar = req.file.buffer;
  await req.user.save();
  res.sendStatus(204);
});
`)),

  topic("8_Files_Email_Jobs", "b_image_processing_serving_files.md", "Image Processing and Serving Files", "storing, transforming, and returning binary content from APIs", [
    ["Sharp", "Popular image processing library for resizing and format conversion."],
    ["Content-Type", "Response header that tells clients the media type."],
    ["Cache-Control", "Controls browser and CDN reuse."],
    ["Object storage", "Durable storage such as S3-compatible buckets."],
    ["Virus scanning", "Security step for untrusted uploads in higher-risk apps."],
  ], codeBlock("js", `
app.get("/users/:id/avatar", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user?.avatar) return res.sendStatus(404);
  res.set("Content-Type", "image/png");
  res.send(user.avatar);
});
`)),

  topic("8_Files_Email_Jobs", "c_sending_emails_providers.md", "Sending Emails with Providers", "integrating transactional email without coupling core logic to a vendor", [
    ["Transactional email", "Email triggered by user or system events."],
    ["Provider client", "SDK or API wrapper for SendGrid, SES, Mailgun, or similar."],
    ["Template", "Reusable email body with variables."],
    ["Idempotency", "Avoiding duplicate sends on retries."],
    ["Suppression", "Provider-side list of bounced or unsubscribed recipients."],
  ], codeBlock("js", `
export async function sendWelcomeEmail(email, name) {
  await mailClient.send({
    to: email,
    from: "support@example.com",
    subject: "Welcome",
    text: "Welcome " + name,
  });
}
`)),

  topic("8_Files_Email_Jobs", "d_background_jobs_queues.md", "Background Jobs and Queues", "moving slow or retryable work out of request handlers", [
    ["Queue", "Durable list of work items."],
    ["Worker", "Process that consumes jobs."],
    ["Retry", "Automatic reattempt after transient failure."],
    ["Dead letter", "Failed job storage after retry exhaustion."],
    ["Idempotent job", "Job safe to run more than once."],
  ], codeBlock("js", `
// Request handler
await emailQueue.add("welcome-email", { userId: user.id });
res.status(202).json({ accepted: true });

// Worker
emailWorker.process("welcome-email", async (job) => {
  const user = await userRepo.findById(job.data.userId);
  await sendWelcomeEmail(user.email, user.name);
});
`)),

  topic("9_Realtime_Networking", "a_tcp_udp_networking.md", "TCP, UDP, and Node Networking", "using lower-level networking concepts behind HTTP, WebSockets, and realtime systems", [
    ["TCP", "Reliable ordered byte stream used by HTTP and WebSockets."],
    ["UDP", "Connectionless datagrams useful for latency-sensitive protocols."],
    ["Socket", "Endpoint for network communication."],
    ["Port", "Number identifying a service on a host."],
    ["Backpressure", "Networking streams also need flow control."],
  ], codeBlock("js", `
import net from "node:net";

const server = net.createServer((socket) => {
  socket.write("hello\\n");
  socket.on("data", (data) => socket.write(data));
});

server.listen(4000);
`)),

  topic("9_Realtime_Networking", "b_websockets_socketio_intro.md", "WebSockets and Socket.io Introduction", "building bidirectional realtime communication", [
    ["WebSocket", "Persistent bidirectional connection over TCP."],
    ["Socket.io", "Library that adds events, reconnection, rooms, and fallbacks."],
    ["Connection", "Long-lived client/server session."],
    ["Event", "Named message with payload."],
    ["Acknowledgement", "Callback-style confirmation from the receiver."],
  ], codeBlock("js", `
io.on("connection", (socket) => {
  socket.emit("message", "Welcome");

  socket.on("sendMessage", (message, ack) => {
    io.emit("message", message);
    ack?.("delivered");
  });
});
`)),

  topic("9_Realtime_Networking", "c_socketio_rooms_presence.md", "Socket.io Rooms and Presence", "tracking users, rooms, joins, leaves, and targeted broadcasts", [
    ["Room", "Server-side grouping of sockets."],
    ["Presence", "Knowledge of who is currently connected."],
    ["Broadcast", "Send to other sockets, often excluding sender."],
    ["Join", "Associate socket with room state."],
    ["Leave", "Clean up socket state on disconnect or explicit exit."],
  ], codeBlock("js", `
socket.on("join", ({ room, username }) => {
  socket.join(room);
  socket.to(room).emit("message", username + " joined");
  io.to(room).emit("roomData", getUsersInRoom(room));
});
`)),

  topic("9_Realtime_Networking", "d_realtime_scaling_redis_adapter.md", "Realtime Scaling and Redis Adapter", "scaling socket systems beyond one Node process", [
    ["Adapter", "Socket.io component that coordinates rooms across servers."],
    ["Pub/sub", "Messaging pattern where publishers broadcast to subscribers."],
    ["Sticky session", "Load balancer behavior that keeps a client on one backend."],
    ["Distributed presence", "Presence state shared across instances."],
    ["Fanout", "Sending one event to many connected clients."],
  ], codeBlock("js", `
// Conceptual setup
// io.adapter(createAdapter(redisPublisher, redisSubscriber));
// Load balancer must support WebSocket upgrades and session strategy.
`)),

  topic("10_Testing_Quality", "a_jest_unit_tests.md", "Jest Unit Tests", "testing pure backend logic quickly and deterministically", [
    ["test", "One executable behavior check."],
    ["expect", "Assertion API in Jest."],
    ["matcher", "Specific assertion such as toEqual or toThrow."],
    ["fixture", "Known input data used by tests."],
    ["coverage", "Signal of exercised code, not proof of quality by itself."],
  ], codeBlock("js", `
import { calculateTotal } from "./billing.js";

test("adds tax to subtotal", () => {
  expect(calculateTotal({ subtotal: 100, taxRate: 0.18 })).toBe(118);
});
`)),

  topic("10_Testing_Quality", "b_testing_async_code.md", "Testing Asynchronous Code", "making async tests fail correctly and finish predictably", [
    ["await", "Waits for a promise before continuing the test."],
    ["rejects", "Jest helper for promise rejection assertions."],
    ["timeout", "Limit for a test that may hang."],
    ["fake timer", "Controlled timer implementation for timer-heavy code."],
    ["race", "Common source of flaky tests when async work is not awaited."],
  ], codeBlock("js", `
test("rejects invalid token", async () => {
  await expect(authenticate("bad-token")).rejects.toThrow("invalid token");
});
`)),

  topic("10_Testing_Quality", "c_supertest_express_integration.md", "Supertest Express Integration Tests", "testing API behavior through HTTP without opening a public port", [
    ["Supertest", "HTTP assertion library for Express apps."],
    ["Integration test", "Checks multiple layers working together."],
    ["Test app export", "Export app separately from server.listen."],
    ["Status assertion", "Checks expected HTTP status."],
    ["Response body assertion", "Checks response contract."],
  ], codeBlock("js", `
import request from "supertest";
import { app } from "../src/app.js";

test("creates a task", async () => {
  await request(app)
    .post("/tasks")
    .send({ description: "Learn Node" })
    .expect(201);
});
`)),

  topic("10_Testing_Quality", "d_test_database_setup_teardown.md", "Test Database Setup and Teardown", "keeping database tests isolated and repeatable", [
    ["Setup", "Creates known test state before tests run."],
    ["Teardown", "Cleans up resources after tests run."],
    ["Seed data", "Known records used by tests."],
    ["Isolation", "Tests should not depend on other tests."],
    ["Test database", "Separate database used only by automated tests."],
  ], codeBlock("js", `
beforeEach(async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
});

afterAll(async () => {
  await mongoose.connection.close();
});
`)),

  topic("10_Testing_Quality", "e_mocking_external_services.md", "Mocking External Services", "testing email, payment, maps, and third-party APIs without real side effects", [
    ["Boundary mock", "Mock at the external provider boundary."],
    ["Contract", "Shape your app expects from provider responses."],
    ["Fake", "Small in-memory implementation used by tests."],
    ["Network isolation", "Tests should not depend on live external services."],
    ["Verification", "Assert the provider was called with safe expected data."],
  ], codeBlock("js", `
jest.mock("@sendgrid/mail", () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

expect(sendGrid.send).toHaveBeenCalledWith(expect.objectContaining({
  to: user.email,
}));
`)),

  topic("11_Performance_Scaling", "a_event_loop_lag_profiling.md", "Event Loop Lag and Profiling", "finding blocking code before it turns into latency incidents", [
    ["Event loop lag", "Delay between when work is ready and when JavaScript can run it."],
    ["Profiler", "Tool that shows where CPU time is spent."],
    ["p95 latency", "95 percent of requests complete at or below this duration."],
    ["Hot path", "Code run frequently or under high load."],
    ["Blocking operation", "Work that prevents the event loop from handling other tasks."],
  ], codeBlock("js", `
import { monitorEventLoopDelay } from "node:perf_hooks";

const histogram = monitorEventLoopDelay({ resolution: 20 });
histogram.enable();

setInterval(() => {
  console.log("event loop p99 ms", histogram.percentile(99) / 1e6);
  histogram.reset();
}, 10_000);
`)),

  topic("11_Performance_Scaling", "b_thread_pool_libuv.md", "libuv Thread Pool", "knowing which operations use background native threads and when pool size matters", [
    ["UV_THREADPOOL_SIZE", "Environment variable that controls libuv thread pool size."],
    ["fs", "Filesystem operations commonly use the thread pool."],
    ["crypto", "Selected expensive crypto APIs use the thread pool."],
    ["dns.lookup", "Name lookup API that uses the thread pool."],
    ["Starvation", "Pool saturated by slow tasks causing unrelated tasks to wait."],
  ], codeBlock("bash", `
UV_THREADPOOL_SIZE=8 node src/server.js
`), { image: "../assets/diagrams/scaling_models.svg" }),

  topic("11_Performance_Scaling", "c_cluster_pm2_multi_process.md", "Cluster, PM2, and Multi-process Scaling", "using multiple Node processes to use multiple CPU cores", [
    ["cluster", "Core module that forks worker processes."],
    ["PM2", "Process manager that can run clustered Node apps."],
    ["Worker process", "Separate process with its own event loop and memory."],
    ["Round robin", "Common strategy for distributing connections."],
    ["Stateless process", "Process that does not own durable user state in memory."],
  ], codeBlock("bash", `
pm2 start src/server.js -i max
pm2 status
pm2 reload all
pm2 logs
`), { image: "../assets/diagrams/scaling_models.svg" }),

  topic("11_Performance_Scaling", "d_worker_threads_cpu_tasks.md", "Worker Threads for CPU-heavy Tasks", "parallelizing expensive JavaScript without blocking request handling", [
    ["Worker", "Thread running JavaScript in parallel."],
    ["workerData", "Initial data passed to a worker."],
    ["parentPort", "Message channel back to the parent thread."],
    ["SharedArrayBuffer", "Optional shared memory mechanism."],
    ["CPU-bound", "Work limited by computation rather than I/O waiting."],
  ], codeBlock("js", `
import { Worker } from "node:worker_threads";

export function runCpuJob(input) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./cpu-worker.js", import.meta.url), {
      workerData: input,
    });
    worker.once("message", resolve);
    worker.once("error", reject);
  });
}
`), { image: "../assets/diagrams/scaling_models.svg" }),

  topic("11_Performance_Scaling", "e_caching_redis.md", "Caching and Redis", "reducing repeated work while keeping freshness and invalidation clear", [
    ["Cache", "Fast store for data that can be recomputed or refetched."],
    ["TTL", "Time to live before cached value expires."],
    ["Redis", "In-memory data store often used for caching, rate limits, sessions, and queues."],
    ["Invalidation", "Removing stale data when source changes."],
    ["Cache key", "Stable identifier for cached value."],
  ], codeBlock("js", `
const key = "user:" + id;
const cached = await redis.get(key);
if (cached) return JSON.parse(cached);

const user = await userRepo.findById(id);
await redis.set(key, JSON.stringify(user), { EX: 60 });
return user;
`)),

  topic("12_Production_DevOps", "a_logging_monitoring_observability.md", "Logging, Monitoring, and Observability", "making production systems understandable when they fail", [
    ["Structured log", "Machine-readable log object with consistent fields."],
    ["Metric", "Numeric time-series signal such as latency or error rate."],
    ["Trace", "Request journey across services and spans."],
    ["Correlation id", "Identifier used to connect logs for one request."],
    ["Alert", "Notification when a user-impacting signal crosses a threshold."],
  ], codeBlock("js", `
app.use((req, res, next) => {
  req.id = crypto.randomUUID();
  res.setHeader("x-request-id", req.id);
  next();
});
`)),

  topic("12_Production_DevOps", "b_health_checks_graceful_shutdown.md", "Health Checks and Graceful Shutdown", "coordinating app lifecycle with process managers and deploy systems", [
    ["Liveness", "Whether the process should be restarted."],
    ["Readiness", "Whether the process can receive traffic."],
    ["SIGTERM", "Common signal sent during deploy or stop."],
    ["Drain", "Stop accepting new work and let current work finish."],
    ["Timeout", "Maximum shutdown wait before forced exit."],
  ], codeBlock("js", `
let ready = true;
app.get("/healthz", (req, res) => res.json({ ok: true }));
app.get("/readyz", (req, res) => res.status(ready ? 200 : 503).json({ ready }));

process.on("SIGTERM", () => {
  ready = false;
  server.close(() => process.exit(0));
});
`)),

  topic("12_Production_DevOps", "c_docker_nodejs.md", "Docker for Node.js Services", "packaging a Node service into a repeatable runtime image", [
    ["Image", "Immutable filesystem and metadata used to create containers."],
    ["Container", "Running instance of an image."],
    ["Dockerfile", "Build recipe for an image."],
    ["Layer", "Cached filesystem change in an image build."],
    ["Runtime user", "Non-root user used to reduce container risk."],
  ], codeBlock("dockerfile", `
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
USER node
CMD ["node", "src/server.js"]
`)),

  topic("12_Production_DevOps", "d_deployment_ci_cd.md", "Deployment and CI/CD", "shipping Node services through repeatable checks and controlled releases", [
    ["CI", "Runs checks on every change."],
    ["CD", "Automates release or deployment steps."],
    ["Artifact", "Built output or image deployed to runtime."],
    ["Rollback", "Returning to previous known-good version."],
    ["Migration", "Database change coordinated with application deployment."],
  ], codeBlock("yaml", `
steps:
  - npm ci
  - npm test
  - npm run lint
  - docker build -t api:\${GIT_SHA} .
  - deploy api:\${GIT_SHA}
`)),

  topic("13_Architecture_System_Design", "a_layered_backend_architecture.md", "Layered Backend Architecture", "organizing controllers, services, repositories, and integrations", [
    ["Controller", "Transport adapter for HTTP or realtime events."],
    ["Service", "Application use case and business workflow."],
    ["Repository", "Persistence abstraction."],
    ["Integration client", "Wrapper for third-party APIs."],
    ["Domain model", "Core business concepts and invariants."],
  ], codeBlock("text", `
HTTP route
  -> controller
  -> service/use case
  -> repository or integration client
  -> database/external API
  -> response DTO
`)),

  topic("13_Architecture_System_Design", "b_rest_api_design.md", "REST API Design", "designing predictable resource-oriented APIs", [
    ["Resource", "Domain object exposed through a URL."],
    ["Representation", "JSON shape sent to clients."],
    ["Idempotency", "Repeated request has same practical effect."],
    ["Versioning", "Strategy for evolving contracts safely."],
    ["Pagination", "Bounded list response pattern."],
  ], codeBlock("text", `
GET    /tasks
POST   /tasks
GET    /tasks/:id
PATCH  /tasks/:id
DELETE /tasks/:id
`)),

  topic("13_Architecture_System_Design", "c_graphql_basics.md", "GraphQL Basics for Node.js", "understanding when GraphQL helps and when REST is simpler", [
    ["Schema", "Typed contract of queries, mutations, and objects."],
    ["Resolver", "Function that returns data for a field."],
    ["Query", "Read operation."],
    ["Mutation", "Write operation."],
    ["N+1", "Performance issue caused by resolving related data one item at a time."],
  ], codeBlock("graphql", `
type Task {
  id: ID!
  description: String!
  completed: Boolean!
}

type Query {
  tasks(completed: Boolean): [Task!]!
}
`)),

  topic("13_Architecture_System_Design", "d_message_queues_event_driven.md", "Message Queues and Event-driven Design", "decoupling workflows with durable asynchronous communication", [
    ["Producer", "Code that publishes a message."],
    ["Consumer", "Code that handles a message."],
    ["Topic", "Named stream of related events."],
    ["At-least-once", "Delivery model where duplicates are possible."],
    ["Outbox", "Pattern for reliably publishing events after database writes."],
  ], codeBlock("text", `
UserCreated event
  -> email worker sends welcome message
  -> analytics worker records signup
  -> billing worker creates customer profile
`)),

  topic("14_Interview_Prep", "a_node_runtime_interview_questions.md", "Node Runtime Interview Questions", "answering event loop, libuv, thread pool, and scaling questions clearly", [
    ["Single thread", "JavaScript runs on one main thread per process."],
    ["Non-blocking I/O", "I/O starts, Node continues handling other work, callback resumes later."],
    ["Thread pool", "Native background workers for selected operations."],
    ["Cluster", "Multiple processes to use multiple CPU cores."],
    ["Worker threads", "Parallel JavaScript execution for CPU-heavy work."],
  ], codeBlock("text", `
Answer shape:
1. Define the concept.
2. Explain what happens internally.
3. Give a production example.
4. Name the tradeoff.
5. Explain how to debug or measure it.
`)),

  topic("14_Interview_Prep", "b_express_api_interview_questions.md", "Express API Interview Questions", "explaining middleware, routing, status codes, validation, and error handling", [
    ["Middleware order", "First matching middleware runs first."],
    ["next", "Moves request to the next middleware or error handler."],
    ["Error handler", "Central place to map errors to responses."],
    ["401 vs 403", "Unauthenticated versus authenticated but forbidden."],
    ["Thin controller", "Route handler that delegates business logic."],
  ], codeBlock("text", `
Q: What is middleware?
A: A function in the request lifecycle. It can read/modify req and res, end the response, or call next. It is used for parsing, auth, validation, logging, and error handling.
`)),

  topic("14_Interview_Prep", "c_database_auth_security_interview.md", "Database, Auth, and Security Interview Questions", "connecting backend data modeling to real security risks", [
    ["JWT", "Signed token, readable payload, not encrypted by default."],
    ["bcrypt", "Slow salted password hashing."],
    ["Index", "Data structure that makes specific queries faster."],
    ["CORS", "Browser cross-origin read control, not API authorization."],
    ["Validation", "Reject unsafe input before it reaches persistence."],
  ], codeBlock("text", `
Q: Why is JWT safe if anyone can decode it?
A: The payload is readable, so it must not contain secrets. Its safety comes from the signature: the server can detect tampering because attackers cannot produce a valid signature without the signing key.
`)),

  topic("14_Interview_Prep", "d_backend_system_design_interview.md", "Backend System Design Interview Notes", "designing Node-backed systems with APIs, data, scale, and operations", [
    ["Requirement", "What users and business need the system to do."],
    ["Constraint", "Latency, scale, consistency, cost, compliance, or timeline limit."],
    ["API contract", "Endpoints, payloads, errors, and versioning."],
    ["Data model", "Entities, relationships, indexes, and lifecycle."],
    ["Operational plan", "Deploy, observe, scale, and recover."],
  ], codeBlock("text", `
Design checklist:
requirements -> APIs -> data model -> core flows -> failure modes
security -> scaling -> caching -> observability -> deployment
`)),

  topic("15_Capstone_Projects", "a_notes_cli_project.md", "Capstone: Notes CLI", "building a file-backed CLI before moving to web APIs", [
    ["Commands", "add, remove, list, read, search."],
    ["Storage", "JSON file with safe read/write helpers."],
    ["Validation", "Reject duplicate titles and empty bodies."],
    ["Tests", "Pure note service tests and CLI smoke tests."],
    ["Polish", "Help output, colored errors, and exit codes."],
  ], codeBlock("text", `
Build:
node notes add --title "Streams" --body "Use pipeline"
node notes list
node notes read --title "Streams"
node notes remove --title "Streams"
`)),

  topic("15_Capstone_Projects", "b_weather_web_app_project.md", "Capstone: Weather Web App", "building an Express app that serves pages and calls external APIs", [
    ["Express server", "Serves static assets and JSON endpoint."],
    ["Query string", "Browser sends address to backend endpoint."],
    ["External API", "Geocoding and weather provider calls."],
    ["Error states", "Invalid address, provider failure, timeout."],
    ["Deployment", "Production-ready env variables and start script."],
  ], codeBlock("text", `
GET /
GET /weather?address=Chennai
  -> validate address
  -> geocode
  -> fetch forecast
  -> return JSON
`)),

  topic("15_Capstone_Projects", "c_task_manager_api_project.md", "Capstone: Task Manager REST API", "building a secure MongoDB-backed REST API", [
    ["Users", "Signup, login, logout, profile, avatar."],
    ["Tasks", "CRUD with owner relationship."],
    ["Auth", "JWT middleware and token revocation."],
    ["Queries", "Filtering, pagination, sorting."],
    ["Tests", "Supertest with auth and isolated test database."],
  ], codeBlock("text", `
POST /users
POST /users/login
GET /users/me
POST /tasks
GET /tasks?completed=false&limit=10&skip=0&sortBy=createdAt:desc
PATCH /tasks/:id
DELETE /tasks/:id
`)),

  topic("15_Capstone_Projects", "d_realtime_chat_project.md", "Capstone: Realtime Chat App", "building a Socket.io chat app with rooms, presence, and deployment", [
    ["Join page", "Collects username and room."],
    ["Messages", "Server validates and broadcasts chat events."],
    ["Location sharing", "Optional event with coordinates."],
    ["Rooms", "Track users per room."],
    ["Scrolling", "Client keeps newest messages visible."],
  ], codeBlock("text", `
Client emits join -> server joins room
Client emits sendMessage -> server validates -> broadcasts to room
Client disconnects -> server removes user -> broadcasts updated room data
`)),

  topic("15_Capstone_Projects", "e_production_ready_api_capstone.md", "Capstone: Production-ready Node API", "combining senior backend practices into one deployable service", [
    ["Architecture", "Controller, service, repository, integration boundaries."],
    ["Security", "Auth, authorization, validation, rate limiting, headers, secrets."],
    ["Data", "Indexes, pagination, transactions or idempotency where needed."],
    ["Quality", "Unit, integration, and failure-path tests."],
    ["Operations", "Docker, health checks, structured logs, metrics, graceful shutdown."],
  ], codeBlock("text", `
Final review:
Can another developer run it?
Can a tester understand the API?
Can an operator deploy, observe, and roll it back?
Can an interviewer see your tradeoffs?
`)),
];

function seniorDeepDive(topic) {
  const checks = {
    runtime: ["Does this block the event loop?", "Which work uses libuv or the OS?", "How would I measure delay under load?"],
    core: ["Does this handle large data safely?", "Are paths and errors cross-platform?", "Would a stream or pipeline be safer?"],
    express: ["Is the controller thin?", "Are validation and auth centralized?", "Are status codes and errors consistent?"],
    database: ["Is the query indexed?", "Is the result bounded?", "Does the data model enforce the invariant?"],
    security: ["What can an attacker control?", "What secrets or PII could leak?", "Is authorization checked at the resource level?"],
    performance: ["What is the measured bottleneck?", "Can this scale statelessly?", "What happens at p99 latency?"],
    production: ["Can this deploy safely?", "Can this shut down gracefully?", "Can we diagnose it at 2 AM?"],
  };
  return checks[area(topic)] || ["What is the production failure mode?", "How do tests prove it?", "How would a teammate maintain it?"];
}

function interview(topic) {
  if (topic.interview) return topic.interview;
  return [
    {
      q: `How would you explain ${topic.title} in a real backend project?`,
      a: `${topic.title} should be explained through the request or process flow it affects, the runtime behavior behind it, and the production tradeoff. A senior answer connects the API to latency, correctness, failure handling, and maintainability.`,
    },
    {
      q: `What happens internally when ${topic.title} is involved?`,
      a: topic.internals.slice(0, 3).join(" "),
    },
    {
      q: `What is a common production bug related to ${topic.title}?`,
      a: topic.mistakes[0],
    },
    {
      q: `How would you debug an issue in ${topic.title}?`,
      a: `Reproduce the failing input, inspect logs and stack traces, isolate the boundary involved, add focused instrumentation, and write a regression test once the cause is known.`,
    },
    {
      q: `What should a senior engineer check in code review?`,
      a: seniorDeepDive(topic).join(" "),
    },
  ];
}

function exercises(topic) {
  if (topic.exercises) return topic.exercises;
  return [
    {
      task: `Build a small example that demonstrates this topic: ${topic.title}.`,
      solution: "Keep it focused, handle one failure path, and write down what happens internally.",
    },
    {
      task: `Turn this topic into a code review checklist: ${topic.title}.`,
      solution: `Include these checks: ${seniorDeepDive(topic).join(" ")}`,
    },
  ];
}

function noteContent(topic) {
  const imageBlock = topic.image
    ? `\n![${topic.title}](${topic.image})\n\n---\n`
    : "";
  const sourceBlock = topic.sourceNote
    ? `\n> Source integration note: ${topic.sourceNote}\n\n---\n`
    : "";

  return `# ${topic.title} (Senior Backend Node.js Engineer Perspective)

Before going deeper into frameworks or libraries, understand this topic as part of real backend engineering: ${topic.focus}.

---

# 1. Fundamentals

${list(topic.fundamentals)}

---

# 2. Core Concepts

${table(topic.concepts)}

---

# 3. Internal Working

${list(topic.internals)}

---

# 4. Common Mistakes

${list(topic.mistakes)}

---

# 5. Best Practices

${list(topic.practices)}

---

# 6. Code Example

${topic.example}

---${imageBlock}
${sourceBlock}
# 7. Real-world Scenarios

${list(topic.scenarios)}

---

# 8. Senior Deep Dive

## When to Use

${list(topic.practices.slice(-4))}

## Debug Checklist

${list([
  "Reproduce with the smallest input and environment that fails.",
  "Inspect logs, stack traces, request data, resource usage, and dependency behavior.",
  ...seniorDeepDive(topic),
])}

## Code Review Checklist

${list(seniorDeepDive(topic))}

---

# Revision Notes

${list([
  "This topic matters because backend bugs affect users, data, security, and operations.",
  "Learn the runtime mental model before memorizing framework syntax.",
  "Prefer small examples, tests, and production-style failure checks.",
  ...topic.fundamentals.slice(0, 3),
])}

---

# Cheat Sheet

${table(topic.concepts.slice(0, 8))}

---

# Interview Questions with Answers

${interview(topic)
  .map((item, index) => `### ${index + 1}. ${item.q}\n\n${item.a}`)
  .join("\n\n")}

---

# Hands-on Exercises

${exercises(topic)
  .map((exercise, index) => `## Exercise ${index + 1}\n\n${exercise.task}\n\n### Solution\n\n${exercise.solution}`)
  .join("\n\n")}

---

# Senior Backend Engineer Takeaway

For senior-level work, ${topic.title} is not only an API or syntax detail. You should be able to explain the mental model, choose the right pattern for a product requirement, identify common failure modes, and verify behavior with tests, logs, profiling, and production-aware review.
`;
}

function revisionContent(topic) {
  return `# Revision Notes: ${topic.title}

${list([
  ...topic.fundamentals.slice(0, 4),
  ...topic.practices.slice(0, 4).map((item) => `Best practice: ${item}`),
  ...topic.mistakes.slice(0, 4).map((item) => `Avoid: ${item}`),
])}

---

# Cheat Sheet

${table(topic.concepts.slice(0, 8))}

---

# Interview Questions & Answers

${interview(topic)
  .slice(0, 5)
  .map((item, index) => `### ${index + 1}. ${item.q}\n\n${item.a}`)
  .join("\n\n")}

---

# Quick Practice

${numbered([
  `Explain ${topic.title} in two minutes.`,
  "Write a tiny code example from memory.",
  "Name one security, performance, or reliability risk.",
  "Describe how you would debug a related production issue.",
])}
`;
}

function readmeContent() {
  const grouped = topics.reduce((acc, item) => {
    acc[item.folder] ||= [];
    acc[item.folder].push(item);
    return acc;
  }, {});

  const sections = Object.entries(grouped)
    .map(([folder, entries]) => {
      const rows = entries
        .map((item) => `* [${item.title}](./${folder}/${item.file})`)
        .join("\n");
      return `## ${folder}\n\n${rows}`;
    })
    .join("\n\n");

  return `# JavaScript Node.js Notes

Complete backend Node.js notes organized from the shared source documents and shaped from a senior backend engineer perspective.

These notes follow the same study style as the React notes reference:

* Fundamentals
* Core concepts
* Internal working
* Common mistakes
* Best practices
* Code examples
* Real-world scenarios
* Senior deep dives
* Revision notes
* Cheat sheets
* Interview questions with answers
* Hands-on exercises

## Source Material Integrated

* CodeEvolution YouTube Node.js screenshots and notes
* CodeEvolution advanced JavaScript reference link
* Node.js revision notes covering path, fs, events, buffers, streams, http, event loop, thread pool, cluster, worker threads, process, modules, and errors
* Andrew Mead Complete Node.js Developer PDF reference
* ZTM/Complete Node Developer notes covering runtime, Express, MongoDB, Mongoose, JWT, OAuth, testing, PM2, Docker, GraphQL, and production topics

Extracted original images are stored in \`assets/source_extract\` and browsable from [Source Image Gallery](./0_Notes/source_image_gallery.md). Curated diagrams for study notes are stored in \`assets/diagrams\`.

## How to Study

1. Read one main note slowly.
2. Run or rewrite the code example.
3. Answer the interview questions without looking.
4. Complete the exercise.
5. Revisit the matching file in \`0_Revision_Notes\` before interviews.
6. Build the capstones in order: CLI -> web app -> REST API -> realtime app -> production-ready API.

${sections}
`;
}

function notesWorkspaceFiles() {
  writeFile("0_Notes/README.md", `# Notes Workspace

Use this folder for planning and tracking Node.js backend study progress.

## Suggested Routine

1. Study one topic.
2. Run or rewrite the code example.
3. Summarize the topic in your own words.
4. Add doubts to \`doubtful_topics.md\`.
5. Revisit revision notes after 24 hours and again after one week.
`);

  writeFile("0_Notes/prompts.md", `# Node.js Study Prompts

Use these prompts with each topic:

* Explain this topic like a senior backend Node.js engineer mentoring a junior.
* Give me five production bugs caused by misunderstanding this topic.
* Turn this topic into interview questions with model answers.
* Give me a small project that forces me to use this concept.
* Review my implementation for correctness, security, performance, and operability.
`);

  writeFile("0_Notes/imp_links.md", `# Important Links

Official and high-signal references to check while studying:

* Node.js Docs: https://nodejs.org/api/
* Express Docs: https://expressjs.com/
* MongoDB Docs: https://www.mongodb.com/docs/
* Mongoose Docs: https://mongoosejs.com/docs/
* Jest Docs: https://jestjs.io/docs/getting-started
* Socket.io Docs: https://socket.io/docs/v4/
* Docker Docs: https://docs.docker.com/
`);

  writeFile("0_Notes/doubtful_topics.md", `# Doubtful Topics

Track topics that need another pass.

| Topic | Doubt | Next action |
| ----- | ----- | ----------- |
| Example | Why does this async handler hang? | Reproduce with a small script and inspect the event loop behavior. |
`);

  writeFile("0_Notes/study_progress_tracker.md", `# Study Progress Tracker

| Section | Topic | Status | Last revised | Notes |
| ------- | ----- | ------ | ------------ | ----- |
| 1_Foundation | Backend Node.js Roadmap | Not started | | |
`);

  writeFile("0_Notes/to_learn.md", `# To Learn

* Build each capstone from scratch.
* Read Node.js official docs for the core modules used in production.
* Practice explaining event loop, thread pool, cluster, and worker threads out loud.
* Add real project notes from your own backend work.
`);

  sourceImageGallery();
}

function assetsReadme() {
  writeFile("assets/README.md", `# Assets

## source_extract

Original images extracted from the shared Word documents.

* \`assets/source_extract/codeevolution_youtube\`: screenshots from \`codeEvolution-youtube.docx\`
* \`assets/source_extract/completenodedev\`: screenshots from \`completeNodeDev.docx\`

## diagrams

Curated study diagrams generated for these notes:

* Node.js runtime architecture
* Event loop phases
* Streams and backpressure
* Express request lifecycle
* JWT authentication flow
* Node.js scaling models
`);
}

function sourceIndex() {
  writeFile("source_extract/README.md", `# Source Extracts

This folder contains extracted text from the Word and PDF source files. The original downloads were not modified.

Use these extracts as raw reference material. The organized study notes live in the numbered topic folders.

Generated files:

* \`codeevolution_youtube.md\`
* \`revisionnotes_1.md\`
* \`youtube_code_evolution_advanced_js.md\`
* \`completenodedev.md\`
* \`2_1_pdf_guide_node_andrew_mead_v3.md\`
* \`manifest.json\`
`);
}

function naturalImageSort(a, b) {
  const ax = a.match(/\d+/);
  const bx = b.match(/\d+/);
  if (ax && bx) return Number(ax[0]) - Number(bx[0]);
  return a.localeCompare(b);
}

function sourceImageGallery() {
  const sections = [
    {
      title: "CodeEvolution YouTube Images",
      dir: "assets/source_extract/codeevolution_youtube",
    },
    {
      title: "Complete Node Developer Images",
      dir: "assets/source_extract/completenodedev",
    },
  ];

  const body = sections
    .map((section) => {
      const abs = path.join(root, section.dir);
      if (!fs.existsSync(abs)) return `## ${section.title}\n\nNo images extracted.`;

      const rows = fs
        .readdirSync(abs)
        .filter((file) => /\.(png|jpe?g|gif|webp)$/i.test(file))
        .sort(naturalImageSort)
        .map((file, index) => {
          const rel = `../${section.dir}/${file}`.replace(/\\/g, "/");
          return `### ${index + 1}. ${file}\n\n![${file}](${rel})`;
        })
        .join("\n\n");

      return `## ${section.title}\n\n${rows}`;
    })
    .join("\n\n---\n\n");

  writeFile("0_Notes/source_image_gallery.md", `# Source Image Gallery

This gallery links the original images extracted from the shared Word documents. The organized notes use curated diagrams in \`assets/diagrams\`, while this page preserves the original screenshot-style visuals for reference.

${body}
`);
}

function main() {
  writeDiagrams();
  for (const item of topics) {
    writeFile(path.join(item.folder, item.file), noteContent(item));
    writeFile(path.join("0_Revision_Notes", item.folder, item.file), revisionContent(item));
  }
  writeFile("README.md", readmeContent());
  notesWorkspaceFiles();
  assetsReadme();
  sourceIndex();
  console.log(`Generated ${topics.length} main notes and ${topics.length} revision notes.`);
}

main();
