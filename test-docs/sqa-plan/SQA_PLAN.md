# SOFTWARE QUALITY ASSURANCE PLAN (SQAP)

**Project:** My Todo List App
**Version:** 1.0
**Date:** 2026-05-04

---

## Table of Contents

1. [Purpose and Scope](#1-purpose-and-scope)
2. [Definitions and Acronyms](#2-definitions-and-acronyms)
3. [Reference Documents](#3-reference-documents)
4. [SQA Plan Overview](#4-sqa-plan-overview)
5. [SQA Activities](#5-sqa-activities)
6. [Additional Considerations](#6-additional-considerations)
7. [SQA Records](#7-sqa-records)

---

## 1. PURPOSE AND SCOPE

### 1.1 Project Description

My Todo List App is a multi-platform task and collaboration management system. The system is structured into three client tiers: a web frontend built with Next.js, a mobile application built with React Native, and a Python-based chatbot deployment. All clients communicate with a shared Node.js/Express backend over a REST API, with Socket.IO serving real-time communication. Persistent data is stored in MongoDB, and Redis is used for caching and session support.

The system encompasses the following functional modules as defined in the Software Requirements Specification (SRS):

- **FR-AUTH** — User authentication and account management (registration, login, Google OAuth, password reset, logout)
- **FR-USER** — User profile management (profile update, avatar, preferences, notification settings, account deactivation)
- **FR-GROUP** — Group and workspace management (create, update, delete, member management)
- **FR-FOLDER** — Folder management within groups (create, update, delete, access control)
- **FR-TASK** — Task management (create, view, update, delete, calendar, Kanban, repeat, link tasks)
- **FR-ASSIGN** — Task assignment (assign/remove members, view assignees)
- **FR-COMMENT** — Task comments (add, edit, delete, view, attachment in comment, mention)
- **FR-ATTACH** — Task file attachments (upload, delete)
- **FR-CHECK** — Task checklist items (add, edit, delete, toggle completion)
- **FR-TIME** — Time tracking per task (start, stop, concurrent timers)
- **FR-CHAT** — Group chat (send, view, edit, delete, react, file share, real-time)
- **FR-DIRECT** — Direct messaging 1-1 (conversation list, send, view, edit, delete, react, file share)
- **FR-NOTIF** — Notification system (view, read, archive, delete, auto-triggered notifications, real-time, invite response)
- **FR-NOTE** — Personal notes (create, view, update, delete, favorite, share)
- **FR-ADMIN** — Administrator management (access control, analytics, user management, lock/unlock, role management, system notifications, login history)
- **FR-BOT** — Chatbot support (context display, suggested tasks, group progress for PM/PO roles)
- **NFR** — Non-functional requirements (security, usability, scalability, reliability)

### 1.2 Purpose of This SQAP

This Software Quality Assurance Plan (SQAP) establishes the planned quality assurance activities for My Todo List App. It defines the testing scope, methods, tools, roles and responsibilities, and schedule to be followed throughout the project's quality assurance lifecycle.

The plan serves as the guiding reference for:
- Defining which system features and functions are subject to quality assurance activities
- Specifying the testing types, levels, and black-box techniques to be applied per functional area
- Assigning responsibilities for each quality assurance activity
- Identifying product risks that require focused testing attention
- Establishing the schedule and sequence of quality activities
- Specifying the records and deliverables that quality activities must produce

### 1.3 Testing Scope

**In scope:**
- Functional system testing of all 17 FR/NFR modules as defined in the SRS, using black-box techniques and manual scenario-based execution
- Unit testing of selected backend services and utility modules using Jest
- Integration testing of backend services against a test database using Jest with a real MongoDB instance
- API-level testing of the backend REST interface using Postman
- Code review using a structured checklist applied to backend and frontend source code

**Explicitly excluded from this plan:**
- **Performance testing** — Load and stress testing is excluded from this SQAP. The test environment is a local Docker-based setup that is not representative of production-scale infrastructure. The team will not plan or conduct load testing as part of this quality assurance cycle.
- **Browser automation** — Automated end-to-end UI testing via browser automation tools is not included in this plan's quality activities.

---

## 2. DEFINITIONS AND ACRONYMS

| Term | Definition |
| :--- | :--- |
| **SQA** | Software Quality Assurance — planned systematic activities to ensure the software process and product comply with established requirements. |
| **SQAP** | Software Quality Assurance Plan — this document. |
| **SRS** | Software Requirements Specification — the formal requirements document for this project, serving as the primary input to all testing activities. |
| **FR** | Functional Requirement — a specific function the system must perform, identified by module code (e.g., FR-AUTH, FR-TASK). |
| **NFR** | Non-Functional Requirement — quality constraints on system behavior: security, usability, reliability, and scalability. |
| **TC** | Test Case — a documented test scenario with defined precondition, input, action, and expected result. |
| **API** | Application Programming Interface — the REST interface exposed by the backend over HTTP. |
| **UI** | User Interface — the web frontend (Next.js) or mobile client (React Native). |
| **UT** | Unit Test — an automated test targeting a single function, class, or module in isolation. |
| **IT** | Integration Test — a test verifying the combined behavior of multiple components, typically involving a real database. |
| **EP** | Equivalence Partitioning — a black-box technique that divides the input domain into valid and invalid equivalence classes. |
| **BVA** | Boundary Value Analysis — a black-box technique that tests values at the exact boundary of valid and invalid input ranges. |
| **JWT** | JSON Web Token — the authentication token format used by the backend authentication middleware. |
| **Socket.IO** | A real-time, event-based communication library used in this project for group chat, direct messaging, notifications, and presence updates. |
| **CRUD** | Create, Read, Update, Delete — the four basic data operations applied to system entities. |

---

## 3. REFERENCE DOCUMENTS

The following documents constitute the authoritative references for this SQAP:

1. Software Requirements Specification (SRS) — Version 3.0, dated 2026-03-20
2. IEEE Std 730-2014, *IEEE Standard for Software Quality Assurance Processes*
3. McCall Quality Model (11 quality factors)

---

## 4. SQA PLAN OVERVIEW

### 4.1 Organization and Responsibilities

This project is developed and tested by a student team. The following quality-related responsibilities are assigned across team roles.

| Role | Responsibility |
| :--- | :--- |
| **SQA Lead / Documentation** | Prepare the SQAP; design and document system test cases; develop the black-box testing coverage matrix; coordinate review activities and requirement traceability. |
| **Backend Tester** | Design and execute backend unit tests and integration tests; prepare per-module test checklists; generate coverage reports. |
| **Frontend Tester** | Design and execute frontend unit tests for utility modules; maintain frontend test scripts and coverage reports. |
| **Postman Tester** | Design and execute the Postman API test collection covering authentication, task, group, and related backend endpoints; document API test results. |
| **Code Reviewer** | Conduct source code review against the structured checklist; document Pass, Fail, and N/A results with concrete evidence according to defined review rules. |
| **Developer** | Fix defects identified during testing and review; ensure source code aligns with SRS requirements. |

### 4.2 Product Risks

The following product risks are identified from analysis of the SRS and the system's architectural design. These risk areas will receive focused testing attention during quality assurance activities.

| Risk Area | Description |
| :--- | :--- |
| **Authentication and session security** | The system uses JWT-based authentication with both access and refresh tokens. Improper token storage, insecure secret management, or insufficient session invalidation on logout present security risks that must be verified during both system testing and code review. |
| **Concurrent write integrity** | The system supports multiple simultaneous users performing write operations on shared entities such as tasks, timers, and group memberships. Multi-step write sequences that are not atomically protected may produce inconsistent data under concurrent access. |
| **Input validation completeness** | The backend exposes numerous API endpoints spanning 17 functional modules. Incomplete or inconsistent input validation at the route boundary — for request body fields, path parameters, and query values — represents a risk of invalid data reaching business logic. |
| **Real-time communication correctness** | Group chat, direct messaging, and notification delivery rely on Socket.IO. Real-time features are more difficult to test than standard request-response flows, and incorrect event authorization or listener management may expose unintended behavior. |
| **Third-party service dependencies** | Several system features depend on external providers: Google OAuth for social login, an SMTP provider for email delivery, and a cloud storage service for file uploads. Failures or behavioral changes in these external services affect system reliability in ways that cannot be fully controlled during testing. |
| **Internationalization coverage** | The system must support both English and Vietnamese across all UI components. Incomplete externalization of UI strings, inconsistent date and time formatting relative to user preferences, and language-dependent logic branches present risks to correctness under non-default locale settings. |

### 4.3 Tools Used

| Category | Tool | Purpose |
| :--- | :--- | :--- |
| **System testing** | Manual execution | Execute system test cases per the SRS module scenarios using black-box techniques |
| **Unit and integration testing** | Jest | Backend (Node.js/JavaScript) and frontend (TypeScript) unit and integration test runner |
| **Dependency mocking** | jest.mock | Mock service dependencies, models, and gateways during unit testing |
| **Private function access** | rewire | Access private helper functions that are not directly exported, enabling unit-level isolation |
| **Frontend test compilation** | ts-jest | Compile and run TypeScript frontend unit tests without a separate build step |
| **Coverage reporting** | Jest coverage (v8) | Generate LCOV, JSON, and text-format coverage reports for backend and frontend |
| **API testing** | Postman | Execute REST API test collection with automated assertions against backend endpoints |
| **Code review** | Manual structured checklist | Systematic code quality checklist applied to backend and frontend source files |
| **Version control** | Git | Source code and test artifact management |
| **Test environment** | Docker / Docker Compose | Orchestrate backend, MongoDB, and Redis for a reproducible local testing environment |

### 4.4 McCall Quality Factors

| Factor | Applied | Rationale and Planned Method |
| :--- | :--- | :--- |
| **Correctness** | Yes | System test cases will verify that each FR and NFR module produces the correct observable output as specified in the SRS. Unit tests will verify the correctness of business logic in service and utility modules independently of the full system stack. |
| **Reliability** | Yes | System test cases for NFR-RELI will verify that all failure paths return descriptive error messages and that the system does not crash without user-facing notification. Code review will assess error-handling coverage in asynchronous backend paths and frontend components. |
| **Integrity** | Yes | System test cases for FR-AUTH, FR-ADMIN, and NFR-SEC will verify access control enforcement, token validation, role-based permission checks, and per-user data isolation. API tests via Postman will verify that protected endpoints reject unauthorized requests with appropriate HTTP status codes. |
| **Usability** | Yes | System test cases for NFR-USAB will verify multi-language display switching, dark/light/auto theme application, responsive layout on desktop and mobile viewports, and error message clarity in user-facing language. |
| **Efficiency** | Partial | Pagination enforcement on list screens will be verified in system tests. Full throughput testing under concurrent load is excluded from this plan due to environment limitations. |
| **Maintainability** | Partial | Code review will assess code structure, duplication, naming consistency, and component responsibility boundaries. Findings will be documented as defect evidence but are not subject to formal retest within this plan's scope. |
| **Portability** | No | The system targets web, mobile, and Docker-based deployment only. Cross-platform or cross-operating-system portability testing is outside the scope of this student project. |
| **Flexibility** | No | The system implements a fixed feature set aligned with the SRS. Extensibility testing beyond defined requirements is not planned. |

### 4.5 Schedule

The following schedule defines the sequence and activities of the quality assurance cycle for this project.

| Phase | Activity | Planned Deliverable |
| :--- | :--- | :--- |
| Phase 1 | SQA Plan preparation and approval | This SQAP document |
| Phase 2 | Code review against structured checklist (backend + frontend) | Code review report |
| Phase 3 | System test case design and execution (all FR/NFR modules, black-box techniques) | System test report and black-box coverage matrix |
| Phase 4 | Unit test and integration test design and execution (selected backend services and utilities; frontend utility) | Unit test scripts, coverage reports, and unit test report |
| Phase 5 | API test design and execution via Postman (REST interface for key backend modules) | Postman collection and API test execution report |

---

## 5. SQA ACTIVITIES

### 5.1 Product Assurance

#### 5.1.1 Features and Functions to Be Tested

The following features are within the active testing scope of this SQAP. All entries are grounded in the SRS functional and non-functional requirements.

**Functional Requirements**

| FR Module | Feature Name | Planned Testing Types |
| :--- | :--- | :--- |
| FR-AUTH | User registration, login, Google OAuth, logout, password reset | System test, API test (Postman) |
| FR-USER | Profile update, password change, avatar upload, UI preferences (language, theme, timezone), notification settings, account deactivation | System test |
| FR-GROUP | Create group, view group list, update group, delete group, manage members (add, remove, invite, role change, leave, join public group) | System test, API test (Postman) |
| FR-FOLDER | Create folder, view folder list, update folder, delete folder, folder access control | System test, API test (Postman) |
| FR-TASK | Create task, view task list (filter/search/sort), view task detail, update task, delete task, calendar view, Kanban view, view assigned tasks, repeat task, link tasks | System test, API test (Postman), Unit test (assignment logic, helper functions) |
| FR-ASSIGN | Assign member to task, remove assignment, view assignee list | System test, Unit test |
| FR-COMMENT | Add comment, edit comment, delete comment, view comment list, comment with file attachment, mention member | System test |
| FR-ATTACH | Upload file attachment to task, delete file attachment | System test |
| FR-CHECK | Add checklist item, edit checklist item, toggle completion, delete checklist item | System test |
| FR-TIME | Start time tracker, stop time tracker, concurrent timers by multiple users on the same task | System test |
| FR-CHAT | Send group message, view message history, edit message, delete message, reaction, file share, real-time update | System test |
| FR-DIRECT | View conversation list, start 1-1 conversation, send message, view history, edit/delete message, reaction, file share | System test |
| FR-NOTIF | View notification list, read/archive/delete notifications, auto-triggered notifications (task assignment, group invite, mention, etc.), real-time delivery, group invitation acceptance/rejection | System test, Unit test (notification producer logic) |
| FR-NOTE | Create note, view note list, view note detail, update note, delete note, favorite, share/privacy toggle, tag management | System test, Integration test (note service) |
| FR-ADMIN | Admin access control, system analytics/dashboard, user management (view list, view detail, create, update), lock/unlock account, role management (Super Admin only), send system notifications, view login history and action log | System test, API test (Postman) |
| FR-BOT | Chatbot context display (user tasks), save/evaluate suggested tasks, view group progress (PM/PO role), role-based restriction enforcement | System test |

**Non-Functional Requirements**

| NFR Identifier | Description | Planned Testing Types |
| :--- | :--- | :--- |
| NFR-SEC | Password hashing verification, unauthenticated access prevention, per-user data isolation, brute-force login protection | System test, Code review |
| NFR-USAB | Responsive layout (desktop and mobile), dark/light/auto theme switching, multi-language EN/VI, error message clarity | System test |
| NFR-RELI | All failed operations return descriptive error messages; the system does not crash without a user-visible notification | System test |
| NFR-SCALE | List screens (tasks, notifications, messages) apply pagination to limit data volume per request | System test, Code review |

---

#### 5.1.2 Features and Functions NOT to Be Tested

The following features are explicitly excluded from active testing within this SQAP. Each exclusion is supported by a concrete justification.

| Feature / Area | Reason for Exclusion |
| :--- | :--- |
| **Load and stress performance testing** | The test environment is a local Docker-based development setup not representative of production-scale infrastructure. Production-load simulation is not feasible within the project's resource and environment constraints. Performance testing is excluded from all phases of this plan. |
| **Google OAuth end-to-end flow** | Google OAuth depends on an external Google identity provider whose behavior cannot be controlled in the local test environment. A complete end-to-end flow requires Google Cloud credentials tied to a live project that are not available in the shared test setup. The feature is addressed at the SRS level and covered by system test design for observable outcomes; full automated end-to-end verification is excluded. |
| **Email delivery verification** | Password reset and invite email delivery depends on an external SMTP provider. Delivery outcome is a third-party dependency that cannot be deterministically asserted in the local test environment. |
| **Cloud file storage verification** | File upload persistence to the cloud storage provider depends on an external service. Upload outcomes are tested at the observable UI and API response level in system tests; internal storage state verification is excluded. |
| **Mobile application (React Native)** | The mobile application is part of the system scope per the SRS but is excluded from this test plan due to resource constraints. No mobile-specific test activities are planned within this cycle. |
| **Chatbot AI response correctness** | The chatbot relies on an external AI model for response generation. AI-generated content is inherently non-deterministic and dependent on a third-party model provider. Functional chatbot integration is addressed at the system test level through observable trigger and context scenarios; AI response quality and accuracy are excluded. |
| **Controller and route-layer unit tests** | Backend controllers and route files primarily orchestrate middleware and delegate business logic to service layers. These layers are more appropriately covered through integration and system-level testing and will not be targeted by dedicated unit test suites in this plan. |
| **Socket.IO behavior under concurrent load** | Real-time socket behavior under high concurrent connection counts is a load-related concern outside the scope of this plan. Socket correctness is addressed through single-session observable scenarios in system testing. |

---

#### 5.1.3 Black-Box Testing Techniques Applied

The following table maps the primary black-box testing techniques to each major feature area. For each entry, the technique is identified and its suitability is justified in the specific context of this project's requirements and constraints.

| Feature / FR Module | Primary Technique(s) | Justification |
| :--- | :--- | :--- |
| **FR-AUTH — Registration and login** | Equivalence Partitioning, Boundary Value Analysis, Error Guessing | The authentication input space divides naturally into valid and invalid equivalence classes: correct vs. incorrect email format, valid vs. too-short password, filled vs. empty required fields. Boundary analysis applies to field length constraints (name ≤ 100 characters, password minimum 8 characters with complexity rules). Error guessing is essential for adversarial failure scenarios: duplicate email registration, locked account login, and brute-force protection boundary. |
| **FR-AUTH — Password reset flow** | State Transition Testing, Equivalence Partitioning, Error Guessing | The password reset process passes through a defined sequence of observable states: request submitted → reset code sent → code entered → new password set → redirect to login. State Transition Testing verifies correct progression and rejection at each transition (expired code, mismatched new password). Error guessing covers invalid and reused reset codes. |
| **FR-USER — Profile update and preferences** | Equivalence Partitioning, Boundary Value Analysis | Input fields have clear constraints (name ≤ 100 characters, password complexity rules). Language and theme settings have a small discrete input space (EN/VI, Light/Dark/Auto). EP separates valid from invalid input classes; BVA verifies behavior at the exact character limit boundary. |
| **FR-GROUP — Creation and member management** | Boundary Value Analysis, Equivalence Partitioning, Decision Table Testing, State Transition Testing | Group name length (≤ 256 characters) and group member count limits require BVA. Member lifecycle passes through observable states: not a member → invited → accepted/declined → removed. Role-change outcomes depend on the combination of actor role and target state, modeled naturally as a decision table. |
| **FR-FOLDER — Create, update, access control** | Equivalence Partitioning, Decision Table Testing, Error Guessing | Folder name uniqueness within a group divides inputs into two classes: unique vs. duplicate. Folder access control depends on a combination of the user's group role and the folder's visibility setting, requiring a decision table. Error guessing targets unauthorized access attempts by non-permitted members. |
| **FR-TASK — Create, update, delete** | Boundary Value Analysis, Equivalence Partitioning, Decision Table Testing, Error Guessing | Multiple field constraints — title ≤ 200 characters, description ≤ 2000 characters, maximum 10 labels each ≤ 30 characters — require EP (valid vs. over-limit) and BVA (exact boundary values). Permission to create, update, or delete depends on role and group membership, requiring a decision table. Error guessing covers invalid status/priority values and task access by non-group-members. |
| **FR-TASK — Kanban and Calendar views** | Use Case / Scenario-based Testing | These features are view-mode renderings with observable outcomes. Scenario-based testing verifies correct task grouping by status in the Kanban view and correct date-based placement in the Calendar view, including month-navigation behavior. |
| **FR-TASK — Repeat task** | State Transition Testing, Boundary Value Analysis | The repeat task configuration transitions through observable states: not configured → recurrence active → next occurrence generated. BVA applies to recurrence interval values and end-date or occurrence-count boundary conditions. |
| **FR-ASSIGN — Assign and remove members** | Equivalence Partitioning, Decision Table Testing, Boundary Value Analysis | Assignable vs. non-assignable user classes (group member vs. non-member, active vs. locked account) form EP partitions. The maximum-assignee-per-task constraint defines a BVA boundary. Actor permission to assign depends on role and task ownership, requiring a decision table. |
| **FR-COMMENT — Add, edit, delete** | Equivalence Partitioning, Boundary Value Analysis, Error Guessing | Comment content has length constraints (≤ 2000 characters per comment, ≤ 200 comments per task), requiring EP (empty vs. valid vs. over-limit) and BVA (exact boundary values). Error guessing is the primary technique for attempting to edit or delete another user's comment, which is a frequently misused interaction path. |
| **FR-ATTACH — Upload and delete** | Equivalence Partitioning, Boundary Value Analysis, Error Guessing | The file attachment count limit (≤ 20 per task) defines a BVA boundary. Allowed MIME types vs. unsupported file types form the primary EP partition. Error guessing covers deletion of a non-existent attachment and upload attempts when the task is at maximum capacity. |
| **FR-CHECK — Checklist management** | Boundary Value Analysis, Equivalence Partitioning, State Transition Testing | The 50-item checklist limit per task is a BVA boundary. Checklist item content (empty vs. valid) forms an EP partition. Toggle completion transitions each item between two observable states (incomplete → complete → incomplete), making State Transition Testing appropriate. |
| **FR-TIME — Time tracker** | State Transition Testing, Equivalence Partitioning, Error Guessing | The timer transitions through observable states: idle → running → stopped, with elapsed time persisted in the time entry record. Concurrent timers for multiple users on the same task constitute a distinct valid scenario class. Error guessing covers stopping a timer when none is running for the current user. |
| **FR-CHAT and FR-DIRECT — Messaging** | Equivalence Partitioning, Boundary Value Analysis, State Transition Testing, Error Guessing, Use Case / Scenario-based Testing | Message length constraints (≤ 5000 characters) require EP and BVA. Message state (sent → edited → deleted) requires State Transition Testing. Real-time delivery to online members is verified via scenario-based testing. Error guessing covers non-member message sending and attempts to edit another user's message. |
| **FR-NOTIF — Notification management** | State Transition Testing, Use Case / Scenario-based Testing, Equivalence Partitioning | Notification state transitions (unread → read → archived → deleted) are the primary test concern. Auto-triggered notification scenarios — task assignment, group invitation, @mention, task completion — require scenario-based testing to verify the complete trigger chain from event to user-visible delivery. EP partitions read from unread notifications for filter behavior. |
| **FR-ADMIN — User management and access control** | Equivalence Partitioning, Decision Table Testing, State Transition Testing, Error Guessing | Admin-only operations apply to three distinct actor role classes (regular user, admin, Super Admin) with different permitted actions per role, which maps naturally to a decision table. Account state transitions (active → locked → unlocked) require State Transition Testing. Error guessing targets unauthorized admin operations by regular users and Super-Admin-only operations by regular admin users. |
| **FR-BOT — Chatbot features** | Equivalence Partitioning, Error Guessing, Use Case / Scenario-based Testing | Group progress access is restricted to PM/PO roles, forming two clear EP classes (permitted role vs. non-permitted role). Scenario-based testing verifies the complete chatbot context display flow and the suggested-task evaluation cycle. Error guessing covers access to PM/PO-restricted views by members with other roles. |
| **NFR-SEC — Security requirements** | Error Guessing, Use Case / Scenario-based Testing | Security test cases are inherently adversarial. Error guessing and scenario-based testing verify password storage protection, post-logout session invalidation, cross-user data isolation, and brute-force throttling. EP and BVA do not apply because the test objective is to expose failure under misuse rather than to partition normal input ranges. |

---

### 5.2 Process Assurance

#### 5.2.1 Review Activities

Process assurance in this project is carried out through structured checklist-based reviews applied at multiple stages of the development lifecycle. Four review types are planned, each using a dedicated checklist:

| Review Type | Artifact Under Review | Scope |
| :--- | :--- | :--- |
| **SRS Review** | Software Requirements Specification | Verify completeness, consistency, correctness, and verifiability of all FR and NFR requirements prior to test case design |
| **Software Design Description Review** | System architecture and module design | Verify that the design correctly reflects SRS requirements and that the structure is clear, consistent, and implementable |
| **Design Review** | Detailed design of key system components | Verify design decisions at the component level: data model integrity, API contract clarity, and interface correctness |
| **Code Review** | Backend and frontend source code | Verify implementation quality against a 60-item structured checklist covering code correctness, security, error handling, and maintainability |

All checklist-based reviews apply a three-valued result per item: **Pass** (satisfied, no defect found), **Fail** (at least one concrete defect identified), or **N/A** (item does not apply to the reviewed scope or technology stack). Every Fail and N/A result must be accompanied by a written note providing specific evidence and reasoning.

**Code Review — checklist dimensions**

The code review checklist covers the following quality dimensions for the backend and frontend tiers (mobile application excluded):

- Code formatting, naming conventions, and inline documentation adequacy
- Control flow correctness: loop termination, branch conditions, arithmetic and relational expressions
- Database usage: indexing for frequently queried fields, query field projection, pagination enforcement, schema validation on updates
- Error handling: asynchronous handler safety, consistent API response structure, concealment of internal error details from end users
- Input validation: request body fields, path parameters, and query parameters at the route boundary
- Security: authentication enforcement on protected routes, role-based access control, secrets management, token storage practices
- Concurrency: use of atomic update operators and transactions for multi-step write operations
- File upload safety: MIME type enforcement, file size limits, upload error handling at the route level
- Real-time (Socket.IO): room join/leave authorization, listener cleanup on disconnect, duplicate listener prevention
- Frontend state management: context usage, stale state in asynchronous callbacks, loading and error state coverage
- Role-based UI restrictions: consistency between frontend display guards and backend enforcement

#### 5.2.2 Unit Test Coverage Plan

Unit and integration testing will target selected backend service and utility modules where business logic is sufficiently self-contained for isolated verification. The planned test coverage scope is as follows:

**Backend — Unit level (pure logic, no database)**

| Module | Source | Test Focus |
| :--- | :--- | :--- |
| Notification producer | `backend/src/services/notification.producer.js` | Internal call contract; correct notification record construction |
| Task assignment logic | `backend/src/services/task.service.js` | Role-based assignment permission matrix |
| Task helper functions | `backend/src/services/task.service.js` | Private helper behavior, accessed via `rewire` |
| Date helper | `backend/src/utils/dateHelper.js` | Deterministic date calculation utility |
| Group permissions | `backend/src/utils/groupPermissions.js` | Permission matrix for all group roles |
| Validation helper | `backend/src/utils/validationHelper.js` | Input sanitization and validation logic |

**Backend — Integration level (with real MongoDB test database)**

| Module | Source | Test Focus |
| :--- | :--- | :--- |
| Notification producer | `backend/src/services/notification.producer.js` | Database persistence and non-persistence behavior |
| Task assignment | `backend/src/services/task.service.js` | Role permission behavior with DB-observable state |
| Task helpers | `backend/src/services/task.service.js` | Behavior mapping verifiable through `createTask`/`getAllTasks` |
| Note service | `backend/src/services/note.service.js` | Create, update, bookmark operations against real DB |

Integration tests will use a dedicated test database with run-scoped cleanup markers to prevent residual data from affecting subsequent test runs.

**Frontend — Unit level**

| Module | Source | Test Focus |
| :--- | :--- | :--- |
| Group role utilities | `frontend/app/utils/groupRoleUtils.ts` | UI permission utility functions for group role access control |

Each test module will be accompanied by a dedicated per-module checklist that traces individual test cases to the source functions under test and records Pass/Fail outcomes at the test-case level.

#### 5.2.3 Traceability

Traceability between requirements, test cases, and implementation will be maintained through the following planned chain:

- The SRS defines the authoritative FR and NFR identifiers that anchor all test case design.
- System test cases will be organized per FR module, with each test case mapped to one or more SRS requirement IDs.
- A black-box testing coverage matrix will map each system test case group to its applicable technique, input classes, and observable expected behavior.
- Unit and integration test checklists will trace each automated test case to the specific source function or behavior being verified.
- A unit test scope report will document the complete mapping between source modules and their corresponding test files, status, and coverage data.

---

## 6. ADDITIONAL CONSIDERATIONS

### 6.1 Environmental Limitations

All testing activities described in this SQAP will be conducted in a local development environment using Docker Compose to orchestrate the backend service, MongoDB, and Redis. This environment does not replicate production-scale infrastructure. The following limitations apply:

- API response time measurements will not be representative of production throughput or latency under real user load.
- Concurrent-user scenarios will be limited to what a single development machine can simulate.
- Real-time Socket.IO behavior will be tested through single-session or low-concurrency scenarios only.
- The chatbot service requires a live external AI model endpoint; testing will be limited to observable integration behavior within the local environment.

### 6.2 Excluded Test Categories

The following test categories are explicitly outside the scope of this SQAP:

| Category | Reason |
| :--- | :--- |
| Performance testing (load/stress) | The local test environment is not representative of production-scale infrastructure. Load simulation is outside the resource constraints of this project. |
| Browser automation (end-to-end UI) | Automated browser-level testing is not included in the planned quality activities for this cycle. |
| Mobile application testing | Mobile client testing is deferred due to resource constraints. No mobile-specific test activities are planned within this cycle. |
| External service integration verification | Google OAuth, cloud file storage, and SMTP email delivery depend on third-party providers outside team control. These cannot be verified deterministically in the local test environment. |
| AI response content validation | Chatbot response quality depends on a third-party AI model and is inherently non-deterministic. |

### 6.3 Defect Tracking and Communication

In the absence of a dedicated defect tracking system, defects identified during code review and test execution will be communicated through available team channels and documented within the corresponding quality activity report. Code review failures will be recorded with specific file-level evidence. Test case failures will be recorded alongside their test case ID and observed versus expected result.

Integration test runs will operate against an isolated test database and must clean up all test data upon completion to prevent interference with subsequent runs.

---

## 7. SQA RECORDS

The following records are to be produced and retained as the quality assurance deliverables for this project.

| Record | Description |
| :--- | :--- |
| Software Requirements Specification | The requirements baseline document that defines all FR and NFR identifiers serving as the input to test case design |
| SRS review report | Results of the structured checklist applied to the Software Requirements Specification, including Pass/Fail/N/A verdicts and supporting evidence |
| Software Design Description review report | Results of the structured checklist applied to the system design description |
| Design review report | Results of the structured checklist applied to detailed component-level design |
| Code review report | Results of the 60-item structured checklist applied to backend and frontend source code, including Pass/Fail/N/A verdicts and supporting evidence for each item |
| System test report | Documented test cases organized per FR/NFR module, covering input, expected result, actual result, and Pass/Fail verdict; accompanied by a black-box testing coverage matrix mapping each test case to its applied technique |
| Backend unit test scripts | Automated Jest test files targeting service and utility modules at the unit level |
| Backend integration test scripts | Automated Jest test files targeting service modules with real database state verification |
| Frontend unit test scripts | Automated Jest/ts-jest test files targeting frontend utility modules |
| Unit test coverage reports | Jest-generated LCOV and summary reports indicating statement, branch, and line coverage for tested backend and frontend modules |
| Unit test report | A document summarizing the unit testing scope, per-module status, source-to-test mapping, and coverage outcome |
| Per-module unit test checklists | Checklist documents tracing individual test cases to source functions and recording Pass/Fail results at the test-case level |
| Postman API test collection | The Postman collection defining test requests and automated assertions for backend REST endpoints |
| API test execution report | Results of Postman collection runs, including Pass/Fail status per request and assertion |

---

**Appendix: Quality Activity Deliverable Summary**

| Phase | Activity | Deliverable |
| :--- | :--- | :--- |
| Phase 1 | SQA Plan | This SQAP document |
| Phase 2 | Code review (SRS review, design review, software design description review, source code review) | SRS review report, design review report, software design description review report, code review report |
| Phase 3 | System testing | System test report, black-box coverage matrix |
| Phase 4 | Unit and integration testing | Test scripts, coverage reports, unit test report, per-module checklists |
| Phase 5 | API testing | Postman collection, API test execution report |
