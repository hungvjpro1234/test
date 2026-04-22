# JMeter Performance Execution Report

## 1. Document Information

| Field | Value |
|---|---|
| Project | Todo List App |
| Report Type | JMeter Performance Execution Report |
| Execution Date | April 22, 2026 |
| Workspace | `D:\ToDoList-3\Todo_list_app` |
| Source Test Plan | `test-docs/performance/JMETER_PERFORMANCE_TEST_PLAN.md` |
| JMeter Plan | `tool-test/jmeter/TodoApp_Perf.jmx` |
| Primary Result Sets | `html-20260422-025220`, `html-20260422-025320` |

## 2. Executive Summary

This report documents the execution of the 20 JMeter performance scenarios defined in `test-docs/performance/JMETER_PERFORMANCE_TEST_PLAN.md`.

The main finding is that the old execution problems were partially caused by test-environment noise rather than application behavior:

- `429 Too Many Requests` came from the local authentication rate limiter.
- `304 Not Modified` came from JMeter `HTTP Cache Manager`.
- `403 Forbidden` on task creation came from invalid performance test permissions rather than from the target endpoint itself.

Those issues were corrected before the new run:

- local perf backend was executed on `localhost:8081`
- local auth/API rate limit was disabled for perf execution only
- `HTTP Cache Manager` in JMeter was disabled
- `performance.primary@test.com` was reseeded with `groupRole=product_owner`
- JMeter seed data and IDs were regenerated from the current database

After the correction:

- the **smoke run** became valid and stable enough to prove the test harness is now measuring the API rather than the previous environment artifacts
- the **full run** still failed almost completely, but now the failure mode changed into real overload symptoms: `SocketTimeoutException: Read timed out` and `SocketException: Connection reset`

Therefore, the rerun is considered useful and valid:

- the setup problems were fixed
- the full-load result now exposes actual backend scalability or resilience limits under the defined load profile

## 2A. Requirement Fulfillment

The following requested items have been completed:

| Requested Item | Status | Evidence |
|---|---|---|
| Create test cases | Completed | 20 formal JMeter scenarios were defined from `JMETER_PERFORMANCE_TEST_PLAN.md` and converted in this report into detailed test cases with ID, description, objective, expected output, pass/fail, and failure notes |
| Create test scripts | Completed | JMeter script `tool-test/jmeter/TodoApp_Perf.jmx` was prepared and corrected for valid execution; supporting scripts and config include `run-jmeter.ps1`, `scripts/seed-perf-data.js`, `config/env.local.properties`, and `config/env.rerun-smoke.properties` |
| Execute test and generate report for a sample environment | Completed | Tests were executed against the sample/local environment `http://localhost:8081`, and reports were generated in `tool-test/jmeter/results/html-20260422-025220` and `tool-test/jmeter/results/html-20260422-025320` |

This means the scope of the requirement below has been fulfilled:

> Test performance using JMeter, create test cases, create test scripts, execute test, and generate report for a sample environment.

## 3. Scope and Objective

This execution follows the scope and KPI from `JMETER_PERFORMANCE_TEST_PLAN.md`:

- `NFR-PERF-1`: core operations should respond within acceptable latency thresholds
- `NFR-PERF-2`: large-list APIs should support paged or chunked data loading
- 20 scenarios must remain traceable to the original performance plan

The rerun objective was:

1. remove invalid environmental noise from the previous run
2. keep the purpose of the original performance plan unchanged
3. determine whether the application can meet the expected load profile
4. separate false failures from actual performance bottlenecks

## 4. Environment and Preparation

### 4.1 Execution Environment

| Item | Value |
|---|---|
| Backend target for rerun | `http://localhost:8081` |
| Protocol | HTTP |
| Base path | `/api` |
| Execution tool | Apache JMeter 5.6.3 |
| Runtime | Java 24 |
| Test mode | Non-GUI / headless |

### 4.2 Changes Made Before Execution

The following changes were applied to make the run align with the intent of the performance plan:

1. `backend/src/middlewares/rateLimiter.js`
   - kept the local toggle mechanism for disabling rate limit via environment variables
   - this prevents local anti-bruteforce behavior from invalidating the performance baseline

2. `tool-test/jmeter/TodoApp_Perf.jmx`
   - disabled `HTTP Cache Manager`
   - this prevents `304 Not Modified` responses from polluting result interpretation

3. `tool-test/jmeter/scripts/seed-perf-data.js`
   - reseeded performance data from the current database
   - set `performance.primary@test.com` to `groupRole=product_owner`
   - refreshed `groupId`, `taskId`, `conversationId`, and `notificationId`
   - regenerated `env.local.properties`
   - regenerated `env.rerun-smoke.properties`

### 4.3 Why These Changes Do Not Conflict With the Test Plan

These corrections do not change the objective of the original performance plan:

- disabling local rate limit does not reduce the intended load profile of the business APIs; it only removes an unrelated protective gate
- disabling `HTTP Cache Manager` makes the test closer to the documented assertion requirement of `2xx` responses and payload validation
- fixing the test account role for `PERF-08` and `PERF-09` does not soften the scenario; it only ensures that the scenario is actually executable as intended

## 5. Execution Summary

Two runs were used for evaluation:

### 5.1 Smoke Run

| Field | Value |
|---|---|
| Env file | `tool-test/jmeter/config/env.rerun-smoke.properties` |
| Result file | `tool-test/jmeter/results/perf-result-20260422-025220.jtl` |
| HTML report | `tool-test/jmeter/results/html-20260422-025220/index.html` |
| Total samples | 218 |
| Error count | 1 |
| Error rate | 0.46% |

Smoke run response-code distribution:

| Response Code | Count |
|---|---:|
| 200 | 203 |
| 201 | 15 |

Smoke run interpretation:

- no `429`
- no `304`
- no `403`
- only one failed assertion remained
- the remaining failure was a true performance miss: `PERF-01 Login` took `2764ms`, above the `2000ms` threshold

This proves the test harness is now valid enough to perform a real baseline measurement.

### 5.2 Full Run

| Field | Value |
|---|---|
| Env file | `tool-test/jmeter/config/env.local.properties` |
| Result file | `tool-test/jmeter/results/perf-result-20260422-025320.jtl` |
| HTML report | `tool-test/jmeter/results/html-20260422-025320/index.html` |
| Total samples | 371,608 |
| Error count | 370,951 |
| Error rate | 99.82% |

Full run dominant failure signatures:

- `java.net.SocketTimeoutException: Read timed out`
- `java.net.SocketException: Connection reset`

Full run interpretation:

- the setup issues from the old execution were removed
- the application still failed heavily under full load
- the failure pattern indicates actual backend instability under concurrency, not the previous test harness issues

## 6. Overall Result Assessment

### 6.1 Status by Run

| Run Type | Goal | Status | Conclusion |
|---|---|---|---|
| Smoke | validate corrected test harness | Pass with minor threshold miss | Harness is valid; old false failures removed |
| Full | execute planned load profile | Fail | Backend cannot sustain the current full-load profile |

### 6.2 Main Technical Conclusion

The current system behavior should be interpreted in two layers:

1. **Test harness correction result**
   - successful
   - the rerun removed false-negative conditions caused by rate limit, cache validation, and bad permissions

2. **Actual application scalability result**
   - unsuccessful
   - the backend now shows genuine overload behavior under the intended load

## 7. Detailed Test Case Report

The table below converts all 20 performance scenarios into formal test cases with:

- ID
- test description
- test objective
- expected output
- pass/fail result
- note with the most relevant reason for failure

| ID | Test Description | Test Objective | Expected Output | Pass/Fail | Note / Failure Reason |
|---|---|---|---|---|---|
| PERF-01 | Execute `POST /api/auth/login` under planned auth load | Verify login returns valid token within threshold and with low error rate | HTTP `2xx`, valid `accessToken`, p95 `<= 2000ms`, error `< 1%` | Fail | Smoke run already showed one real threshold breach at `2764ms`. Full run reached `100%` failure with timeouts and resets, indicating login is an early bottleneck. |
| PERF-02 | Execute `POST /api/auth/refresh-token` repeatedly | Verify refresh flow remains stable and fast under sustained load | HTTP `2xx`, refreshed token valid, p95 `<= 1500ms`, error `< 1%` | Fail | Full run error rate `94.93%`. Requests failed with timeout/reset, likely amplified by unstable auth setup and backend overload. |
| PERF-03 | Execute default task list `GET /api/tasks?page=1&limit=20` | Verify paged task listing performs within KPI | HTTP `2xx`, task list payload present, p95 `<= 3000ms`, error `< 1%` | Fail | Full run error rate `99.93%`. Old `304` issue was removed, so failure now reflects actual inability to serve the endpoint at planned concurrency. |
| PERF-04 | Execute filtered task list `GET /api/tasks?...filters...` | Verify filtered listing remains performant under load | HTTP `2xx`, filtered result payload valid, p95 `<= 3000ms` | Fail | Full run error rate `99.93%`. Failure is no longer caused by cache; requests are now failing due to overload symptoms. |
| PERF-05 | Execute task search `GET /api/tasks?search=keyword` | Verify search stays within target latency | HTTP `2xx`, search result payload valid, p95 `<= 3000ms` | Fail | Full run error rate `99.93%`. Search path also collapses under full load. |
| PERF-06 | Execute task detail `GET /api/tasks/:id` | Verify single-task detail retrieval remains stable | HTTP `2xx`, task detail payload valid, p95 `<= 2500ms` | Fail | Full run error rate `99.94%`. Backend cannot reliably serve the endpoint under concurrency. |
| PERF-07 | Execute task comments `GET /api/tasks/:id/comments?page=1&limit=20` | Verify comment paging endpoint meets target latency | HTTP `2xx`, comment list payload valid, p95 `<= 3000ms` | Fail | Full run error rate `99.93%`. This endpoint passed smoke but collapsed under full concurrency. |
| PERF-08 | Execute task creation `POST /api/tasks` | Verify task creation works within KPI and acceptable error rate | HTTP `201/200`, created task payload valid, p95 `<= 2500ms`, error `< 1%` | Fail | `403` permission issue was fixed before rerun. Full run error rate remained `99.76%`, so the remaining failure is due to overload, not authorization. |
| PERF-09 | Execute task update `PATCH /api/tasks/:id` | Verify task update remains stable under write load | HTTP `200`, updated task payload valid, p95 `<= 2500ms` | Fail | Full run error rate `99.76%`. Write operations degrade heavily when the backend is saturated. |
| PERF-10 | Execute kanban board load `GET /api/tasks/kanban` | Verify large board view remains usable within KPI | HTTP `2xx`, board payload valid, p95 `<= 3500ms` | Fail | Full run error rate `99.94%`. Large-read endpoint becomes unstable at scale. |
| PERF-11 | Execute calendar load `GET /api/tasks/calendar` | Verify calendar data can be served within threshold | HTTP `2xx`, calendar payload valid, p95 `<= 3500ms` | Fail | Full run error rate `99.94%`. Similar overload pattern as kanban. |
| PERF-12 | Execute group switch `POST /api/groups/:id/switch` | Verify current working group can be switched quickly and safely | HTTP `200`, current group updated correctly, p95 `<= 2000ms` | Fail | Full run error rate `99.86%`. Switch requests fail when login/session setup is already degraded. |
| PERF-13 | Execute group task list `GET /api/groups/:id/tasks?page=1&limit=20` | Verify group-scoped paged task retrieval after switch | HTTP `2xx`, group task list valid, p95 `<= 3000ms` | Fail | Full run error rate `99.86%`. Endpoint passed smoke but not full concurrency. |
| PERF-14 | Execute notifications list `GET /api/notifications?page=1&limit=20` | Verify paged notification retrieval remains within KPI | HTTP `2xx`, notification payload valid, p95 `<= 3000ms` | Fail | Full run error rate `99.82%`. Requests fail mainly by timeout/reset. |
| PERF-15 | Execute unread count `GET /api/notifications/unread-count` | Verify unread polling remains fast and stable | HTTP `2xx`, unread count valid, p95 `<= 1500ms` | Fail | Full run error rate `99.86%`. Polling endpoint becomes unreliable under heavy concurrent traffic. |
| PERF-16 | Execute mark-read flows | Verify notification read-state update operations remain performant | HTTP `2xx`, state updated correctly, p95 `<= 2500ms` | Fail | Both mark-read flows showed very high failure rates in full run. This is now a real write-path saturation issue. |
| PERF-17 | Execute group chat history `GET /api/chat/:groupId/messages?page=1&limit=50` | Verify paged group-chat retrieval at scale | HTTP `2xx`, paged chat payload valid, p95 `<= 3500ms` | Fail | Full run error rate `99.87%`. Group chat history becomes unstable under target traffic. |
| PERF-18 | Execute group chat send `POST /api/chat/:groupId/messages` | Verify group chat message creation remains within threshold | HTTP `201/200`, message created successfully, p95 `<= 2000ms` | Fail | Full run error rate `99.85%`. Real backend overload on chat write path. |
| PERF-19 | Execute direct chat history `GET /api/chat/direct/conversations/:id/messages?page=1&limit=50` | Verify direct-message history paging remains performant | HTTP `2xx`, paged DM history valid, p95 `<= 3500ms` | Fail | Full run error rate `99.84%`. Similar failure pattern to group chat history. |
| PERF-20 | Execute admin dashboard and paged user list | Verify admin analytics and user management pages remain responsive | HTTP `2xx`, payloads valid, p95 `<= 3000ms` | Fail | Smoke run passed, but full run error rates became `99.86%` and `99.89%`, showing global degradation rather than endpoint-specific permission issues. |

## 8. Pass/Fail Interpretation

### 8.1 Smoke Interpretation

Smoke run should be treated as the corrected baseline validation run.

Why smoke matters:

- it proves the rerun setup is no longer invalidated by rate limiting
- it proves the JMeter plan no longer fails because of cache-driven `304`
- it proves write scenarios no longer fail because of wrong user permissions
- it shows at least one threshold miss that is likely real, not artificial

Smoke conclusion:

- the test harness is valid
- the system is not fully healthy even at low concurrency, because `PERF-01 Login` already exceeded threshold once

### 8.2 Full Interpretation

Full run should be treated as the actual performance assessment against the planned load profile.

Why full run failed:

- login flows became unstable early
- once login failed, token-dependent flows degraded across all thread groups
- under the configured concurrency, the backend began returning connection resets and read timeouts
- this indicates service saturation or instability under load rather than business-rule failures

What full run does **not** indicate anymore:

- it does not indicate bad path configuration
- it does not indicate bad JMeter cache behavior
- it does not indicate missing task-creation permissions

## 9. Root Cause Analysis

### 9.1 Previously Observed False Failures

The older execution showed large quantities of:

- `429 Too Many Requests`
- `401 Unauthorized`
- `304 Not Modified`
- `403 Forbidden`

Those failures were not valid indicators of backend performance quality for the following reasons:

1. `429 Too Many Requests`
   - caused by local auth rate-limiter behavior
   - not part of the original business KPI for the measured scenarios
   - artificially blocked login, then cascaded into token-dependent failures

2. `304 Not Modified`
   - caused by JMeter cache validation
   - conflicted with the execution plan requirement to validate `2xx` responses and payload content
   - created false failures for list endpoints

3. `403 Forbidden`
   - caused by insufficient role assignment in seed data
   - prevented `PERF-08` from representing the real task-creation scenario

### 9.2 Current Valid Failure Pattern

After corrections, the full run failed mostly with:

- `Read timed out`
- `Connection reset`

These are materially different from the previous run and indicate a real runtime problem:

- the backend cannot sustain the configured concurrency
- request processing is delayed beyond socket timeout windows
- some connections are being reset during overload

### 9.3 Why the Error Rate Becomes So High

The current JMeter plan has multiple thread groups executing concurrently:

- Auth
- TaskRead
- TaskWrite
- Group
- Notification
- Chat
- Admin

Once auth and login latency become unstable:

- token extraction becomes unreliable
- refresh flow becomes unreliable
- downstream flows continue to fire but operate against degraded or missing session state
- the system spends more time handling failing or half-open operations
- timeouts and connection resets become widespread

This creates a cascading degradation pattern rather than isolated endpoint failures.

## 10. Key Findings by Category

### 10.1 Authentication

- `PERF-01` and `PERF-02` are among the earliest and most important failure signals
- even smoke showed login threshold pressure
- full run indicates auth is a likely front-door bottleneck

### 10.2 Task APIs

- task read and write scenarios passed in smoke
- task scenarios failed almost entirely in full run
- this suggests task endpoints themselves are functional, but not resilient enough at target concurrency

### 10.3 Notification APIs

- notifications also behaved normally in smoke
- under full traffic they failed almost as badly as task flows
- likely affected by the same shared bottleneck in backend or database access

### 10.4 Chat and Direct Messaging

- chat and direct-message history/send scenarios passed smoke
- they became highly unstable under full load
- these may be expensive due to message retrieval patterns, large payloads, or shared DB contention

### 10.5 Admin APIs

- admin dashboard and user-list endpoints were not the original source of failure
- they also became unstable under full load
- this suggests a broad system-level performance problem rather than a single module issue

## 11. Acceptance Evaluation Against the Original Plan

### 11.1 Acceptance Criteria From the Plan

The original plan expects:

- all 20 cases completed
- measurable baseline report
- meaningful later reruns after optimization
- identification of bottlenecks
- recommendations for optimization

### 11.2 Acceptance Result

| Criterion | Result | Note |
|---|---|---|
| 20 scenarios executed | Yes | All scenarios were executed in smoke and full runs |
| Valid baseline created | Yes | Smoke run is a valid corrected baseline |
| Full planned load passed | No | Full run failed heavily under real overload |
| False failures removed | Yes | `429`, `304`, and `403` issues were corrected |
| Real bottlenecks exposed | Yes | Auth and shared backend capacity issues are now clearly visible |

## 12. Recommended Next Actions

### 12.1 Immediate Technical Actions

1. Measure backend CPU, memory, event-loop delay, and MongoDB latency during full run
2. Collect backend logs during load to correlate timeout spikes with internal failures
3. Review HTTP server timeout settings and connection handling
4. Investigate login/auth pipeline first, because it is the first major stress point

### 12.2 Load-Test Strategy Actions

1. Add intermediate load tiers:
   - 25% of planned load
   - 50% of planned load
   - 75% of planned load
2. Determine the actual break point before the current full profile
3. Re-run after each optimization to build comparative baselines

### 12.3 Data and Query Optimization Actions

1. Inspect MongoDB indexes for:
   - login and token refresh paths
   - task list and task search
   - notifications
   - chat message retrieval
2. Review response payload sizes for:
   - kanban
   - group chat history
   - direct chat history
   - admin user list
3. Evaluate whether payload trimming or projection is needed

## 13. Final Conclusion

This rerun should be considered a successful correction of the test setup, but an unsuccessful performance result for the application at the planned full-load profile.

The key value of this execution is that it converted the result from a misleading environment-failure report into a meaningful engineering signal:

- before correction, the test was polluted by rate-limit, cache, and permission issues
- after correction, the smoke run validated the test harness
- after correction, the full run showed genuine backend overload behavior

Final status:

- **Test harness validity:** improved and acceptable
- **Smoke baseline:** mostly acceptable, with one real login threshold miss
- **Full planned load:** failed
- **Primary interpretation:** the system currently does not meet the intended performance profile under the defined concurrent load

## 14. Result References

### Smoke Run

- HTML report: `tool-test/jmeter/results/html-20260422-025220/index.html`
- JTL data: `tool-test/jmeter/results/perf-result-20260422-025220.jtl`

### Full Run

- HTML report: `tool-test/jmeter/results/html-20260422-025320/index.html`
- JTL data: `tool-test/jmeter/results/perf-result-20260422-025320.jtl`
