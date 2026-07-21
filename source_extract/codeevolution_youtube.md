# Extract: codeEvolution-youtube.docx

Tutorial link: https://www.youtube.com/watch?v=4gWoKrwGui4&list=PLC3y8-rFHvwh8shCMHFA5kWxD9PaPwxaY&index=9

Git link: https://github.com/Veeramanikandan-R-1/nodeJsTutorialYoutube

JavaScript Fundamentals Crash Course - • JavaScript Crash Course - Tutorial fo...

Advanced JavaScript Crash Course - • Advanced JavaScript Crash Course

10 JavaScript Features - • 10 JavaScript Features to Know for Re...

React JS introduced in 2013 - jordan walke

Angular 2010

JS - 1995 - brandon eiche

V8 is Google's open source JavaScript engine.

V8 implements ECMAScript as specified in ECMA-262.

V8 is written in C++ and is used in Google Chrome, the open source browser from Google.

V8 can run standalone, or can be embedded into any C++ application.

V8 Project page: https://v8.dev/docs

https://chromium.googlesource.com/v8/v8.git

JS introduced in 1995

Node js introduced in 2009

React in 2013

Node source code: https://github.com/nodejs/node

JS cannot handle file system, networking functions so it uses C++

Lib folder code allows to use C++ code using js

Each module in node has it’s own scope using IIFE pattern (immediatelly invoked function expression)

Module caching helps up with performance

To avoid module caching instead of exporting instance export class alone

Export patterns

Reason to not use exports. Method

Obj1 is module.exports, obj2 is exports

Exports is just reference, so we cannot reassign, unlike module.exports if we do reference will be lost and export will become empty obj {}

Here are the companies using Node. js: Netflix, NASA, Trello, PayPal, LinkedIn, Walmart, Uber, Twitter, Yahoo, eBay, GoDaddy,

From Video 16

Git hub repo: https://github.com/Veeramanikandan-R-1/nodeJsTutorialYoutube

File extension of es modules is .mjs

Require function directly parse the json data to object

To run node file in watch mode -> node –watch index.js

Callback -> function passed as an argument

Higher order fun -> function that returns the function

Inheriting event in custom class

We cannot directly send js obj in http response it should be converted to JSON format

Pool thread size is 4 so i we pass 5, 5th thread takes twice time of first 4

Pool size and execution time depends on core of computer

Timer queue is actually not queue it is min heap, represented as queue to simplify the process

npm -v -> to check npm version installed

npm init –yes -> to generate package.json with default values

npm install package_name

npm install package_name@version -> to install particular version

npm uninstall package_name

Npm version use semantic verstioning is used

Package we install is module in nodejs

Global package installation

npm install -g package_name

npm uninstall -g package_name

Command to run script -> npm run start

To publish the package

Signup in npm

npm adduser <username>

npm publish -> to publish the package

Published package - https://www.npmjs.com/package/rsvh-test

To turn package to cli tool

1.Add this line at the top

#!/usr/bin/env node

2.Add bin obj in package.json

3. Do npm install -g

Yargs - npm package to parse cli arguments

inquirer@8.2.5 - to add interactivity to cli cmds

It is required to create atleast 2 minimum cluster -> or else it will be same as single master cluster

To check no of cpu cores

Npm package that helps to manage to run in cluster with optimum cores -> pm2

https://www.npmjs.com/package/pm2

Run command for pm2 -> pm2 start .\a_no-cluster.js -i 0

0-> represents pm2 to decide optimum number of cores, we can also specify numbers

Tp stop -> pm2 stop filename

Deploying node application

Paid

Heruku

Free

Render

Fly.io

Render

Build command - yarn or npm install

Deployed http server in render

https://dashboard.render.com/web/srv-cmvpau2cn0vc73aq862g/deploys/dep-cmvpauacn0vc73aq8660

https://node-http-test-server.onrender.com/
