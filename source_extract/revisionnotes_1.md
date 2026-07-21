# Extract: revisionnotes_1.docx

## 📌 path Module in Node.js

#### 🔹 What it is

The path module is a core Node.js module (no install needed).

It provides utilities for working with file and directory paths.

Handles differences between POSIX (Linux/macOS) and Windows path formats.

👉 Why important?
 Because hardcoding string paths ("folder/file.txt") breaks portability. path ensures consistent handling across platforms.

### 🔑 Commonly Used Methods

#### 1. path.join([...paths])

Joins all arguments into a normalized path.

Removes redundant slashes, handles . and ...

const path = require("path");

console.log(path.join("/users", "john", "docs"));

// '/users/john/docs' (POSIX)

// '\users\john\docs' (Windows)

#### 2. path.resolve([...paths])

Resolves a sequence of paths into an absolute path.

Starts from current working directory if no / or C: provided.

console.log(path.resolve("docs", "file.txt"));

// '/home/user/current/docs/file.txt' (POSIX)

console.log(path.resolve("/etc", "config"));

// '/etc/config'

💡 Interview trap:
 join just concatenates & normalizes → relative possible.
 resolve always returns absolute.

#### 3. path.isAbsolute(path)

Returns true if the path is absolute.

console.log(path.isAbsolute("/foo/bar")); // true

console.log(path.isAbsolute("foo/bar")); // false

#### 4. path.basename(path, [ext])

Gets the last portion of a path (filename).

console.log(path.basename("/users/john/file.txt")); // 'file.txt'

console.log(path.basename("/users/john/file.txt", ".txt")); // 'file'

#### 5. path.dirname(path)

Gets the directory name of a path.

console.log(path.dirname("/users/john/file.txt"));

// '/users/john'

#### 6. path.extname(path)

Returns the file extension.

console.log(path.extname("file.txt")); // '.txt'

console.log(path.extname("archive.tar.gz")); // '.gz'

#### 7. path.parse(path)

Returns an object with full path breakdown.

console.log(path.parse("/users/john/file.txt"));

/*

{

root: '/',

dir: '/users/john',

base: 'file.txt',

ext: '.txt',

name: 'file'

}

*/

#### 8. path.format(obj)

Opposite of parse. Creates a path string from an object.

const obj = {

dir: "/users/john",

name: "file",

ext: ".txt"

};

console.log(path.format(obj)); // '/users/john/file.txt'

#### 9. path.normalize(path)

Cleans up a messy path.

console.log(path.normalize("/users/john//docs/../file.txt"));

// '/users/john/file.txt'

#### 10. path.sep & path.delimiter

path.sep: OS-specific path separator (/ POSIX, \ Windows).

path.delimiter: Used in PATH env variable (: POSIX, ; Windows).

console.log(path.sep); // '/' or '\'

console.log(path.delimiter); // ':' or ';'

### 📌 Interview Angle

✅ Show that you know difference between join and resolve.

✅ Mention cross-platform support.

✅ Show how to parse/format paths safely instead of string manipulation.

✅ Know normalize for cleaning messy paths.

************

Nice one 👍 — interviewers love asking absolute vs relative path because many developers get confused when working with path or fs in Node.js.

## 📌 Absolute Path vs Relative Path in Node.js

### 🔹 Absolute Path

A path that always points to the same location in the file system.

Independent of the current working directory (process.cwd()).

On Linux/macOS → starts with /.

On Windows → starts with drive letter (C:\) or UNC path (\\server\share).

✅ Example:

const path = require("path");

console.log(path.isAbsolute("/users/john/file.txt")); // true (POSIX)

console.log(path.isAbsolute("C:\\users\\john\\file.txt")); // true (Windows)

No matter where you run your Node.js script, /users/john/file.txt points to the same file.

### 🔹 Relative Path

A path that is relative to a base location (usually the current working directory).

Depends on process.cwd() (where you run node from).

Does not start with / (POSIX) or C:\ (Windows).

✅ Example:

console.log(path.isAbsolute("docs/file.txt")); // false

console.log(path.resolve("docs/file.txt"));

// /home/you/current-working-dir/docs/file.txt

If you run your script from /home/you/projects,
 docs/file.txt → /home/you/projects/docs/file.txt.

### 🔑 Key Differences (Interview Style)

### ⚡ Pro Tip (Common Interview Trap)

__dirname → gives absolute path of the directory where the script is located.

process.cwd() → gives the absolute path of where Node.js was executed from.

console.log(__dirname); // /Users/john/project/src

console.log(process.cwd()); // /Users/john (if you ran `node project/src/app.js` from /Users/john)

👉 Interview Q: "Why use __dirname instead of relative paths in Node.js?"
 ✅ Because relative paths depend on where the script is run, but __dirname always resolves relative to the script file itself.

Would you like me to also prepare a set of tricky interview questions around paths (__dirname, __filename, process.cwd(), path.resolve, path.join) with ready answers?

***************

## 🔥 Node.js Path Interview Questions (with Answers)

#### Q1. What’s the difference between __dirname and process.cwd()?

__dirname → absolute path of the directory where the current script file resides.

process.cwd() → absolute path of the current working directory from where Node.js was started.

// File: /Users/john/project/src/app.js

console.log(__dirname); // /Users/john/project/src

console.log(process.cwd()); // /Users/john/project (if you ran `node src/app.js` from project root)

👉 Interview Tip: Always use __dirname when resolving file paths relative to the script location, not process.cwd().

#### Q2. Difference between path.join() and path.resolve()?

path.join([...paths]) → concatenates and normalizes.

Does not guarantee absolute path.

path.resolve([...paths]) → resolves into an absolute path.

If no root path is found, it uses process.cwd() as base.

console.log(path.join("users", "john"));

// 'users/john' (relative)

console.log(path.resolve("users", "john"));

// '/current/working/dir/users/john' (absolute)

#### Q3. Why is relative path (./file.txt) risky in Node.js apps?

Because relative paths depend on where the app is executed from, not where the file is.

Example:

// inside /project/src/app.js

const fs = require("fs");

// risky: may break if run from a different cwd

fs.readFileSync("./data.json");

// safe: always relative to this file

fs.readFileSync(path.join(__dirname, "data.json"));

👉 Always prefer __dirname with path.join().

#### Q4. How do you make your file paths cross-platform (Windows vs Linux)?

Use path.join() or path.resolve() instead of string concatenation ("/" + fileName").

Example:

const path = require("path");

const filepath = path.join("users", "john", "file.txt");

console.log(filepath);

// POSIX → 'users/john/file.txt'

// Windows → 'users\john\file.txt'

#### Q5. What does path.normalize() do?

It cleans up messy paths by removing redundant .. or ..

console.log(path.normalize("/users/john//docs/../file.txt"));

// '/users/john/file.txt'

#### Q6. How do you extract only the file name or extension from a path?

path.basename() → file name

path.extname() → file extension

const file = "/users/john/file.txt";

console.log(path.basename(file)); // file.txt

console.log(path.extname(file)); // .txt

#### Q7. How to ensure a path is absolute in Node.js before using it?

Use path.isAbsolute() or convert it with path.resolve().

if (!path.isAbsolute(myPath)) {

myPath = path.resolve(myPath);

}

#### Q8. Trick Question:

What is the difference between __filename and __dirname?

__filename → absolute path of the current file itself.

__dirname → absolute path of the folder containing the file.

console.log(__filename); // /users/john/project/src/app.js

console.log(__dirname); // /users/john/project/src

#### Q9. Real-world: How do you serve static files using path safely?

const express = require("express");

const path = require("path");

const app = express();

app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(3000);

👉 This ensures files are always loaded from the correct directory regardless of cwd.

#### Q10. What happens if you run this?

console.log(path.resolve("/foo", "bar", "../baz"));

Answer:

Start from /foo, add bar, then ../baz.

Result → /foo/baz

⚡ With these 10 questions + answers, you’re covered for path-related interview rounds.

👉 Do you want me to move next into fs module (closely tied with path in interviews), or do you prefer another Node.js topic?

*******************

### 🔑 Why do we need Buffers in Node.js?

JavaScript limitation

JavaScript (in browsers or Node) natively handles only strings (UTF-16 encoded).

It doesn’t have a built-in way to directly handle raw binary data (like images, videos, audio, or TCP streams).

Node.js low-level I/O

Node.js is built on top of libuv, which interacts with files, sockets, and streams.

These low-level operations deal with binary data (bytes), not just strings.

Example: Reading a file from disk or receiving packets over the network.

Buffer = Raw Binary Data Container

A Buffer is like an array of bytes (0–255 values).

It allows Node.js to handle raw data directly, instead of converting everything to strings.

### 📌 Example 1: Reading file as Buffer

const fs = require("fs");

fs.readFile("example.txt", (err, data) => {

if (err) throw err;

console.log(data); // <Buffer 48 65 6c 6c 6f>

console.log(data.toString()); // Hello

});

Raw buffer: <Buffer 48 65 6c 6c 6f> (hex values)

Convert to string: "Hello"

### 📌 Example 2: Creating Buffer manually

const buf = Buffer.from("Hello");

console.log(buf); // <Buffer 48 65 6c 6c 6f>

console.log(buf.toString()); // Hello

### 📌 Example 3: Buffers with Network

When you receive data from a TCP socket:

const net = require("net");

const server = net.createServer(socket => {

socket.on("data", chunk => {

console.log("Received buffer:", chunk);

console.log("As string:", chunk.toString());

});

});

server.listen(3000, () => console.log("Server running on 3000"));

The data arrives in buffers because it might not always align with text chunks.

### 📌 Key Benefits of Buffers

Efficient binary handling → handle images, videos, audio, zip files, etc.

Stream-based processing → data doesn’t need to load fully into memory.

Interoperability with C++ addons → Buffers make it possible to exchange binary data with native modules.

Encoding control → convert between encodings (UTF-8, Base64, Hex).

### 📌 Summary

Buffers in Node.js exist because JavaScript cannot handle binary data natively.

They are used whenever Node.js deals with file systems, streams, or network operations.

Think of a Buffer as a fixed-size chunk of raw memory outside V8’s heap, designed for fast binary manipulation.

**********

Awesome 👍 let’s dive into the fs (File System) module — another core Node.js module that is always paired with path in interviews.

## 📌 Node.js fs Module (File System)

#### 🔹 What it is

fs = File System module in Node.js.

Allows us to interact with files and directories.

Supports both synchronous and asynchronous (callback + Promise-based) APIs.

Async is preferred for performance (non-blocking).

### 🔑 Commonly Used Methods

#### 1. Reading a File

const fs = require("fs");

// Async (non-blocking)

fs.readFile("data.txt", "utf8", (err, data) => {

if (err) throw err;

console.log(data);

});

// Sync (blocking)

const data = fs.readFileSync("data.txt", "utf8");

console.log(data);

👉 Interview Tip: Prefer async fs.readFile in production.

#### 2. Writing to a File

// Async

fs.writeFile("output.txt", "Hello, world!", err => {

if (err) throw err;

console.log("File written successfully!");

});

// Sync

fs.writeFileSync("output.txt", "Hello again!");

#### 3. Appending to a File

fs.appendFile("output.txt", "\nNew line", err => {

if (err) throw err;

});

#### 4. Check if File Exists

fs.access("data.txt", fs.constants.F_OK, err => {

console.log(err ? "File does not exist" : "File exists");

});

#### 5. Deleting a File

fs.unlink("output.txt", err => {

if (err) throw err;

console.log("File deleted");

});

#### 6. Creating/Removing Directories

fs.mkdir("newDir", { recursive: true }, err => {

if (err) throw err;

console.log("Directory created");

});

Great question 👍 let’s unpack this carefully.

#### 🔹 What happens without { recursive: true }

fs.mkdir("newDir/innerDir", err => {

if (err) throw err;

});

👉 This will fail with an error if newDir doesn’t already exist, because Node.js by default expects the immediate parent folder to exist before creating the child.

#### 🔹 What happens with { recursive: true }

fs.mkdir("newDir/innerDir", { recursive: true }, err => {

if (err) throw err;

console.log("Directories created");

});

👉 Now Node.js will:

Check if newDir exists — if not, it creates it.

Then create innerDir inside it.

If any folder already exists, it won’t throw an error; it just continues.

#### ✅ Why we need recursive: true

To create nested directories in one call (e.g., "logs/2025/08/19").

To avoid errors if parent folders don’t exist.

To make the operation idempotent → calling it multiple times doesn’t break anything.

🔑 Interview answer:

We pass { recursive: true } to fs.mkdir() so Node.js automatically creates all missing parent directories, and doesn’t throw an error if some or all of them already exist. Without it, the operation fails unless the parent directory already exists.

Do you want me to also show the real-world case where this is critical (like creating logs/yyyy/mm/dd folders dynamically)?

________

fs.rmdir("newDir", err => {

if (err) throw err;

console.log("Directory removed");

});

#### 7. Reading a Directory

fs.readdir(".", (err, files) => {

if (err) throw err;

console.log(files); // [ 'file1.txt', 'file2.js', ... ]

});

#### 8. Watching Files

fs.watch("data.txt", (eventType, filename) => {

console.log(`File ${filename} changed: ${eventType}`);

});

👉 Used for real-time monitoring (like nodemon).

#### 9. Working with Streams

const readStream = fs.createReadStream("bigfile.txt", "utf8");

readStream.on("data", chunk => {

console.log("Received chunk:", chunk.length);

});

👉 Interview Tip: fs.createReadStream is preferred for large files to avoid loading everything into memory.

### 📌 Key Interview Questions & Answers

#### Q1. Difference between fs.readFile and fs.createReadStream?

fs.readFile: Loads the entire file into memory → bad for huge files.

fs.createReadStream: Reads file in chunks (streams) → scalable for big data.

#### Q2. Why prefer async fs methods over sync?

Sync methods (fs.readFileSync) block the event loop.

Async methods (fs.readFile) allow Node.js to handle other requests in parallel → better scalability.

#### Q3. How do you safely resolve file paths when using fs?

Always use path.join(__dirname, "file.txt") instead of "./file.txt".
 Reason: relative paths depend on process.cwd(), which may change.

#### Q4. How to handle JSON file read/write with fs?

const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

data.age = 30;

fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

#### Q5. What’s the difference between fs.existsSync and fs.access?

fs.existsSync → deprecated (blocking, race condition risk).

fs.access → modern way to check permissions/existence.

#### Q6. Real-world Example: Log Rotation

fs.rename("app.log", `app-${Date.now()}.log`, err => {

if (err) throw err;

});

****

Events

Perfect 👍 Now let’s cover the events module — this is one of the core Node.js fundamentals and comes up in almost every Node.js interview.

## 📌 Node.js events Module

#### 🔹 What it is

events is a core Node.js module.

Implements the Observer Pattern → objects (emitters) emit events, and listeners (subscribers) respond.

At its core is the EventEmitter class.

👉 Many Node.js modules (http, fs, net, stream) are built on top of EventEmitter.

### 📝 Example: Basic EventEmitter

const EventEmitter = require("events");

// Create emitter

const emitter = new EventEmitter();

// Register listener

emitter.on("greet", (name) => {

console.log(`Hello, ${name}!`);

});

// Emit event

emitter.emit("greet", "Veeramani");

Output:

Hello, Veeramani!

### 🔑 Commonly Used Methods

#### 1. Register an Event Listener

emitter.on("eventName", callback);

Multiple listeners can be attached to the same event.

#### 2. Emit (Trigger) an Event

emitter.emit("eventName", arg1, arg2);

#### 3. One-Time Listener

emitter.once("start", () => {

console.log("This will run only once");

});

emitter.emit("start");

emitter.emit("start"); // ignored

#### 4. Remove Listener

const handler = () => console.log("Will be removed");

emitter.on("removeMe", handler);

emitter.off("removeMe", handler); // removed

#### 5. Get Listener Info

console.log(emitter.listenerCount("greet")); // count listeners

console.log(emitter.eventNames()); // list of events

### 📌 Real-World Example: Server

const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {

res.writeHead(200, { "Content-Type": "text/plain" });

res.end("Hello World\n");

});

server.listen(3000, () => console.log("Server running..."));

👉 Here, the HTTP server is an EventEmitter that emits request, close, error, etc.

### 🏆 Common Interview Questions

#### Q1. Difference between on and once?

on: Registers a listener that runs every time the event is emitted.

once: Registers a listener that runs only the first time.

#### Q2. How is EventEmitter related to Streams?

Streams (fs.createReadStream, http.IncomingMessage) are EventEmitters.

They emit events like data, end, error.

#### Q3. What is the default max listener count?

Default = 10 listeners per event.

Helps prevent memory leaks.

Can be changed:

 emitter.setMaxListeners(20);

#### Q4. What design pattern does EventEmitter follow?

Observer Pattern (a.k.a. Pub/Sub).

Subject emits → Observers listen and react.

#### Q5. Real-world use case?

Logging System:

 const logger = new EventEmitter();

logger.on("log", msg => console.log("Log:", msg));

logger.emit("log", "User logged in");

logger.emit("log", "User clicked button");

***************

## 📌 Extending EventEmitter in Node.js

Sometimes you want your own class to emit and listen to events (just like HTTP server, streams, etc.).
 For this, you extend EventEmitter.

### 📝 Example: Custom Logger Class

const EventEmitter = require("events");

class Logger extends EventEmitter {

log(message) {

console.log("Logging:", message);

// Emit event after logging

this.emit("messageLogged", { message, timestamp: Date.now() });

}

}

const logger = new Logger();

// Subscribe to the event

logger.on("messageLogged", (data) => {

console.log("Listener received:", data);

});

// Call the method

logger.log("Hello, world!");

Output:

Logging: Hello, world!

Listener received: { message: 'Hello, world!', timestamp: 1692461187123 }

👉 Here:

Logger extends EventEmitter.

Inside log(), we emit an event.

Outside, we listen to that event.

### 🔑 Why do this?

It makes your custom classes event-driven.

Decouples logic → You don’t need to know who is listening.

Example: fs, http, net, stream are all built this way.

### 🏆 Advanced Interview Questions

#### Q1. Why extend instead of just using an EventEmitter instance?

If you extend, your class becomes event-capable (encapsulation).

If you just create an emitter inside, consumers can’t directly listen to your class methods.

#### Q2. Can you override emit or on?

Yes, but rarely done. Example: wrap emit to add logging or validation.

#### Q3. Real-World Scenario?

Chat Application

 class ChatRoom extends EventEmitter {

sendMessage(user, msg) {

this.emit("message", { user, msg, time: Date.now() });

}

}

const chat = new ChatRoom();

chat.on("message", data => console.log(`[${data.user}] ${data.msg}`));

chat.sendMessage("Alice", "Hello!");

chat.sendMessage("Bob", "Hi Alice!");

Database Connector

Emit "connected", "error", "disconnected" events for DB clients.

**********

Perfect 👌 Streams are one of the most important Node.js interview topics (especially for 10 years of experience).
 Let’s go deep into Readable & Writable Streams.

## 📌 Node.js Streams

Streams are data-handling objects in Node.js that let you work with data piece by piece (chunks) instead of loading the entire data into memory.

👉 Useful for:

Reading big files (fs.createReadStream)

Writing to files (fs.createWriteStream)

Handling network requests (HTTP, TCP)

Real-time processing (video/audio streaming)

### 🔹 1. Readable Streams

A Readable Stream lets you read data in chunks.

#### Example: Reading a file with createReadStream

const fs = require("fs");

// Create a readable stream

const readStream = fs.createReadStream("bigfile.txt", { encoding: "utf8" });

// Listen for data chunks

readStream.on("data", chunk => {

console.log("Received chunk:", chunk.length);

});

// When finished

readStream.on("end", () => {

console.log("Finished reading file.");

});

👉 Instead of loading the whole file, it reads chunk by chunk (default chunk size = 64KB).

### 🔹 2. Writable Streams

A Writable Stream lets you write data in chunks.

#### Example: Writing to a file with createWriteStream

const fs = require("fs");

const writeStream = fs.createWriteStream("output.txt");

writeStream.write("Hello ");

writeStream.write("World!\n");

// Must close after writing

writeStream.end();

writeStream.on("finish", () => {

console.log("File writing completed.");

});

👉 Data is written incrementally, avoiding memory overflow.

### 🔹 3. Piping (Readable → Writable)

We can pipe one stream into another (common in interviews 🚀).

const fs = require("fs");

const readStream = fs.createReadStream("bigfile.txt");

const writeStream = fs.createWriteStream("copy.txt");

// Directly pipe data

readStream.pipe(writeStream);

writeStream.on("finish", () => {

console.log("File copied successfully!");

});

👉 Used in file transfers, HTTP responses, etc.

### 🔹 4. Duplex & Transform Streams

Duplex: Both Readable + Writable (e.g., TCP sockets).

Transform: Duplex + modifies data while passing (e.g., zlib compression).

#### Example: Transform (Uppercase)

const { Transform } = require("stream");

const upperCaseTransform = new Transform({

transform(chunk, encoding, callback) {

this.push(chunk.toString().toUpperCase());

callback();

}

});

process.stdin.pipe(upperCaseTransform).pipe(process.stdout);

👉 Typing input in terminal → gets converted to uppercase in real-time.

### 🔑 Interview Q&A

#### Q1. Difference between readFile and createReadStream?

fs.readFile → Loads whole file in memory (bad for large files).

createReadStream → Loads data in chunks (scalable).

#### Q2. What is backpressure in streams?

Happens when Readable produces data faster than Writable can consume.

Example: Fast file read but slow network write.

Node handles this via pause() and resume() automatically in .pipe().

#### Q3. When to use Writable streams directly vs. pipe?

Directly (with write) → when you need custom logic between chunks.

.pipe() → when you want automatic flow control (handles backpressure).

#### Q4. Real-world Uses

File uploads/downloads

Streaming videos (YouTube, Netflix)

Log rotation

Compressing files with zlib.createGzip()

Sending responses in http.ServerResponse (Writable stream)

🔥 Excellent question — this comes up often in Node.js interviews because both Buffers and Streams deal with binary data. Let’s break it down:

## 📌 Buffer vs. Stream in Node.js

#### 🔹 Buffer

A Buffer is like a container of raw binary data.

It holds the entire chunk of data in memory before you use it.

Best when data size is small to medium and can comfortably fit in memory.

👉 Example (reading whole file into Buffer):

const fs = require("fs");

fs.readFile("bigfile.txt", (err, data) => {

if (err) throw err;

console.log("Buffer length:", data.length);

});

Here, the whole file content is loaded into memory → stored in a Buffer.

#### 🔹 Stream

A Stream processes data chunk by chunk.

You don’t wait for the whole file → start consuming as soon as chunks arrive.

Perfect for huge files or real-time data (video/audio).

👉 Example (using createReadStream):

const fs = require("fs");

const readStream = fs.createReadStream("bigfile.txt");

readStream.on("data", chunk => {

console.log("Chunk size:", chunk.length);

});

readStream.on("end", () => {

console.log("Finished reading file.");

});

Here, the file is split into small Buffers that are streamed sequentially.

## ✅ Why use Streams if Buffers exist?

Memory Efficiency 🧠

Buffer: Loads entire data → can cause out-of-memory for huge files.

Stream: Uses fixed-size chunks (default 64KB) → low memory footprint.

Example:

5 GB video file → Buffer ❌ (crash likely)

5 GB video file → Stream ✅ (read in chunks smoothly)

Performance (Speed) ⚡

Buffer: Wait until everything is loaded before processing.

Stream: Start processing immediately while data is still coming in.

👉 That’s why Netflix/YouTube can start playing instantly without waiting for full download.

Scalability 🚀

Buffers work fine for small JSON, configs, logs.

Streams are critical for production apps handling TBs of logs, videos, or file uploads.

## Interview-Style Answer

👉 “Buffers are used to hold binary data in memory, usually when the dataset is small and manageable. Streams, on the other hand, allow us to work with data incrementally in chunks, making them more memory-efficient and suitable for large or continuous data sources like files, video, or network sockets. Internally, Streams still use Buffers, but Streams give us a way to consume Buffers progressively without loading everything into memory at once.”

**********

Http

Awesome 👍 let’s dive into another core Node.js module:

## 🌍 Node.js http Module

### 🔹 What it is

The http module lets you create servers and clients in Node.js.

Node is built around event-driven, non-blocking I/O, and the http module is at its heart.

It powers frameworks like Express.js (which is just a wrapper around http).

### 🔑 Creating an HTTP Server

const http = require("http");

const server = http.createServer((req, res) => {

res.writeHead(200, { "Content-Type": "text/plain" });

res.end("Hello, World!");

});

server.listen(3000, () => {

console.log("Server running at http://localhost:3000/");

});

👉 Breakdown:

http.createServer() → creates a server object.

(req, res) → request & response objects.

res.writeHead() → set status code + headers.

res.end() → send response & close connection.

### 🔑 Making an HTTP Request (Client)

const http = require("http");

const options = {

hostname: "jsonplaceholder.typicode.com",

path: "/todos/1",

method: "GET"

};

const req = http.request(options, res => {

let data = "";

res.on("data", chunk => {

data += chunk;

});

res.on("end", () => {

console.log("Response:", data);

});

});

req.on("error", err => {

console.error(err);

});

req.end();

👉 Here, Node acts as an HTTP client, fetching data from an API.

### 🔑 Important Interview Concepts

#### 1. Request & Response are Streams

req → Readable stream (incoming data).

res → Writable stream (send data to client).

Example: Handling POST body

const server = http.createServer((req, res) => {

if (req.method === "POST") {

let body = "";

req.on("data", chunk => {

body += chunk.toString();

});

req.on("end", () => {

console.log("Received:", body);

res.writeHead(200, { "Content-Type": "application/json" });

res.end(JSON.stringify({ message: "Data received" }));

});

}

});

#### 2. HTTP Methods & Routing

Basic routing without Express:

const server = http.createServer((req, res) => {

if (req.url === "/" && req.method === "GET") {

res.end("Welcome to Home");

} else if (req.url === "/about" && req.method === "GET") {

res.end("About Page");

} else {

res.writeHead(404);

res.end("Not Found");

}

});

#### 3. Streaming Response (large files)

const fs = require("fs");

const server = http.createServer((req, res) => {

const stream = fs.createReadStream("bigfile.mp4");

res.writeHead(200, { "Content-Type": "video/mp4" });

stream.pipe(res);

});

👉 Instead of loading the whole file into memory (Buffer), we stream it.

#### 4. HTTP vs HTTPS

http = unencrypted (port 80).

https = secure (port 443), requires TLS/SSL cert → https module.

#### 5. Performance Note

For real-world apps:

Use Express.js, Fastify, NestJS → they build on http but add routing, middlewares, etc.

Still, interviewers often test raw http knowledge to check fundamentals.

### 🔑 Interview-Style Q&A

Q1: How does Node handle multiple HTTP requests at once?
 👉 Node uses an event loop + non-blocking I/O. Each request runs asynchronously, so Node can handle thousands of connections without creating threads.

Q2: What’s the difference between http.createServer() and Express?
 👉 Express is a wrapper around http with routing, middleware, and request parsing built-in.

Q3: Why is req a readable stream and res a writable stream?
 👉 Incoming request body → read in chunks (Readable). Response → written to client (Writable).

Q4: How would you serve static files without Express?
 👉 Use fs.readFile or fs.createReadStream with res.writeHead for content-type.

## How Node.js Handles Multiple HTTP Requests at Once

Unlike traditional web servers (Apache, Java-based servers) that use multi-threading for each request, Node.js uses a single-threaded event loop with non-blocking I/O.

### 🔑 Step-by-Step Flow

Single Thread for JS Execution

Node runs JavaScript in a single thread.

But that does not mean it can handle only one request at a time.

Event Loop + Callback Queue

Requests come in → placed into the event loop.

CPU-bound JS executes immediately.

I/O-bound tasks (file read, DB query, API call) are sent to libuv’s thread pool / OS kernel.

Non-Blocking I/O

While waiting for I/O (like DB query), the event loop is free to handle new requests.

When I/O completes, the callback is pushed to the event loop for execution.

### 🔑 Example (Blocking vs Non-blocking)

#### ❌ Blocking (Bad for Node)

const http = require("http");

const fs = require("fs");

http.createServer((req, res) => {

// Blocking - waits for entire file read

const data = fs.readFileSync("bigfile.txt", "utf-8");

res.end(data);

}).listen(3000);

👉 While one request is reading the file, all other requests are blocked.

#### ✅ Non-Blocking (Recommended)

const http = require("http");

const fs = require("fs");

http.createServer((req, res) => {

// Non-blocking - streams file

const stream = fs.createReadStream("bigfile.txt");

stream.pipe(res);

}).listen(3000);

👉 Here, file is streamed → event loop stays free to handle other requests simultaneously.

### 🔑 Visualization

Request A → Asks DB for data → Node sends it to thread pool.

Request B → Reads a file → Node streams it.

Request C → Pure computation (JS execution).

👉 While A & B are waiting for I/O, C is processed. When A & B complete, their callbacks rejoin the event loop.

### 🔑 Key Points for Interview

Node.js handles thousands of concurrent connections using event loop + non-blocking I/O.

Heavy I/O-bound tasks → perfect for Node.

Heavy CPU-bound tasks (encryption, image processing) → block event loop ❌.

Solution: use Worker Threads or child_process for CPU-heavy jobs.

### ✅ Interview-Ready Answer

👉
 "Node.js handles multiple HTTP requests concurrently using a single-threaded event loop combined with non-blocking I/O. Instead of spawning a new thread per request, Node delegates I/O tasks (like file access, DB queries, or network calls) to the underlying libuv thread pool or OS. While I/O operations are in progress, the event loop remains free to handle new incoming requests. This makes Node extremely efficient for I/O-heavy applications. However, for CPU-bound tasks, we need worker threads or clustering to avoid blocking the event loop."

⚡ Do you want me to also explain Event Loop Phases (timers, I/O callbacks, check, close) with an interview diagram? That’s usually the follow-up question to this.

Perfect 👍 This is the heart of Node.js and one of the most asked interview topics.
 Let’s break down the Event Loop phases clearly.

## ⚡ Node.js Event Loop Phases (Deep Dive)

👉 Node.js is built on libuv, which provides the event loop mechanism.
 The event loop is what allows Node.js to handle non-blocking I/O and multiple requests concurrently.

### 🔑 Big Picture

Node.js has 1 main thread for JavaScript execution.

Behind the scenes, libuv manages an event loop with multiple queues (phases).

Each request/task is placed into one of these queues, and the event loop runs them in order.

### 📌 Phases of Event Loop

The event loop runs in cycles (ticks). Each cycle has multiple phases:

#### 1. Timers Phase

Executes callbacks scheduled by setTimeout() and setInterval().

Example:

 setTimeout(() => console.log("Timer callback"), 0);

#### 2. Pending Callbacks Phase

Executes I/O callbacks that were deferred (errors from TCP, DNS, etc.).

#### 3. Idle, Prepare (internal)

Used internally by Node/libuv. (Not usually asked in interviews).

#### 4. Poll Phase

The heart of the event loop.

Retrieves new I/O events (file read, network request).

If no timers are ready → stays in poll phase, waiting for I/O.

Example:

 const fs = require("fs");

fs.readFile("file.txt", () => console.log("File read done"));

#### 5. Check Phase

Executes callbacks scheduled by setImmediate().

Example:

 setImmediate(() => console.log("Immediate callback"));

#### 6. Close Callbacks Phase

Executes close event callbacks.

Example:

 const net = require("net");

const server = net.createServer();

server.on("close", () => console.log("Server closed"));

server.close();

### 🔑 Special Queues

#### 1. Microtask Queue

Holds:

process.nextTick()

Promises (.then, catch, finally)

Always executed immediately after the current operation, before moving to next phase.

👉 Priority order:

process.nextTick() > Promises > Event Loop phases

### 📌 Example to Understand Execution Order

setTimeout(() => console.log("setTimeout"), 0);

setImmediate(() => console.log("setImmediate"));

Promise.resolve().then(() => console.log("Promise"));

process.nextTick(() => console.log("nextTick"));

👉 Output order:

nextTick

Promise

setTimeout // or setImmediate (depends on system)

setImmediate // or setTimeout

(Why? Because microtasks (nextTick, Promises) always run before event loop continues.)

### ✅ Interview-Ready Answer

👉
 "The Node.js event loop has multiple phases: timers, pending callbacks, poll, check, and close callbacks. Timers execute setTimeout/setInterval, poll waits for I/O, check executes setImmediate, and close handles resource cleanup. In addition, Node has a microtask queue for process.nextTick() and Promises, which always execute before moving to the next phase. This design allows Node.js to handle thousands of concurrent requests in a single thread using non-blocking I/O."

⚡ Would you like me to also create a diagram with arrows showing flow (Timers → Pending → Poll → Check → Close, with Microtasks in between)? That’s the exact thing interviewers love.

__________

Awesome 👍 you’ve reached one of the most important hidden parts of Node.js internals → Thread Pool.
 This is where many senior-level interviewers drill deeper.

## ⚡ Node.js Thread Pool (libuv)

#### 🔹 What it is

Node.js runs JavaScript in a single thread, but not all work is done there.

For blocking I/O tasks, Node.js uses a Thread Pool managed by libuv.

By default → 4 threads (can be increased with UV_THREADPOOL_SIZE env variable, up to 128).

👉 So Node.js is single-threaded for JS, but multi-threaded under the hood for I/O.

### 📌 Which tasks go to the Thread Pool?

These are heavy / blocking tasks offloaded from the main thread:

File system operations (fs.readFile, fs.writeFile, fs.readdir …)
 → Disk I/O is blocking, so done in thread pool.

DNS lookups (if not using OS-level resolver).

Compression / Crypto

crypto.pbkdf2, crypto.scrypt, crypto.randomBytes

zlib (gzip, deflate, etc.)

User code using worker threads

👉 Network I/O (HTTP requests, sockets) usually does NOT use thread pool, because those are handled by OS kernel and event loop (epoll, kqueue, IOCP).

### 📌 Example: fs.readFile using Thread Pool

const fs = require("fs");

console.log("Start");

fs.readFile("bigfile.txt", "utf8", (err, data) => {

if (err) throw err;

console.log("File read done"); // Runs after thread pool finishes work

});

console.log("End");

🔎 Here:

fs.readFile → goes to thread pool worker

Worker thread reads file → when done, posts result back to Event Loop → callback queue

JS callback executes on main thread

### 📌 Thread Pool Size

By default, Node.js has 4 threads in the pool.
 You can increase it if your app does lots of heavy I/O:

UV_THREADPOOL_SIZE=8 node app.js

👉 Example: If you run 100 fs.readFile calls at once:

With default pool (4) → only 4 run in parallel, others wait in queue.

With 8 threads → 8 can run at once, reducing latency.

### 📌 Thread Pool vs Event Loop

### 📌 Interview Q&A

#### Q1. If Node.js is single-threaded, how does it handle multiple requests?

👉 Node.js uses non-blocking I/O + thread pool.
 The event loop handles lightweight async tasks, and heavy/blocking work is pushed to the libuv thread pool.

#### Q2. What happens if your thread pool size is too small?

👉 Heavy I/O tasks queue up → requests slow down.
 You can tune performance with UV_THREADPOOL_SIZE.

#### Q3. Does HTTP request use thread pool?

👉 No. HTTP I/O is handled by the OS kernel (epoll, kqueue, IOCP), so it does not block the event loop.
 Only DNS lookups (if not native) may use thread pool.

✅ So, the Thread Pool is the hidden worker army that lets Node.js remain "single-threaded" for JS, while still scaling for heavy tasks.

Would you like me to next explain Worker Threads module (the true multi-threading in Node.js beyond the libuv thread pool)? This usually comes up right after thread pool in senior interviews.

***************

Great question 🚀 — the cluster module is one of those advanced Node.js concepts that interviewers love to ask when discussing scalability and performance.

Let’s break it down step by step.

## ⚡ Node.js cluster Module

#### 🔹 What Problem Does It Solve?

Node.js runs single-threaded JavaScript on the event loop.

On a multi-core machine, a single Node process only uses one CPU core.

The cluster module allows you to spawn multiple worker processes (copies of your app) to take advantage of multiple CPU cores.

These workers all share the same server port.

👉 Think of it as load balancing across multiple Node processes.

### 📌 Example: Simple Cluster Setup

const cluster = require("cluster");

const http = require("http");

const os = require("os");

if (cluster.isMaster) {

// Master process

console.log(`Master ${process.pid} is running`);

// Fork workers = number of CPU cores

const numCPUs = os.cpus().length;

for (let i = 0; i < numCPUs; i++) {

cluster.fork();

}

// Listen for workers exiting

cluster.on("exit", (worker, code, signal) => {

console.log(`Worker ${worker.process.pid} died. Restarting...`);

cluster.fork(); // Auto restart

});

} else {

// Worker processes

http.createServer((req, res) => {

res.writeHead(200);

res.end(`Hello from Worker ${process.pid}\n`);

}).listen(3000);

console.log(`Worker ${process.pid} started`);

}

Run:

node cluster.js

👉 If you hit http://localhost:3000 multiple times, different workers (process.pid) will serve requests.

### 📌 How It Works

Master process: responsible for creating and managing workers.

Worker processes: run your server logic.

IPC (Inter-Process Communication): Workers communicate with the master using messages.

### 📌 Benefits

Utilizes all CPU cores instead of just one.

Improves throughput for CPU-intensive tasks.

Built-in worker restart on crash → improves reliability.

### 📌 Limitations

Workers are separate processes → they don’t share memory.

If you need shared state, you must use:

Databases (Redis, MongoDB, etc.)

Or IPC messaging.

Not a silver bullet — best for parallelizing requests, not for sharing large memory caches.

### 📌 Real-World Usage

PM2 (popular Node.js process manager) uses clustering internally.

Used in high-traffic APIs (e.g., serving 10k+ concurrent requests).

### 📌 Interview Q&A

#### Q1. Why do we need the cluster module if Node.js is non-blocking?

Non-blocking I/O handles many requests per second, but CPU-bound tasks (like encryption, image processing) still block a single thread.

Clustering allows multiple CPU cores to handle requests in parallel.

#### Q2. Difference between cluster and worker_threads?

cluster: creates separate processes, each with its own event loop & memory.

worker_threads: creates threads inside the same process, can share memory via SharedArrayBuffer.

Use cluster for scaling servers across CPUs, use worker_threads for parallelizing CPU-heavy tasks.

#### Q3. How does load balancing work in Node.js cluster?

On Linux: master uses round-robin (default).

On Windows: OS decides which worker gets the connection.

✅ In short:

cluster = scale Node.js apps across multiple cores.

worker_threads = run parallel JavaScript inside one process.

👉 Do you want me to also show you a real-world Express.js + cluster example, where clustering actually improves API performance?

**************

Perfect timing 👌 — after cluster, the next natural thing is worker_threads.
 This is one of the most advanced Node.js topics interviewers test to see if you understand CPU-bound tasks vs. I/O-bound tasks.

## ⚡ Node.js worker_threads Module

#### 🔹 Why do we need it?

Node.js is single-threaded (only one JavaScript thread).

Event loop is great for I/O tasks (network calls, DB queries), but CPU-heavy tasks (hashing, compression, image processing, JSON parsing, ML models) will block the main thread.

To fix this, we use worker_threads → they allow us to run multiple threads inside the same Node.js process.

👉 Unlike cluster, workers are lightweight threads, not separate processes.

### 📌 Example: Basic Worker Thread

const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

if (isMainThread) {

console.log("Main thread running");

// Create a worker thread

const worker = new Worker(__filename, { workerData: { num: 40 } });

worker.on("message", result => {

console.log("Result from worker:", result);

});

worker.on("error", err => {

console.error("Worker error:", err);

});

worker.on("exit", code => {

console.log("Worker exited with code", code);

});

} else {

// Worker thread code

const { num } = workerData;

// CPU-intensive task (fibonacci)

function fib(n) {

return n < 2 ? n : fib(n - 1) + fib(n - 2);

}

const result = fib(num);

parentPort.postMessage(result);

}

Run:

node worker.js

👉 The main thread stays free, while the worker thread crunches Fibonacci.

### 📌 Key Points

isMainThread → check if code is running in main or worker.

workerData → data passed when creating worker.

parentPort → communication channel between main thread and worker.

### 📌 When to Use worker_threads?

✅ CPU-heavy tasks (hashing, compression, crypto, image/video processing).

❌ Not needed for async I/O tasks (DB queries, HTTP calls) → event loop is enough.

### 📌 worker_threads vs. cluster

### 📌 Real-world Example: Hashing

const { Worker } = require("worker_threads");

function runWorker(data) {

return new Promise((resolve, reject) => {

const worker = new Worker("./hashWorker.js", { workerData: data });

worker.on("message", resolve);

worker.on("error", reject);

});

}

(async () => {

console.time("hash");

const results = await Promise.all([

runWorker("password1"),

runWorker("password2"),

runWorker("password3"),

]);

console.timeEnd("hash");

console.log(results);

})();

👉 Each password is hashed in parallel, using multiple threads.

### 📌 Interview Q&A

#### Q1. When would you choose worker_threads over cluster?

Use worker_threads for CPU-intensive tasks (inside the same process).

Use cluster for scaling HTTP servers across multiple CPU cores.

#### Q2. Can workers share memory?

Yes ✅, using SharedArrayBuffer and Atomics.

Useful for shared caches or real-time apps.

#### Q3. Are worker_threads async?

Yes, they run in parallel but communicate via events/messages.

✅ In short:

cluster = multiple Node.js processes (scale servers).

worker_threads = multiple threads in same process (parallel CPU work).

👉 Do you want me to also give you a combined example (cluster + worker_threads), showing how they can work together for a high-performance API server?

Got it 👍. You’ve already covered a lot of Node.js internals (great for interviews at 10 yrs exp). Let me give you a map of all important topics, and I’ll check which ones you’ve done vs. which are still left.

## ✅ Node.js Interview Topics Checklist

#### 🔹 Core Modules

Path module (absolute vs. relative paths)

fs (mkdir, recursive, createReadStream, write streams)

Events (EventEmitter, custom events)

HTTP (creating servers, request/response, headers)

#### 🔹 Streams & Buffers

Buffer (binary data)

Readable / Writable Streams

Why streams if buffer exists

#### 🔹 Event Loop & Async Model

Event Loop phases (timers, poll, check, microtask queue)

How Node handles multiple HTTP requests

Thread pool (libuv + async I/O)

#### 🔹 Concurrency & Parallelism

Cluster module (scale across cores with multiple processes)

Worker Threads (parallel CPU-heavy tasks in one process)

#### 🔹 CLI Tools

CLI basics (using process.argv, commander.js, chalk, etc.)

#### 🔹 Advanced & Missing Topics (still left to cover)

Child Processes

Difference from worker_threads & cluster

Methods: exec, spawn, fork

Use case: running shell commands, scripts

Process Object

process.env, process.exit, process.cwd, process.memoryUsage

Environment variables (config mgmt)

Timers

setTimeout, setInterval, setImmediate, process.nextTick differences

Error Handling

Sync vs. Async error handling

try/catch, error event, domain, uncaughtException

Modules & Require System

CommonJS vs. ES Modules in Node.js

require caching mechanism

Networking

TCP/UDP servers with net and dgram modules

WebSockets

Security

Preventing DOS with clusters

Input sanitization

Using helmet, rate-limiting, avoiding memory leaks

Performance

Streams vs Buffers (efficiency)

cluster + worker_threads hybrid model

async_hooks module for profiling

Node.js with Databases

Async DB drivers (MongoDB, PostgreSQL, Redis)

Connection pooling

Package Management

npm vs yarn vs pnpm

package.json fields (dependencies, peerDependencies, scripts)

Testing

Mocha, Jest, Supertest for API testing

Deployment & Scaling

PM2 process manager

Dockerizing Node.js apps

Load balancing

👉 So far, you’ve nailed ~70% of the core backend interview questions.
 The main gap is:

Child processes vs worker_threads vs cluster

process object utilities

module system (require vs import)

advanced error handling

networking (TCP/UDP/WebSockets)

Would you like me to start with "child_process module" next, since it’s directly related to cluster and worker_threads (and often confused in interviews)?

Perfect 👌 this is one of the most commonly confused interview topics in Node.js. Let’s break it down step by step with comparisons, diagrams, and use cases.

## ⚡ Child Processes vs Worker Threads vs Cluster in Node.js

### 🔹 1. Child Processes

Created using the child_process module (spawn, exec, fork).

Each child process has its own memory, V8 instance, and event loop.

Communication happens via IPC (Inter-Process Communication) → child.send() & process.on("message").

Can run any program/script, not just Node.js code.

✅ Use cases

Running shell commands (ls, git, ffmpeg)

Executing another Node.js script separately

Heavy CPU tasks offloaded to another process

📌 Example

const { fork } = require("child_process");

const child = fork("child.js");

child.on("message", msg => {

console.log("Parent got:", msg);

});

child.send({ hello: "world" });

### 🔹 2. Worker Threads

Introduced in Node.js v10.5 (stable in v12+).

Run within the same process, but in separate threads.

Share memory (via SharedArrayBuffer) unlike child processes.

Lower overhead than spawning processes → more lightweight.

Great for CPU-bound tasks (e.g., image processing, crypto, ML).

✅ Use cases

Parallel computation

Data parsing

Image/video processing

📌 Example

const { Worker } = require("worker_threads");

const worker = new Worker(`

const { parentPort } = require("worker_threads");

let sum = 0;

for (let i = 0; i < 1e9; i++) sum += i;

parentPort.postMessage(sum);

`, { eval: true });

worker.on("message", result => console.log("Result:", result));

### 🔹 3. Cluster Module

Built on child_process.fork().

Creates multiple Node.js processes (workers) sharing the same server port.

Used for scaling across CPU cores (since Node.js is single-threaded by default).

Each worker has its own event loop & memory → not lightweight like worker_threads.

✅ Use cases

Scaling HTTP servers to handle more requests

Making full use of multi-core CPUs

📌 Example

const cluster = require("cluster");

const http = require("http");

const os = require("os");

if (cluster.isMaster) {

const numCPUs = os.cpus().length;

for (let i = 0; i < numCPUs; i++) cluster.fork();

} else {

http.createServer((req, res) => {

res.end(`Handled by worker ${process.pid}`);

}).listen(3000);

}

## 🔄 Key Differences (Interview Table)

## Quick Interview Q&A

Q1. Why not just use cluster instead of worker_threads?
 👉 Because cluster is for scaling I/O-bound web servers, while worker_threads is for CPU-heavy calculations.

Q2. Difference between fork() and cluster?
 👉 cluster is built on top of fork(), but it automatically manages multiple workers and can distribute requests across them.

Q3. When to use child_process over worker_threads?
 👉 Use child_process when you need to run another program/script, not just share CPU work within Node.js.

✅ So:

Child Process → run external programs or isolate tasks.

Worker Threads → parallel CPU-heavy tasks in the same process.

Cluster → scale Node.js HTTP servers across CPU cores.

Would you like me to now show a real-world scenario combining all three (like: cluster for HTTP scaling, worker_threads for CPU-heavy tasks, and child_process for shell commands)? That’s a killer interview answer.

************

Great 👍 The process object in Node.js is a global object that gives information about the current Node process and provides utilities to control it.

This is a very common interview topic for senior Node.js developers, so let’s go deep.

## ⚡ process Object in Node.js

Available globally (no require needed).

Provides info about environment, arguments, runtime, memory, events.

Helps in managing execution, exiting gracefully, and interacting with OS.

### 🔑 Important Utilities in process

#### 1. Process Information

process.pid → Current process ID

process.ppid → Parent process ID

process.version → Node.js version

process.platform → OS platform ('win32', 'linux', 'darwin')

process.arch → CPU architecture ('x64', 'arm', etc.)

📌 Example:

console.log("PID:", process.pid);

console.log("Platform:", process.platform);

#### 2. Process Arguments

process.argv → Command-line arguments (array).

First two are node path & script path.

📌 Example:

node app.js hello world

console.log(process.argv);

// ["nodePath", "app.js", "hello", "world"]

#### 3. Environment Variables

process.env → Access system environment variables.

Used for configs, secrets, DB connections.

📌 Example:

console.log(process.env.NODE_ENV); // "development" or "production"

#### 4. Process Exit

process.exit([code]) → Ends process.

0 = success, 1 (or others) = failure.

📌 Example:

if (!process.env.DB_HOST) {

console.error("DB_HOST missing!");

process.exit(1);

}

#### 5. Standard Input / Output (I/O)

process.stdin → Read input from terminal.

process.stdout → Write output to terminal.

process.stderr → Error stream.

📌 Example:

process.stdout.write("Hello from stdout\n");

process.stderr.write("Error message\n");

#### 6. Current Working Directory

process.cwd() → Returns current directory.

process.chdir(path) → Changes directory.

📌 Example:

console.log("Current dir:", process.cwd());

process.chdir("..");

console.log("New dir:", process.cwd());

#### 7. Memory & Resource Usage

process.memoryUsage() → Heap, RSS, external memory.

process.cpuUsage() → CPU usage in microseconds.

📌 Example:

console.log(process.memoryUsage());

#### 8. Events

process.on("exit", callback) → Called before exit.

process.on("uncaughtException", callback) → Handle errors not caught.

process.on("SIGINT", callback) → Ctrl+C signal.

📌 Example:

process.on("SIGINT", () => {

console.log("Graceful shutdown");

process.exit(0);

});

#### 9. High-resolution Timer

process.hrtime() → High-precision timer (nanoseconds).

Useful for performance measurement.

📌 Example:

const start = process.hrtime();

// some heavy operation

const diff = process.hrtime(start);

console.log(`Execution time: ${diff[0]}s ${diff[1] / 1e6}ms`);

#### 10. Uptime

process.uptime() → How long process has been running (seconds).

📌 Example:

setTimeout(() => {

console.log("Uptime:", process.uptime());

}, 2000);

## 📌 Quick Interview Summary

👉 The process object provides utilities to:

Access environment variables (process.env)

Manage CLI arguments (process.argv)

Control execution (process.exit, process.kill)

Handle streams (stdin, stdout, stderr)

Monitor performance (memoryUsage, hrtime)

Handle events (exit, uncaughtException, SIGINT)

✅ For 10+ years’ experience, interviewers might also ask:

Difference between process.nextTick() vs setImmediate() (both are microtask vs macrotask in event loop).

How to gracefully shut down a Node.js server using process.on('SIGTERM').

Do you want me to also explain process.nextTick() vs setImmediate() in detail with event loop phases? That’s another classic follow-up.

*********

Perfect 🚀 — this is one of the most common Node.js interview topics nowadays because candidates are expected to understand CommonJS (require) vs ES Modules (import/export).

Let’s break it down step by step:

## 📌 Module Systems in Node.js

Node.js supports two main module systems:

CommonJS (CJS) → require, module.exports

ES Modules (ESM) → import, export

### 🔹 1. CommonJS (CJS)

Default module system in Node.js (before ES6).

Synchronous — modules are loaded at runtime (when code executes).

Uses require to import and module.exports / exports to export.

📌 Example:

// math.js

function add(a, b) {

return a + b;

}

module.exports = { add };

// app.js

const math = require('./math');

console.log(math.add(2, 3));

👉 Key features:

Synchronous loading (good for server-side, not for browsers).

File extension .cjs explicitly enforces CommonJS (optional).

### 🔹 2. ES Modules (ESM)

Modern JS standard (introduced in ES6).

Asynchronous & statically analyzable (tree-shaking possible).

Uses import and export.

📌 Example:

// math.mjs

export function add(a, b) {

return a + b;

}

// app.mjs

import { add } from './math.mjs';

console.log(add(2, 3));

👉 Key features:

Static imports → better optimization.

Must use .mjs extension or set "type": "module" in package.json.

Works in both Node.js and browsers.

### 🔑 Differences Between require and import

### 🔹 Mixing CommonJS and ESM

Sometimes projects need both.

To use CJS inside ESM:

import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const fs = require('fs');

To use ESM inside CJS:

(async () => {

const { readFile } = await import('fs/promises');

const data = await readFile('./file.txt', 'utf-8');

console.log(data);

})();

### 📌 Interview-Style Summary

👉 “Node.js originally used CommonJS (require) which loads modules synchronously at runtime. ES Modules (import/export) were introduced later for compatibility with modern JavaScript, providing static imports, tree-shaking, and better optimization. In Node.js today, both systems are supported, but ESM is the future standard.”

⚡ For a 10+ years candidate, you’ll likely be asked:

Why ESM is preferred in modern Node.js apps? (Answer: static imports, async loading, tree-shaking, browser compatibility).

Can we mix require and import? How? (Answer: yes, using createRequire or dynamic import).

Performance difference? (CJS sync vs ESM async).

Would you like me to also create a real-world migration example (converting a project from CommonJS → ES Modules) since that’s a common senior-level interview question?

**************

advanced error handling

Great choice 👌 — error handling is one of the most important topics for senior-level Node.js interviews.

Let’s break down advanced error handling in Node.js step by step.

## 🔹 Advanced Error Handling in Node.js

### 1. Types of Errors in Node.js

Synchronous Errors → happen immediately (e.g., invalid JSON parsing).

Asynchronous Errors → happen later (e.g., failed API request, DB connection).

Operational Errors → predictable runtime issues (e.g., network down, file not found).

Programmer Errors → bugs in code logic (e.g., undefined variable).

👉 Best Practice: Always recover from operational errors (retry, fallback), but crash on programmer errors (they indicate bugs).

### 2. Synchronous Error Handling

Handled using try/catch.

try {

const data = JSON.parse("invalid JSON");

} catch (err) {

console.error("Error parsing JSON:", err.message);

}

### 3. Asynchronous Error Handling

For callbacks → handle in first argument (err).

const fs = require("fs");

fs.readFile("file.txt", "utf-8", (err, data) => {

if (err) {

console.error("Error reading file:", err);

return;

}

console.log(data);

});

For Promises → use .catch()

fetch("http://example.com")

.then(res => res.json())

.catch(err => console.error("Request failed:", err));

For async/await → wrap with try/catch

async function getData() {

try {

const res = await fetch("http://example.com");

const data = await res.json();

console.log(data);

} catch (err) {

console.error("Async error:", err);

}

}

### 4. Global Error Handling

#### a) uncaughtException (last-resort catch for sync errors)

process.on("uncaughtException", (err) => {

console.error("Uncaught Exception:", err);

process.exit(1); // best practice: exit after handling

});

👉 Not recommended for normal flow — use only to log, cleanup, and exit.

#### b) unhandledRejection (for rejected Promises without .catch())

process.on("unhandledRejection", (reason, promise) => {

console.error("Unhandled Rejection at:", promise, "reason:", reason);

});

👉 Better: always add .catch() or try/catch for promises.

### 5. Domains (Legacy, Avoid in New Code)

Node.js had domain module for centralized error handling, but it’s deprecated.

Use async hooks or proper structured error handling instead.

### 6. Error Classes & Custom Errors

Create custom error types for clarity.

class DatabaseError extends Error {

constructor(message) {

super(message);

this.name = "DatabaseError";

}

}

throw new DatabaseError("Failed to connect to DB");

### 7. Error Handling in Streams

Streams emit error events. Always listen for them.

const fs = require("fs");

const stream = fs.createReadStream("file.txt");

stream.on("error", (err) => {

console.error("Stream error:", err);

});

### 8. Graceful Shutdown

On fatal errors, close DB connections, stop accepting new requests, then exit.

process.on("uncaughtException", (err) => {

console.error("Fatal error:", err);

server.close(() => process.exit(1));

});

### 9. Best Practices for Senior Engineers

✅ Use try/catch with async/await everywhere.
 ✅ Always handle stream error events.
 ✅ Create custom error classes (APIError, DBError, ValidationError).
 ✅ Don’t rely on uncaughtException for normal error flow.
 ✅ Log errors (e.g., with winston, pino).
 ✅ Gracefully shut down servers on fatal errors.
 ✅ Wrap async routes in Express/NestJS with error middleware.

### 📌 Interview-Style Summary

👉 “In Node.js, error handling must account for both synchronous and asynchronous errors. For async, we use callbacks (err-first), promises with .catch(), or try/catch with async/await. Fatal errors can be caught using process.on('uncaughtException') and process.on('unhandledRejection'), but best practice is to log and gracefully shut down instead of continuing execution. At scale, we also use custom error classes, logging tools, and error middleware for centralized handling.”

⚡ As a 10+ years candidate, you may be asked:

“Difference between operational vs programmer errors?”

“Why should you exit after uncaughtException?”

“How do you handle async errors in streams?”

“How do you build a global error handling middleware in Express?”

Do you want me to also cover Express/NestJS error handling patterns (middleware-based centralized error handling) since they are very common in interviews for senior roles?

*************

Got it 👍 Let’s narrow this to a Node.js perspective only, because that’s what matters for interviews when they ask about TCP / UDP / WebSockets in Node.

## 🌐 Networking in Node.js (Interview-Ready)

Node.js is great for networking because:

It’s built on libuv (event-driven, non-blocking I/O).

Provides core networking modules (net, dgram, http, https).

Has popular libraries like ws for WebSockets.

### 1. TCP in Node.js

Node.js provides the net module for raw TCP servers/clients.

Used for low-level, connection-oriented networking.

#### TCP Server (Node.js)

const net = require("net");

const server = net.createServer((socket) => {

console.log("Client connected");

socket.on("data", (data) => {

console.log("Received:", data.toString());

socket.write("Echo: " + data);

});

socket.on("end", () => console.log("Client disconnected"));

});

server.listen(3000, () => console.log("TCP server running on port 3000"));

👉 In interviews:

Mention use cases → chat servers, databases, custom protocols.

Highlight Node’s async event loop → it scales well for many TCP clients.

### 2. UDP in Node.js

Node.js provides the dgram module for UDP sockets.

Used for fast, connectionless communication.

#### UDP Server

const dgram = require("dgram");

const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {

console.log(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

server.send("Ack: " + msg, rinfo.port, rinfo.address);

});

server.bind(4000);

👉 In interviews:

Stress that UDP in Node is fire-and-forget.

Useful in gaming, video streaming, DNS resolvers.

Node handles this with event-driven callbacks (no blocking).

### 3. WebSockets in Node.js

Built on top of TCP (via HTTP upgrade request).

Node doesn’t have native WebSocket support — we use libraries like ws or Socket.IO.

#### WebSocket Server (Node.js with ws)

const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {

console.log("Client connected");

ws.on("message", (msg) => {

console.log("Received:", msg);

ws.send("Echo: " + msg);

});

});

👉 In interviews:

WebSockets are full-duplex, unlike HTTP (req/res).

Node is a great fit because of long-lived connections.

Used in chats, notifications, dashboards, multiplayer games.

### 4. Node.js Perspective & Strengths

### 5. Advanced Interview Talking Points

Node’s event loop allows handling 10k+ concurrent TCP/WebSocket clients.

For CPU-heavy networking tasks → combine with worker_threads or cluster.

WebSockets vs HTTP long-polling:

WebSockets = single persistent connection.

Polling = repeated HTTP requests → inefficient.

UDP in Node is often used in microservices for service discovery or custom protocols.

✅ Node.js Networking Summary (Interview answer):

In Node.js, networking is handled using modules like net for TCP, dgram for UDP, and libraries like ws for WebSockets. TCP is reliable and used for stateful connections, UDP is fast but unreliable, and WebSockets provide real-time bidirectional communication on top of TCP. Thanks to Node’s event-driven architecture, a single process can handle thousands of concurrent connections, making it ideal for chat apps, APIs, and real-time systems.

Do you want me to also add diagram-style flow (event loop + socket handling) so you can explain how Node handles thousands of sockets concurrently in interviews?

## Table 1
| Feature | Absolute Path | Relative Path |
| --- | --- | --- |
| Definition | Full path from the root of the filesystem | Path relative to the current working directory |
| Starts with | / (POSIX), C:\ (Windows), or \\ (UNC) | No / or drive letter |
| Dependent on process.cwd() | ❌ No | ✅ Yes |
| Portability | Less portable (hardcoded system-specific) | More portable (but context-dependent) |
| Example | /etc/passwd or C:\users\john\file.txt | ./file.txt, ../data/file.json |

## Table 2
| Feature | Event Loop (Main Thread) | Thread Pool (libuv workers) |
| --- | --- | --- |
| Runs JS code | ✅ Yes | ❌ No |
| Handles Promises, timers | ✅ Yes | ❌ No |
| Handles I/O callbacks | ✅ Yes | ❌ No |
| Does actual heavy work | ❌ No | ✅ Yes |
| Examples | setTimeout, HTTP, Promises | fs, crypto, zlib, DNS |

## Table 3
| Feature | cluster 🖥️ | worker_threads ⚡ |
| --- | --- | --- |
| Process/Thread type | Multiple processes | Multiple threads in same process |
| Memory | Separate per process | Shared memory possible (SharedArrayBuffer) |
| IPC | Via messaging (slower) | Direct shared memory (faster) |
| Use Case | Scale HTTP servers across CPU cores | Run CPU-heavy tasks without blocking event loop |

## Table 4
| Feature | Child Process | Worker Threads | Cluster |
| --- | --- | --- | --- |
| Execution model | Separate process | Separate thread, same process | Multiple processes |
| Memory | Isolated | Shared (via SAB) | Isolated |
| Communication | IPC (messages) | Message passing + Shared memory | IPC (messages) |
| V8 Instance | New for each | Shared | New for each |
| Best for | Running scripts, external commands | CPU-bound tasks | Scaling server across cores |
| Overhead | High | Low | High |
| Example Use | git clone, Python script | Image processing | Load balancing HTTP server |

## Table 5
| Feature | CommonJS (require) | ES Modules (import) |
| --- | --- | --- |
| Default in Node.js | ✅ Yes (before v12) | ✅ Supported (from v12+) |
| Syntax | const x = require('x') | import x from 'x' |
| Exports | module.exports or exports | export, export default |
| Loading | Runtime, synchronous | Compile-time, asynchronous |
| Tree-shaking | ❌ Not possible | ✅ Possible (dead code elimination) |
| File Extension | .js or .cjs | .mjs or "type": "module" in package.json |
| Interoperability | Can import ESM with dynamic import | Can import CommonJS with createRequire |

## Table 6
| Protocol | Node.js Module | Style | Use Case |
| --- | --- | --- | --- |
| TCP | net | Connection-oriented, reliable | Chat servers, DB clients, raw protocols |
| UDP | dgram | Connectionless, fast | Gaming, VoIP, DNS queries |
| WebSockets | ws, Socket.IO | Full-duplex over TCP | Chat, live feeds, stock tickers, collab apps |
