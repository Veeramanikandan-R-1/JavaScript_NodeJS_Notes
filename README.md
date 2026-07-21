# JavaScript Node.js Notes

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

Extracted original images are stored in `assets/source_extract` and browsable from [Source Image Gallery](./0_Notes/source_image_gallery.md). Curated diagrams for study notes are stored in `assets/diagrams`.

## How to Study

1. Read one main note slowly.
2. Run or rewrite the code example.
3. Answer the interview questions without looking.
4. Complete the exercise.
5. Revisit the matching file in `0_Revision_Notes` before interviews.
6. Build the capstones in order: CLI -> web app -> REST API -> realtime app -> production-ready API.

## 1_Foundation

* [Backend Node.js Roadmap](./1_Foundation/a_backend_nodejs_roadmap.md)
* [Setup, Tooling, and Project Workflow](./1_Foundation/b_setup_tooling_workflow.md)
* [Node.js Runtime vs Browser Runtime](./1_Foundation/c_node_vs_browser_runtime.md)
* [npm, package.json, and SemVer](./1_Foundation/d_npm_package_json_semver.md)
* [Debugging Node.js Applications](./1_Foundation/e_debugging_nodejs.md)

## 2_Node_Runtime_Internals

* [V8, libuv, and Node Architecture](./2_Node_Runtime_Internals/a_v8_libuv_node_architecture.md)
* [Event Loop Phases and Microtasks](./2_Node_Runtime_Internals/b_event_loop_phases_microtasks.md)
* [Callbacks, Promises, and async-await](./2_Node_Runtime_Internals/c_callbacks_promises_async_await.md)
* [process Object, Environment, and Signals](./2_Node_Runtime_Internals/d_process_object_env_signals.md)
* [CommonJS vs ES Modules](./2_Node_Runtime_Internals/e_commonjs_vs_es_modules.md)
* [Advanced Error Handling and Graceful Shutdown](./2_Node_Runtime_Internals/f_error_handling_graceful_shutdown.md)

## 3_Core_Modules

* [path Module and Safe Paths](./3_Core_Modules/a_path_module_paths.md)
* [fs Module, Files, and Directories](./3_Core_Modules/b_fs_module_files_directories.md)
* [Buffers and Binary Data](./3_Core_Modules/c_buffers_binary_data.md)
* [Streams, Backpressure, and pipeline](./3_Core_Modules/d_streams_backpressure_pipeline.md)
* [events Module and EventEmitter](./3_Core_Modules/e_events_eventemitter.md)
* [http and https Core Modules](./3_Core_Modules/f_http_https_core_server.md)
* [child_process Module](./3_Core_Modules/g_child_processes.md)

## 4_CLI_Automation

* [Command Line Arguments and CLI Input](./4_CLI_Automation/a_process_argv_cli_input.md)
* [yargs and Commander CLI Apps](./4_CLI_Automation/b_yargs_commander_cli_apps.md)
* [JSON File Store Notes App](./4_CLI_Automation/c_json_file_store_notes_app.md)
* [Environment Variables and Configuration](./4_CLI_Automation/d_environment_config.md)

## 5_Express_HTTP_APIs

* [Express Introduction and HTTP Server](./5_Express_HTTP_APIs/a_express_intro_http_server.md)
* [Routing, Controllers, and Services](./5_Express_HTTP_APIs/b_routing_controllers_services.md)
* [Express Middleware and Request Lifecycle](./5_Express_HTTP_APIs/c_middleware_request_lifecycle.md)
* [Status Codes and API Error Design](./5_Express_HTTP_APIs/d_status_codes_api_errors.md)
* [Validation and Sanitization](./5_Express_HTTP_APIs/e_validation_sanitization.md)
* [Static Assets and Templating](./5_Express_HTTP_APIs/f_static_assets_templating.md)

## 6_Database_MongoDB

* [MongoDB Native Driver and CRUD](./6_Database_MongoDB/a_mongodb_driver_crud.md)
* [Mongoose Models and Schemas](./6_Database_MongoDB/b_mongoose_models_schemas.md)
* [Validation, Indexes, and Relationships](./6_Database_MongoDB/c_validation_indexes_relationships.md)
* [Filtering, Pagination, and Sorting](./6_Database_MongoDB/d_filtering_pagination_sorting.md)
* [Transactions and Data Consistency](./6_Database_MongoDB/e_database_transactions_consistency.md)

## 7_Auth_Security

* [Password Hashing with bcrypt](./7_Auth_Security/a_password_hashing_bcrypt.md)
* [JWT Authentication Tokens](./7_Auth_Security/b_jwt_authentication_tokens.md)
* [Auth Middleware and Authorization](./7_Auth_Security/c_auth_middleware_authorization.md)
* [CORS and Browser Security Boundaries](./7_Auth_Security/d_cors_browser_security.md)
* [Rate Limiting, Security Headers, and Secrets](./7_Auth_Security/e_rate_limiting_headers_secrets.md)
* [OAuth Basics for Node APIs](./7_Auth_Security/f_oauth_basics.md)

## 8_Files_Email_Jobs

* [File Uploads with Multer](./8_Files_Email_Jobs/a_file_uploads_multer.md)
* [Image Processing and Serving Files](./8_Files_Email_Jobs/b_image_processing_serving_files.md)
* [Sending Emails with Providers](./8_Files_Email_Jobs/c_sending_emails_providers.md)
* [Background Jobs and Queues](./8_Files_Email_Jobs/d_background_jobs_queues.md)

## 9_Realtime_Networking

* [TCP, UDP, and Node Networking](./9_Realtime_Networking/a_tcp_udp_networking.md)
* [WebSockets and Socket.io Introduction](./9_Realtime_Networking/b_websockets_socketio_intro.md)
* [Socket.io Rooms and Presence](./9_Realtime_Networking/c_socketio_rooms_presence.md)
* [Realtime Scaling and Redis Adapter](./9_Realtime_Networking/d_realtime_scaling_redis_adapter.md)

## 10_Testing_Quality

* [Jest Unit Tests](./10_Testing_Quality/a_jest_unit_tests.md)
* [Testing Asynchronous Code](./10_Testing_Quality/b_testing_async_code.md)
* [Supertest Express Integration Tests](./10_Testing_Quality/c_supertest_express_integration.md)
* [Test Database Setup and Teardown](./10_Testing_Quality/d_test_database_setup_teardown.md)
* [Mocking External Services](./10_Testing_Quality/e_mocking_external_services.md)

## 11_Performance_Scaling

* [Event Loop Lag and Profiling](./11_Performance_Scaling/a_event_loop_lag_profiling.md)
* [libuv Thread Pool](./11_Performance_Scaling/b_thread_pool_libuv.md)
* [Cluster, PM2, and Multi-process Scaling](./11_Performance_Scaling/c_cluster_pm2_multi_process.md)
* [Worker Threads for CPU-heavy Tasks](./11_Performance_Scaling/d_worker_threads_cpu_tasks.md)
* [Caching and Redis](./11_Performance_Scaling/e_caching_redis.md)

## 12_Production_DevOps

* [Logging, Monitoring, and Observability](./12_Production_DevOps/a_logging_monitoring_observability.md)
* [Health Checks and Graceful Shutdown](./12_Production_DevOps/b_health_checks_graceful_shutdown.md)
* [Docker for Node.js Services](./12_Production_DevOps/c_docker_nodejs.md)
* [Deployment and CI/CD](./12_Production_DevOps/d_deployment_ci_cd.md)

## 13_Architecture_System_Design

* [Layered Backend Architecture](./13_Architecture_System_Design/a_layered_backend_architecture.md)
* [REST API Design](./13_Architecture_System_Design/b_rest_api_design.md)
* [GraphQL Basics for Node.js](./13_Architecture_System_Design/c_graphql_basics.md)
* [Message Queues and Event-driven Design](./13_Architecture_System_Design/d_message_queues_event_driven.md)

## 14_Interview_Prep

* [Node Runtime Interview Questions](./14_Interview_Prep/a_node_runtime_interview_questions.md)
* [Express API Interview Questions](./14_Interview_Prep/b_express_api_interview_questions.md)
* [Database, Auth, and Security Interview Questions](./14_Interview_Prep/c_database_auth_security_interview.md)
* [Backend System Design Interview Notes](./14_Interview_Prep/d_backend_system_design_interview.md)

## 15_Capstone_Projects

* [Capstone: Notes CLI](./15_Capstone_Projects/a_notes_cli_project.md)
* [Capstone: Weather Web App](./15_Capstone_Projects/b_weather_web_app_project.md)
* [Capstone: Task Manager REST API](./15_Capstone_Projects/c_task_manager_api_project.md)
* [Capstone: Realtime Chat App](./15_Capstone_Projects/d_realtime_chat_project.md)
* [Capstone: Production-ready Node API](./15_Capstone_Projects/e_production_ready_api_capstone.md)
