# Extract: completeNodeDev.docx

TODO: explore how to run the node local server and access from another network (ngrok)

Course1: Andrei Neagoie Complete NodeJS Developer (GraphQL, MongoDB, + more)

Git repo link: https://github.com/Veeramanikandan-R-1/nodeJsUdemyPaidZTM.git

https://www.udemy.com/course/complete-nodejs-developer-zero-to-mastery/learn/lecture/26922404#overview

ZTM community: https://zerotomastery.io/community/

Cheatsheets: https://zerotomastery.io/cheatsheets/

Node js is a javascript runtime built on Google chrome v8 engine with libuv (C++ library which handles async actions)

JS runtime

The JavaScript runtime is a program that extends the JavaScript engine and provides additional functionalities, so it can interact with the outside world. Also, the JS runtime provides features/APIs to build Javascript based software.

A webbrowser is a JS runtime, js engine implements the JS engine, that executes event loop, async actions etc

Node js youtube tutorial

https://github.com/gitdagray/node_js_resources

Need for node js

JS couldn’t create web server that could read filesystems and read databases

V8 is written in C++, both chrome and node is mostly written in C++ only

Chrome handles DOM, node handles filesystems

cmd-> node -> repl (read evaluate print loop)

Node has global, process whereas browser dont have, window and document vice versa

Process.argv[2] returns the argument passed

Argv indexes

0-> path for node executable

1-> path for current script

2-> argument passed

Dino js is similar to node which uses V8 engine

All globals available in node: https://nodejs.org/docs/latest/api/globals.html

Languages like PHP, python requires webserver like apache, each request will be a new thread

Server required lot of threads and resources in traditional model

Node delegates it multi thread to thread pool/ os since os is multithreaded, so we don’t need additional webservers like PHP, python

Python now integrated similar pattern like eventloop, but it is not that much efficient as node

Node is not that much best in ml and video processing, since it blocks CPU, graphic card

Node is really best at server, database, web services like email and authentication

Node works best at io operation rather than heavy computational tasks

Node is good at serving data in io operations, ex sending video in netflix

Observer subscriber to the subject and listens to single or series of events, they can respond to the events, one subject can have multiple have observers

Database operations, mouse click can be represented using observer pattern -> this is basics for react and angular

In node we can implement using events module

Why we need modules

Commonjs is also used in mongodb

Module vs package

Module is a file

Package is a collection of module

^0.1.2 -> latest patch version is acceptable -> this is the reason when we do npm install after sometime it will install latest version and we will get conflict so we get conflict

So it is better to share package-lock.json file to install exactly same version

npm audit -> to know if there is any security vulnerability in our packages for ex., we might have installed axios version 0.0.1 but later there might be more security logic added to next version 0.0.2

npm audit fix -> to resolve above issues

We should run npm audit in regular basis, if no fix is available in audit we need to switch library

Nodemon has to be installed globally to avoid passing whole path with bin to run js file

Installing global has disadvantage because while running app we don’t have info on dependency

Package to parse csv -> csv-parse

With 401 we are not logged in ex: incorrect credentials

But with 403 we are logged in but we don’t have access

400 series -> client’s fault

500 series -> server errors

If we are on google and try to access facebook.com then it is cross origin

If we access same google/mail from google then it is same origin

Origin basically varies wrt to protocol, path, port

Access control allow origin should be set to * in server to allow resource sharing across different/any origins

To allow only specific origin use above method

Browser is the one which enforces these policies

Request is a readable stream, whereas response is a writable stream

Express implicitly passes the status code and content type

npm install –save-dev -> to install only in dev mode

Middleware

Node will give additional information of function name when error occurs if we use named function, this is not possible with arrow function so it is better to write controller as named fun

To send file in express

Express is complete listener function for createHttpServer

Can be fixed by adding following in server header

Router and controller has one to one mapping

Whereas model and controller are not one to one mapping

Using concurrently to start both frontend and backend at once: https://dev.to/numtostr/running-react-and-node-js-in-one-shot-with-concurrently-2oac

To set build path to server directory to avoid copy paste each time

Middleware for cors issue: cors

Loggin middleware Morgan https://www.npmjs.com/package/morgan

Advantage of using Map object

Values will be returned in same order as we are storing

We can assign any datatype to any

Need for promises

3 promise states - pending, resolved, rejected

Using await in promise all

To check whether date is vaid or not

Use https://draw.io/ -> for doing architectural diagram

Testing - Jest

Alway install test library in dev dependency

Expect apis: https://jestjs.io/docs/expect

To get numerical value of date use (new Date(value)).valueOf()

Performance

Node uses thread pool to handle multiple tasks at same time within one cpu core

Real life function that takes more time

Json. stringify, parse

Array sort

Node crypto functions to hash

Typical response time should be less than 100 or 200ms

Node is a single threaded language

Multiple node instance in multiple cpu using cluster module

Tasks are allocate to worker modules in round-robin order but in windows OS it is not guaranteed to use round-robin it may use some other order also

When making two request to same endpoint in chrome different tabs chrome may wait till first request finishes to cache and show in second

To test performance check disable cache in devtools

difference between thread pool and cluster module in node js:

cluster module as allowing us to run multiple instances of Node in separate processes, while the worker thread module allows us to run multiple instances of Node in the same process

Load balancing -> horizontal scaling

In node load balancing is achieved using cluster module and it uses round robin order

Usually pm2 will be installed globally

Start command -> pm2 start jsFileName

Stop command -> pm2 stop filename

Delete process -> pm2 delete filename

Status -> pm2 status

list-> pm2 list

Advantages of using pm2 -> don’t want to write cluster logic in app.js

To run pm2 with 2 workers pass number after i flag -> pm2 start server.js -i 2

If we pass no as max it will use max number of cores -> pm2 start server.js -i max

pm2 logs -> to view logs

Pm2 logs lines -200 -> to view last 200 lines in log

Pm2 also supports log rotation to avoid large size file

To store log to specific file -> pm2 start server.js -l logs.txt -i max

To view detail of specific cluster -> pm2 show 0

Individual process can also be stopped and started using -> pm2 start/stop processNO(0/1)

To monitor status in dashboard use -> pm2 monit

Zero downtime restart -> whenever we make any change in code we should maintain to avoid maintenance time or allow user to use continuously when change is deployed

To achieve this we need to use reload command which restart process one by one instead of shutting down all process at use in “restart” command

Commands:

pm2 restart server.js

pm2 reload server.js

When we maintain pm2 clusters, and use state for each instance, state maintained in one instance won’t be available in other since it is a new instance

So we need to make the cluster stateless by maintaining state in external db

Difference between worker thread & multithreading

Worker thread uses web workers in browser

In node it use v8 isolates

Cluster module uses multiple process, worker thread uses v8 isolates in same process

While using worker thread we need to implement the distribution of work, they can share memory, in production we mostly use clustering module for rock solid perfomance

Passing worker data for worker thread, using expensive sort function

#### Key Differences:

#### When to Use Each?

Thread Pool: For non-blocking I/O operations, like file system access or networking, when you don't need to worry about blocking the event loop.

Cluster Module: When your Node.js app is CPU-bound or when you want to take advantage of multi-core CPUs for handling a large number of requests, such as in a web server scenario.

Worker Threads: When you need to offload CPU-heavy computations (like image processing or data analysis) without blocking the event loop, especially when it involves long-running tasks.

In short, these modules provide different concurrency models: Thread Pool for background I/O work, Cluster for scaling across multiple cores, and Worker Threads for parallelizing CPU-heavy tasks in the same process.

Here’s a simple explanation of the differences between Thread Pool, Cluster Module, and Worker Threads in Node.js 👇

#### 🧩 1. Thread Pool

Used for: Handling non-JavaScript tasks (like file I/O, crypto, DNS lookups).
 Runs in: The libuv layer of Node.js.

🧠 Concept:

Node.js uses a pool of background threads (usually 4 by default).

These threads handle blocking operations so the main event loop doesn’t get stuck.

Example:

fs.readFile(), crypto.pbkdf2(), or zlib tasks run in the thread pool.

🧱 Think of it like:

A group of helpers working behind the scenes to do heavy lifting while the main thread handles requests.

#### ⚙️ 2. Cluster Module

Used for: Running multiple Node.js processes to utilize multiple CPU cores.

🧠 Concept:

By default, Node.js runs in a single process (1 core).

The Cluster module allows you to fork multiple child processes (workers).

Each process has its own event loop and memory.

A master process distributes incoming requests to worker processes.

🧱 Think of it like:

You start multiple Node.js servers on each CPU core, sharing the same port, to handle more traffic.

📘 Example use:

import cluster from 'cluster';

import os from 'os';

if (cluster.isPrimary) {

const numCPUs = os.cpus().length;

for (let i = 0; i < numCPUs; i++) cluster.fork();

} else {

// Worker process code (e.g., server)

}

#### 🧵 3. Worker Threads

Used for: Running JavaScript code in parallel threads within the same process.

🧠 Concept:

Each worker thread has its own event loop and memory, but they can communicate via messages.

Useful for CPU-intensive JavaScript tasks (like data processing, image compression).

Unlike Cluster, Worker Threads are not separate processes — they run in the same process.

🧱 Think of it like:

Small sub-threads inside your Node.js app that help with heavy JavaScript computations.

📘 Example:

import { Worker } from 'worker_threads';

new Worker('./worker.js', { workerData: { number: 100 } });

#### ⚖️ Summary Table

🪄 In short:

Thread Pool → For async I/O (built-in, behind the scenes).

Cluster → For scaling Node.js across multiple CPU cores.

Worker Threads → For parallel JS computation in the same process.

Would you like me to give a real-world example (like how each is used in a Node.js server)?

_____________

DB

Database is a system both hw and sw used to store, organise and use data

Db-fiddle playground to practice database

Declarative vs imperative

Declarative - we just ask what to return ex: sql

Imperative - we will write line by line code to tell what will happen ex: java

Python can be both declarative and imperative

History of db

Early we used flat file model -> takes more time to update

In 1960 IBM used Hierrarchial model and later used by NASA

In 1970 relational db was invented

Later ingres Relation db came

ORACLE released db to compete IBM running on mini to mainframe

SQL vs NOSQL

Mongodb data stored as document as JSON

Relational db provides normaization where duplicates can be avoided easily

Once db created adding new column is easy in mongodb but in relational it is quite complex

Relational are harder for horizontal scaling because they are designed for single maching usage since we have relation across tables, whereas mongodb has all data in one place

For example for linked profile we can use mongodb whereas for blogs we use relational db

Playground

https://www.db-fiddle.com/

__________

Scalability

Horizontal

Increasing no of machines

Vertical

Increasing specification of single machine ex increase disc usage, adding physical hardware

For relational db we use this

_________

Sharding

When we use different machines to handle huge data we use sharding to manage

Splitting data across different machines, we need one routing system

_____________

SSL & TLS

Provides free tls ssl certificates: https://letsencrypt.org/ -> but this requires domain name so we can use our own self signed certificate from local for development, in production we need to use only CA signed certificate

Opensource to download ssl certificate for https

https://www.openssl.org/

To use openssl in windows we need git bash

Command to create selfsigned certificate

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout privatekey.key -out certificate.crt

We can use this for development for production we need to use letsencrypt for our domain

Helmet - give additional security to express servers

When we use helmet we will not relieve backend is developed using Express or not like that info

Express app can be secured using following ways

Https

Helmet

Difference between authentication and authorization

Authentication - validates users who they are using username/ password

Authorization - validates user if they have permission to access the content

2factor authentication

Authenticate using password with otp or authenticator app

401 is typically unauthenticated status code

Social sign on

API keys

JWT is not encrypted anyone can decode the payload, but they cannot update it since token is needed

Signature prevents manipulation of the token, it can be publicly read

So JWT relies on https or tls

TOKEN based authentication works only when we use https

Good question 👍 — this is a common doubt!

Let’s explain it simply 👇

#### 🧠 First — What is JWT?

A JWT (JSON Web Token) is just a string that contains some user data (called claims) — like user ID or role — and a digital signature.

Example (looks like this):

xxxxx.yyyyy.zzzzz

xxxxx → Header (says it’s JWT and which algorithm is used)

yyyyy → Payload (contains user info, like { "userId": 123, "role": "admin" })

zzzzz → Signature (used to check if token is valid)

#### 🔐 Now — JWT is not encrypted, it’s signed

Anyone can decode a JWT (it’s just Base64).

But nobody can modify it without being caught.

Why?
 Because of the signature part:

signature = HMACSHA256(header + "." + payload, secretKey)

If someone changes the payload (like role → admin),
 👉 the signature will no longer match.
 When the server checks the token, it will reject it immediately.

#### ✅ So JWT is safe because:

It’s signed, not encrypted.

Ensures integrity (data cannot be tampered with).

The secret key used to sign the token is known only to the server.

Without it, no one can generate a valid token.

Optional encryption (JWE) can be added if you need to hide data too.

You can add expiration (exp) to limit how long the token is valid.

You can use HTTPS to protect the token from being stolen during transfer.

#### ⚠️ Important

JWTs are not meant to hide data — they’re meant to prove authenticity.

Always send them over HTTPS.

Never store sensitive data (like passwords) inside the JWT payload.

#### 🧩 Simple analogy

JWT is like a sealed letter — you can open and read it,
 but if you try to change what’s inside, the seal breaks and the receiver will know it’s fake.

OAUTH:

Sure 👍 — here’s a short and simple explanation of OAuth:

#### 🔑 OAuth (Open Authorization)

OAuth is a secure way to let one app access your data from another app — without sharing your password.

#### 🧠 Example:

When you click “Login with Google” on a website:

The website redirects you to Google for login.

You log in and Google asks for your permission (like access to your email).

If you allow, Google sends back a temporary access token to the website.

The website uses that token to access your data (like your profile info) — not your password.

#### 🔐 In short:

OAuth lets apps access your data securely using tokens,
 not passwords — you stay in control of what’s shared and for how long.

Unobtrusive - தடையற்ற

Sessions

Tells if user is interacting the application using browser

Two types

Client side

Server side

Cookies always used to implement sessions

Two types of cookies

Stateful cookies

Stateless cookies

Stateful cookies - server side session

Stateless cookies- based on browser cookies

Server can use this by signing the cookies before sending to the client

If browser tries to update the cookies we can verify it in server and check if it is tampered or not

In majority of cases sessions are maintained in browser instead of server in cases where user can see all users logged in but they cannot update it

Cookie has size limit of 4kb in browser for very large sites it is preferred to go with db in server, but usually payload will be less so we can go with client sessions

These two npm packages helps to maintain sessions

Express-session - server side

Cookies-session -client side

Continous integration CI/CD

CI: after any new commit, CI server will detect the change and build-> test -> result, this result will help fellow devs to fix issue early made by other devs

Sample tools: CircleCi, TravisCI, Jenkins (large scale)

Continuous Deployment (CD)

Adds an extra check, whenever we change anything in code, the build is ready to be delivered or not, usually it builds the app, run it with production configuration

Adds acceptance testing to check if all main use cases are passed by testing both frontend and backend

Continous Deployment

Not applicable for all apps, since some cases cannot be automated eg: medical devices where cost or error is larger

Pipeline

Basically CI/CD steps

Github actions is similar to Jenkins

Pipeline is configured in yaml files

We can find the correct version for git actions from marketplace

https://github.com/marketplace/actions/setup-node-js-environment

_________

CANVAS

Used to form shape easily using inbuilt functions

____

Sockets

Opening or object to hold something (eng meaning)

We use socket.io package which is compatible for both client and server

Before socket we used to implement using polling with specific intervals

Fixing cors error when implementing cors

_______

Positioning scripts in html

___________

GraphQL

A frontend application

Graphql how it works

Query - used to structure the output

Resolvers - runs after getting the response

Mutation

Used to do any CRUD operations

___________

AWS & DOCKER

Serverless architecture

We don’t have to worry about the system configuration and others we need to just focus on when the function will be executed - it is kind of event driven programming,

Docker

Docker helps to build the container that will run on all machines/OS (platform independent)

Virtual Machines

VMWare, Parallels, machine hosts a guest OS

___________

Container

Helps to run program in any machine/config/OS

Hypervisor - program that runs or manages different OS, it can be a hardware also

Container advantages

Instead of running each os differently in container startup time is less

VM advantages:

It provides (high level separation compared to containers) separation layer where one program should not interact with other (security reasons)

Docker installation

Docker hub: docker image repository which means it hosts the images

We can use docker hub or amazon elastic registry to use amazon from end to end

https://hub.docker.com/

________

Command to run a image from docker hub

docker run -p 80:80 docker/getting-started

//getting started is the practice image from docker hub

-p parameter helps to map the port from docker hub to our local machine port

We can also publish our own image in docker hub

Dockerfile

Will help to pull the base image and on top of it we can build image

For node projects “alpine” base image is used they don’t take much space

Steps to create docker file

Similar to git ignore we also have .dockerignore to ignore node modules which we dont need in container since when building image we will run npm install

Layers in docker

Minimises the amount of work done to build the image again and again when do some change in development

As per above screenshot only run command will run if package.json file changes

package*.json denotes to include package-lock.json file as well, in some case including this will give some issue if we change the host from linux to windows in such cases we can try without *

Steps to build and run

Build an image using build command

Static docker image file will get generated

Using run command run the image as container

Steps to push to cloud

Push the docker image to docker hub

Uploaded Docker image in docker hub can be downloaded or add to docker file and can be used in any server

## Table 1
| Feature | Thread Pool | Cluster Module | Worker Threads |
| --- | --- | --- | --- |
| Type | Threads for I/O operations (from libuv) | Multiprocessing (multiple Node processes) | Multithreading (in a single process) |
| Use Case | Offload I/O operations (e.g., file system, DNS) | Handling HTTP requests across multiple cores | CPU-bound tasks (e.g., heavy computation) |
| Concurrency Model | Parallel execution for I/O tasks | Forking multiple processes | Parallel execution of JavaScript code in separate threads |
| Memory Model | Shared memory (libuv manages threads) | Separate memory for each worker process | Shared memory (can use SharedArrayBuffer for data sharing) |
| Inter-Process Communication | Not applicable | Uses IPC (Inter-Process Communication) | Uses message-passing (via postMessage and onmessage) |
| Main Thread Interaction | Invisible to the developer | Developer manages workers via master process | Explicit creation and management of worker threads |
| Suitable For | I/O-heavy operations (non-blocking) | Scalability, multi-core utilization | CPU-bound operations requiring parallelism |

## Table 2
| Feature | Thread Pool | Cluster Module | Worker Threads |
| --- | --- | --- | --- |
| Type | Background threads (C++) | Multiple Node.js processes | Multiple JS threads |
| Used For | I/O heavy tasks | Load balancing (multi-core) | CPU-heavy JS tasks |
| Shared Memory | Yes (via libuv) | No | Partial (via SharedArrayBuffer) |
| Communication | Internal | IPC (Inter-Process Communication) | Message passing |
| Example Use | fs, crypto, dns | Web servers | Data processing, image resizing |
