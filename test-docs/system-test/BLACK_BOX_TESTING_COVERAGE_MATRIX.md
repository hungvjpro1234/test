# BLACK_BOX_TESTING_COVERAGE_MATRIX

## Summary

- Total number of test case files scanned: **91**
- Total number of feature / requirement entries in this matrix: **91**
- Total number of FR / NFR folders represented: **17**
- Techniques used: **Boundary Value Analysis, Decision Table Testing, Equivalence Partitioning, Error Guessing / Negative Testing, State Transition Testing, Use Case / Scenario-based Testing**
- Techniques missing or weakly represented:
  - Decision Table Testing is only weakly represented and is not explicitly labeled in most feature files.
  - Boundary Value Analysis appears selectively rather than systematically across all input-heavy features.
  - State Transition Testing is present in several status-driven features, but it is not always declared clearly in the source test documents.
- Overall conclusion:
  - The current system-test documents are predominantly black-box oriented because expected outcomes are described through observable user input, UI behavior, API-visible response, validation feedback, and business-flow result.
  - The revised matrix below improves traceability by mapping black-box techniques at the individual feature-file level rather than the folder level.

## Coverage Matrix


<table>
<colgroup>
  <col style="width: 7%;">
  <col style="width: 8%;">
  <col style="width: 9%;">
  <col style="width: 8%;">
  <col style="width: 10%;">
  <col style="width: 23%;">
  <col style="width: 14%;">
  <col style="width: 9%;">
  <col style="width: 8%;">
  <col style="width: 8%;">
</colgroup>
<thead>
  <tr>
    <th>Feature /<br>FR ID</th>
    <th>Feature<br>Name</th>
    <th>Test Case<br>File</th>
    <th>TC_IDs</th>
    <th>Black-box<br>Technique</th>
    <th>Reason for<br>Selection</th>
    <th>Input Classes /<br>Conditions</th>
    <th>Boundary<br>Values</th>
    <th>Observable Expected<br>Behavior</th>
    <th>Notes /<br>Gaps</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>FR-ADMIN-1</td>
    <td>Kiểm soát truy cập</td>
    <td>TC_<wbr>ADMIN_<wbr>ACCESS_<wbr>CONTROL<wbr>.md</td>
    <td>TC_<wbr>ADMIN_<wbr>1_<wbr>01<wbr>...<wbr>TC_<wbr>ADMIN_<wbr>1_<wbr>07</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Authorized vs unauthorized actor<br>valid vs invalid target record<br>confirm vs cancel branch<br>and active vs inactive user/account state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-ADMIN-2</td>
    <td>Thống kê & Phân tích</td>
    <td>TC_<wbr>ADMIN_<wbr>ANALYTICS<wbr>.md</td>
    <td>TC_<wbr>ADMIN_<wbr>2_<wbr>01<wbr>...<wbr>TC_<wbr>ADMIN_<wbr>2_<wbr>09</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Authorized vs unauthorized actor<br>valid vs invalid target record<br>confirm vs cancel branch<br>and active vs inactive user/account state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-ADMIN-4</td>
    <td>Khóa & Mở khóa tài khoản</td>
    <td>TC_<wbr>ADMIN_<wbr>LOCK_<wbr>UNLOCK<wbr>.md</td>
    <td>TC_<wbr>ADMIN_<wbr>4_<wbr>01<wbr>...<wbr>TC_<wbr>ADMIN_<wbr>4_<wbr>10</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Authorized vs unauthorized actor<br>valid vs invalid target record<br>confirm vs cancel branch<br>and active vs inactive user/account state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-ADMIN-7</td>
    <td>Lịch sử đăng nhập & Log hành động</td>
    <td>TC_<wbr>ADMIN_<wbr>LOG<wbr>.md</td>
    <td>TC_<wbr>ADMIN_<wbr>7_<wbr>01<wbr>...<wbr>TC_<wbr>ADMIN_<wbr>7_<wbr>10</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Authorized vs unauthorized actor<br>valid vs invalid target record<br>confirm vs cancel branch<br>and active vs inactive user/account state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-ADMIN-6</td>
    <td>Gửi thông báo hệ thống</td>
    <td>TC_<wbr>ADMIN_<wbr>NOTIFICATION<wbr>.md</td>
    <td>TC_<wbr>ADMIN_<wbr>6_<wbr>01<wbr>...<wbr>TC_<wbr>ADMIN_<wbr>6_<wbr>08</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Authorized vs unauthorized actor<br>valid vs invalid target record<br>confirm vs cancel branch<br>and active vs inactive user/account state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-ADMIN-5</td>
    <td>Phân quyền quản trị (Chỉ Super Admin)</td>
    <td>TC_<wbr>ADMIN_<wbr>ROLE_<wbr>MANAGEMENT<wbr>.md</td>
    <td>TC_<wbr>ADMIN_<wbr>5_<wbr>01<wbr>...<wbr>TC_<wbr>ADMIN_<wbr>5_<wbr>09</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Authorized vs unauthorized actor<br>valid vs invalid target record<br>confirm vs cancel branch<br>and active vs inactive user/account state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-ADMIN-3</td>
    <td>Quản lý người dùng</td>
    <td>TC_<wbr>ADMIN_<wbr>USER_<wbr>MANAGEMENT<wbr>.md</td>
    <td>TC_<wbr>ADMIN_<wbr>3_<wbr>01<wbr>...<wbr>TC_<wbr>ADMIN_<wbr>3_<wbr>17</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Authorized vs unauthorized actor<br>valid vs invalid target record<br>confirm vs cancel branch<br>and active vs inactive user/account state.</td>
    <td>Observed in: TC_ADMIN_3_06<br>TC_ADMIN_3_08<br>TC_ADMIN_3_09</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-ASSIGN-1</td>
    <td>Giao Việc Cho Thành Viên</td>
    <td>TC_<wbr>ASSIGN_<wbr>ADD<wbr>.md</td>
    <td>TC_<wbr>ASSIGN_<wbr>ADD_<wbr>01<wbr>...<wbr>TC_<wbr>ASSIGN_<wbr>ADD_<wbr>14</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Assignable vs non-assignable member, already assigned vs not assigned<br>and permitted vs non-permitted actor.</td>
    <td>Observed in: TC_ASSIGN_ADD_04</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-ASSIGN-2</td>
    <td>Hủy Giao Việc</td>
    <td>TC_<wbr>ASSIGN_<wbr>REMOVE<wbr>.md</td>
    <td>TC_<wbr>ASSIGN_<wbr>REMOVE_<wbr>01<wbr>...<wbr>TC_<wbr>ASSIGN_<wbr>REMOVE_<wbr>11</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Assignable vs non-assignable member, already assigned vs not assigned<br>and permitted vs non-permitted actor.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-ASSIGN-3</td>
    <td>Xem Danh Sách Người Được Giao</td>
    <td>TC_<wbr>ASSIGN_<wbr>VIEW<wbr>.md</td>
    <td>TC_<wbr>ASSIGN_<wbr>VIEW_<wbr>01<wbr>...<wbr>TC_<wbr>ASSIGN_<wbr>VIEW_<wbr>09</td>
    <td>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Assignable vs non-assignable member, already assigned vs not assigned<br>and permitted vs non-permitted actor.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-ATTACH-2</td>
    <td>Xóa File Đính Kèm</td>
    <td>TC_<wbr>ATTACH_<wbr>DELETE<wbr>.md</td>
    <td>TC_<wbr>ATTACH_<wbr>DELETE_<wbr>01<wbr>...<wbr>TC_<wbr>ATTACH_<wbr>DELETE_<wbr>12</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Allowed vs disallowed file type, within-limit vs over-limit file/count condition<br>and existing vs removed attachment.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-ATTACH-1</td>
    <td>Tải File Lên Công Việc</td>
    <td>TC_<wbr>ATTACH_<wbr>UPLOAD<wbr>.md</td>
    <td>TC_<wbr>ATTACH_<wbr>UPLOAD_<wbr>01<wbr>...<wbr>TC_<wbr>ATTACH_<wbr>UPLOAD_<wbr>18</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Allowed vs disallowed file type, within-limit vs over-limit file/count condition<br>and existing vs removed attachment.</td>
    <td>Observed in: TC_ATTACH_UPLOAD_06<br>TC_ATTACH_UPLOAD_07<br>TC_ATTACH_UPLOAD_08</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-AUTH-4</td>
    <td>Quên Mật Khẩu</td>
    <td>TC_<wbr>AUTH_<wbr>FORGOT_<wbr>PASSWORD<wbr>.md</td>
    <td>TC_<wbr>FP_<wbr>01<wbr>...<wbr>TC_<wbr>FP_<wbr>21</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Credentials, account existence, account status<br>required-field completeness, reset-token or external-login conditions.</td>
    <td>Observed in: TC_FP_09<br>TC_FP_11</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-AUTH-3</td>
    <td>Đăng Nhập Bằng Google</td>
    <td>TC_<wbr>AUTH_<wbr>GOOGLE<wbr>.md</td>
    <td>TC_<wbr>GOOGLE_<wbr>01<wbr>...<wbr>TC_<wbr>GOOGLE_<wbr>07</td>
    <td>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Credentials, account existence, account status<br>required-field completeness, reset-token or external-login conditions.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-AUTH-2</td>
    <td>Đăng Nhập</td>
    <td>TC_<wbr>AUTH_<wbr>LOGIN<wbr>.md</td>
    <td>TC_<wbr>LOGIN_<wbr>01<wbr>...<wbr>TC_<wbr>LOGIN_<wbr>22</td>
    <td>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Credentials, account existence, account status<br>required-field completeness, reset-token or external-login conditions.</td>
    <td>Observed in: TC_LOGIN_02</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-AUTH-5</td>
    <td>Đăng Xuất</td>
    <td>TC_<wbr>AUTH_<wbr>LOGOUT<wbr>.md</td>
    <td>TC_<wbr>LOGOUT_<wbr>01<wbr>...<wbr>TC_<wbr>LOGOUT_<wbr>09</td>
    <td>Decision Table Testing<br>State Transition Testing<br>Use Case / Scenario-based Testing</td>
    <td>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Credentials, account existence, account status<br>required-field completeness, reset-token or external-login conditions.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-AUTH-1</td>
    <td>Đăng Ký Tài Khoản</td>
    <td>TC_<wbr>AUTH_<wbr>REGISTER<wbr>.md</td>
    <td>TC_<wbr>REG_<wbr>01<wbr>...<wbr>TC_<wbr>REG_<wbr>33</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Credentials, account existence, account status<br>required-field completeness, reset-token or external-login conditions.</td>
    <td>Observed in: TC_REG_04<br>TC_REG_13<br>TC_REG_16<br>TC_REG_20<br>TC_REG_21<br>TC_REG_22<br>TC_REG_23<br>TC_REG_26<br>TC_REG_27</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-BOT-1</td>
    <td>Chatbot hiển thị thông tin ngữ cảnh</td>
    <td>TC_<wbr>BOT_<wbr>CONTEXT<wbr>.md</td>
    <td>TC_<wbr>BOT_<wbr>CONTEXT_<wbr>01<wbr>...<wbr>TC_<wbr>BOT_<wbr>CONTEXT_<wbr>09</td>
    <td>Equivalence Partitioning<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Sufficient vs insufficient context, simple vs complex request<br>and data-available vs data-missing group state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-BOT-3</td>
    <td>Xem tiến độ nhóm qua Chatbot</td>
    <td>TC_<wbr>BOT_<wbr>PROGRESS<wbr>.md</td>
    <td>TC_<wbr>BOT_<wbr>PROGRESS_<wbr>01<wbr>...<wbr>TC_<wbr>BOT_<wbr>PROGRESS_<wbr>11</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Sufficient vs insufficient context, simple vs complex request<br>and data-available vs data-missing group state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-BOT-2</td>
    <td>Đề xuất và đánh giá công việc</td>
    <td>TC_<wbr>BOT_<wbr>SUGGEST<wbr>.md</td>
    <td>TC_<wbr>BOT_<wbr>SUGGEST_<wbr>01<wbr>...<wbr>TC_<wbr>BOT_<wbr>SUGGEST_<wbr>09</td>
    <td>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Sufficient vs insufficient context, simple vs complex request<br>and data-available vs data-missing group state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique should be clarified or strengthened if deeper black-box rigor is required.</td>
  </tr>
  <tr>
    <td>FR-CHAT-3</td>
    <td>Sửa và Xóa Tin Nhắn</td>
    <td>TC_<wbr>CHAT_<wbr>EDIT_<wbr>DELETE<wbr>.md</td>
    <td>TC_<wbr>CHAT_<wbr>EDIT_<wbr>DELETE_<wbr>01<wbr>...<wbr>TC_<wbr>CHAT_<wbr>EDIT_<wbr>DELETE_<wbr>14</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Empty vs valid content, sender vs recipient perspective, edited/deleted/reacted vs original message state<br>and online vs offline context.</td>
    <td>Observed in: TC_CHAT_EDIT_DELETE_05</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-CHAT-5</td>
    <td>Chia Sẻ File Trong Chat Nhóm</td>
    <td>TC_<wbr>CHAT_<wbr>FILE<wbr>.md</td>
    <td>TC_<wbr>CHAT_<wbr>FILE_<wbr>01<wbr>...<wbr>TC_<wbr>CHAT_<wbr>FILE_<wbr>11</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Empty vs valid content, sender vs recipient perspective, edited/deleted/reacted vs original message state<br>and online vs offline context.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-CHAT-2</td>
    <td>Xem Lịch Sử Tin Nhắn</td>
    <td>TC_<wbr>CHAT_<wbr>HISTORY<wbr>.md</td>
    <td>TC_<wbr>CHAT_<wbr>HISTORY_<wbr>01<wbr>...<wbr>TC_<wbr>CHAT_<wbr>HISTORY_<wbr>10</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Empty vs valid content, sender vs recipient perspective, edited/deleted/reacted vs original message state<br>and online vs offline context.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-CHAT-4</td>
    <td>Phản Ứng (Reaction) Tin Nhắn</td>
    <td>TC_<wbr>CHAT_<wbr>REACTION<wbr>.md</td>
    <td>TC_<wbr>CHAT_<wbr>REACTION_<wbr>01<wbr>...<wbr>TC_<wbr>CHAT_<wbr>REACTION_<wbr>11</td>
    <td>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Empty vs valid content, sender vs recipient perspective, edited/deleted/reacted vs original message state<br>and online vs offline context.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-CHAT-6</td>
    <td>Cập Nhật Thời Gian Thực</td>
    <td>TC_<wbr>CHAT_<wbr>REALTIME<wbr>.md</td>
    <td>TC_<wbr>CHAT_<wbr>REALTIME_<wbr>01<wbr>...<wbr>TC_<wbr>CHAT_<wbr>REALTIME_<wbr>09</td>
    <td>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Empty vs valid content, sender vs recipient perspective, edited/deleted/reacted vs original message state<br>and online vs offline context.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>More explicit boundary values would improve technique traceability.</td>
  </tr>
  <tr>
    <td>FR-CHAT-1</td>
    <td>Gửi và Nhận Tin Nhắn Nhóm</td>
    <td>TC_<wbr>CHAT_<wbr>SEND<wbr>.md</td>
    <td>TC_<wbr>CHAT_<wbr>SEND_<wbr>01<wbr>...<wbr>TC_<wbr>CHAT_<wbr>SEND_<wbr>16</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Empty vs valid content, sender vs recipient perspective, edited/deleted/reacted vs original message state<br>and online vs offline context.</td>
    <td>Observed in: TC_CHAT_SEND_06<br>TC_CHAT_SEND_07<br>TC_CHAT_SEND_11</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-CHECK-1</td>
    <td>Thêm Mục Checklist</td>
    <td>TC_<wbr>CHECK_<wbr>ADD<wbr>.md</td>
    <td>TC_<wbr>CHECK_<wbr>ADD_<wbr>01<wbr>...<wbr>TC_<wbr>CHECK_<wbr>ADD_<wbr>13</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Empty vs valid checklist item, checked vs unchecked item<br>and existing vs deleted item.</td>
    <td>Observed in: TC_CHECK_ADD_06<br>TC_CHECK_ADD_07<br>TC_CHECK_ADD_09</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-CHECK-4</td>
    <td>Xóa Mục Checklist</td>
    <td>TC_<wbr>CHECK_<wbr>DELETE<wbr>.md</td>
    <td>TC_<wbr>CHECK_<wbr>DELETE_<wbr>01<wbr>...<wbr>TC_<wbr>CHECK_<wbr>DELETE_<wbr>11</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Empty vs valid checklist item, checked vs unchecked item<br>and existing vs deleted item.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-CHECK-2</td>
    <td>Sửa Mục Checklist</td>
    <td>TC_<wbr>CHECK_<wbr>EDIT<wbr>.md</td>
    <td>TC_<wbr>CHECK_<wbr>EDIT_<wbr>01<wbr>...<wbr>TC_<wbr>CHECK_<wbr>EDIT_<wbr>11</td>
    <td>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Empty vs valid checklist item, checked vs unchecked item<br>and existing vs deleted item.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-CHECK-3</td>
    <td>Đánh Dấu Hoàn Thành / Bỏ Đánh Dấu</td>
    <td>TC_<wbr>CHECK_<wbr>TOGGLE<wbr>.md</td>
    <td>TC_<wbr>CHECK_<wbr>TOGGLE_<wbr>01<wbr>...<wbr>TC_<wbr>CHECK_<wbr>TOGGLE_<wbr>14</td>
    <td>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Empty vs valid checklist item, checked vs unchecked item<br>and existing vs deleted item.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-COMMENT-1</td>
    <td>Thêm Bình Luận</td>
    <td>TC_<wbr>COMMENT_<wbr>ADD<wbr>.md</td>
    <td>TC_<wbr>COMMENT_<wbr>ADD_<wbr>01<wbr>...<wbr>TC_<wbr>COMMENT_<wbr>ADD_<wbr>15</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Empty vs valid comment, owner vs non-owner action, empty-state vs populated-state display<br>and valid vs invalid attachment condition.</td>
    <td>Observed in: TC_COMMENT_ADD_06<br>TC_COMMENT_ADD_07<br>TC_COMMENT_ADD_10<br>TC_COMMENT_ADD_12</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-COMMENT-5</td>
    <td>Bình Luận Kèm File</td>
    <td>TC_<wbr>COMMENT_<wbr>ATTACH<wbr>.md</td>
    <td>TC_<wbr>COMMENT_<wbr>ATTACH_<wbr>01<wbr>...<wbr>TC_<wbr>COMMENT_<wbr>ATTACH_<wbr>13</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Empty vs valid comment, owner vs non-owner action, empty-state vs populated-state display<br>and valid vs invalid attachment condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-COMMENT-3</td>
    <td>Xóa Bình Luận</td>
    <td>TC_<wbr>COMMENT_<wbr>DELETE<wbr>.md</td>
    <td>TC_<wbr>COMMENT_<wbr>DELETE_<wbr>01<wbr>...<wbr>TC_<wbr>COMMENT_<wbr>DELETE_<wbr>10</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Empty vs valid comment, owner vs non-owner action, empty-state vs populated-state display<br>and valid vs invalid attachment condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-COMMENT-2</td>
    <td>Sửa Bình Luận</td>
    <td>TC_<wbr>COMMENT_<wbr>EDIT<wbr>.md</td>
    <td>TC_<wbr>COMMENT_<wbr>EDIT_<wbr>01<wbr>...<wbr>TC_<wbr>COMMENT_<wbr>EDIT_<wbr>12</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Empty vs valid comment, owner vs non-owner action, empty-state vs populated-state display<br>and valid vs invalid attachment condition.</td>
    <td>Observed in: TC_COMMENT_EDIT_06<br>TC_COMMENT_EDIT_07</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-COMMENT-4</td>
    <td>Xem Danh Sách Bình Luận</td>
    <td>TC_<wbr>COMMENT_<wbr>VIEW<wbr>.md</td>
    <td>TC_<wbr>COMMENT_<wbr>VIEW_<wbr>01<wbr>...<wbr>TC_<wbr>COMMENT_<wbr>VIEW_<wbr>10</td>
    <td>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Empty vs valid comment, owner vs non-owner action, empty-state vs populated-state display<br>and valid vs invalid attachment condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-DIRECT-5</td>
    <td>Sửa và Xóa Tin Nhắn Trực Tiếp</td>
    <td>TC_<wbr>DIRECT_<wbr>EDIT_<wbr>DELETE<wbr>.md</td>
    <td>TC_<wbr>DIRECT_<wbr>EDIT_<wbr>DELETE_<wbr>01<wbr>...<wbr>TC_<wbr>DIRECT_<wbr>EDIT_<wbr>DELETE_<wbr>14</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Existing vs new conversation, sender vs recipient perspective<br>and valid vs invalid send/edit/delete/reaction action.</td>
    <td>Observed in: TC_DIRECT_EDIT_DELETE_05</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-DIRECT-7</td>
    <td>Gửi File Trong Tin Nhắn 1-1</td>
    <td>TC_<wbr>DIRECT_<wbr>FILE<wbr>.md</td>
    <td>TC_<wbr>DIRECT_<wbr>FILE_<wbr>01<wbr>...<wbr>TC_<wbr>DIRECT_<wbr>FILE_<wbr>11</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Existing vs new conversation, sender vs recipient perspective<br>and valid vs invalid send/edit/delete/reaction action.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-DIRECT-4</td>
    <td>Xem Lịch Sử Tin Nhắn 1-1</td>
    <td>TC_<wbr>DIRECT_<wbr>HISTORY<wbr>.md</td>
    <td>TC_<wbr>DIRECT_<wbr>HISTORY_<wbr>01<wbr>...<wbr>TC_<wbr>DIRECT_<wbr>HISTORY_<wbr>09</td>
    <td>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Existing vs new conversation, sender vs recipient perspective<br>and valid vs invalid send/edit/delete/reaction action.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-DIRECT-6</td>
    <td>React Tin Nhắn Trực Tiếp</td>
    <td>TC_<wbr>DIRECT_<wbr>REACT<wbr>.md</td>
    <td>TC_<wbr>DIRECT_<wbr>REACT_<wbr>01<wbr>...<wbr>TC_<wbr>DIRECT_<wbr>REACT_<wbr>10</td>
    <td>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Existing vs new conversation, sender vs recipient perspective<br>and valid vs invalid send/edit/delete/reaction action.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-DIRECT-3</td>
    <td>Gửi Tin Nhắn Trực Tiếp</td>
    <td>TC_<wbr>DIRECT_<wbr>SEND<wbr>.md</td>
    <td>TC_<wbr>DIRECT_<wbr>SEND_<wbr>01<wbr>...<wbr>TC_<wbr>DIRECT_<wbr>SEND_<wbr>12</td>
    <td>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Existing vs new conversation, sender vs recipient perspective<br>and valid vs invalid send/edit/delete/reaction action.</td>
    <td>Observed in: TC_DIRECT_SEND_05<br>TC_DIRECT_SEND_06<br>TC_DIRECT_SEND_10</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-DIRECT-2</td>
    <td>Bắt Đầu Hội Thoại Mới</td>
    <td>TC_<wbr>DIRECT_<wbr>START<wbr>.md</td>
    <td>TC_<wbr>DIRECT_<wbr>START_<wbr>01<wbr>...<wbr>TC_<wbr>DIRECT_<wbr>START_<wbr>09</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Existing vs new conversation, sender vs recipient perspective<br>and valid vs invalid send/edit/delete/reaction action.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-DIRECT-1</td>
    <td>Xem Danh Sách Cuộc Hội Thoại</td>
    <td>TC_<wbr>DIRECT_<wbr>VIEW_<wbr>LIST<wbr>.md</td>
    <td>TC_<wbr>DIRECT_<wbr>VIEW_<wbr>LIST_<wbr>01<wbr>...<wbr>TC_<wbr>DIRECT_<wbr>VIEW_<wbr>LIST_<wbr>08</td>
    <td>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Existing vs new conversation, sender vs recipient perspective<br>and valid vs invalid send/edit/delete/reaction action.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-FOLDER-5</td>
    <td>Kiểm Soát Quyền Truy Cập Thư Mục</td>
    <td>TC_<wbr>FOLDER_<wbr>ACCESS<wbr>.md</td>
    <td>TC_<wbr>FOLDER_<wbr>ACCESS_<wbr>01<wbr>...<wbr>TC_<wbr>FOLDER_<wbr>ACCESS_<wbr>14</td>
    <td>Equivalence Partitioning<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Authorized vs unauthorized access, unique vs duplicate folder identity<br>and existing vs deleted folder state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>More explicit boundary values would improve technique traceability.<br>Decision-table coverage should be clarified or strengthened.</td>
  </tr>
  <tr>
    <td>FR-FOLDER-1</td>
    <td>Tạo Thư Mục</td>
    <td>TC_<wbr>FOLDER_<wbr>CREATE<wbr>.md</td>
    <td>TC_<wbr>FOLDER_<wbr>CREATE_<wbr>01<wbr>...<wbr>TC_<wbr>FOLDER_<wbr>CREATE_<wbr>12</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Authorized vs unauthorized access, unique vs duplicate folder identity<br>and existing vs deleted folder state.</td>
    <td>Observed in: TC_FOLDER_CREATE_08</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>More explicit boundary values would improve technique traceability.</td>
  </tr>
  <tr>
    <td>FR-FOLDER-4</td>
    <td>Xóa Thư Mục</td>
    <td>TC_<wbr>FOLDER_<wbr>DELETE<wbr>.md</td>
    <td>TC_<wbr>FOLDER_<wbr>DELETE_<wbr>01<wbr>...<wbr>TC_<wbr>FOLDER_<wbr>DELETE_<wbr>11</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Authorized vs unauthorized access, unique vs duplicate folder identity<br>and existing vs deleted folder state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>More explicit boundary values would improve technique traceability.</td>
  </tr>
  <tr>
    <td>FR-FOLDER-2</td>
    <td>Xem Danh Sách Thư Mục</td>
    <td>TC_<wbr>FOLDER_<wbr>LIST<wbr>.md</td>
    <td>TC_<wbr>FOLDER_<wbr>LIST_<wbr>01<wbr>...<wbr>TC_<wbr>FOLDER_<wbr>LIST_<wbr>08</td>
    <td>Equivalence Partitioning<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Authorized vs unauthorized access, unique vs duplicate folder identity<br>and existing vs deleted folder state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>More explicit boundary values would improve technique traceability.</td>
  </tr>
  <tr>
    <td>FR-FOLDER-3</td>
    <td>Cập Nhật Thư Mục</td>
    <td>TC_<wbr>FOLDER_<wbr>UPDATE<wbr>.md</td>
    <td>TC_<wbr>FOLDER_<wbr>UPDATE_<wbr>01<wbr>...<wbr>TC_<wbr>FOLDER_<wbr>UPDATE_<wbr>13</td>
    <td>Equivalence Partitioning<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Authorized vs unauthorized access, unique vs duplicate folder identity<br>and existing vs deleted folder state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>More explicit boundary values would improve technique traceability.</td>
  </tr>
  <tr>
    <td>FR-GROUP-1</td>
    <td>Tạo Nhóm</td>
    <td>TC_<wbr>GROUP_<wbr>CREATE<wbr>.md</td>
    <td>TC_<wbr>GROUP_<wbr>CREATE_<wbr>01<wbr>...<wbr>TC_<wbr>GROUP_<wbr>CREATE_<wbr>14</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Owner/admin/member role condition<br>valid vs blank/over-limit field values<br>and existing vs missing group/member target.</td>
    <td>Observed in: TC_GROUP_CREATE_06<br>TC_GROUP_CREATE_07<br>TC_GROUP_CREATE_08<br>TC_GROUP_CREATE_09<br>TC_GROUP_CREATE_12</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-GROUP-4</td>
    <td>Xóa Nhóm</td>
    <td>TC_<wbr>GROUP_<wbr>DELETE<wbr>.md</td>
    <td>TC_<wbr>GROUP_<wbr>DELETE_<wbr>01<wbr>...<wbr>TC_<wbr>GROUP_<wbr>DELETE_<wbr>10</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Owner/admin/member role condition<br>valid vs blank/over-limit field values<br>and existing vs missing group/member target.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-GROUP-2</td>
    <td>Xem Danh Sách Nhóm</td>
    <td>TC_<wbr>GROUP_<wbr>LIST<wbr>.md</td>
    <td>TC_<wbr>GROUP_<wbr>LIST_<wbr>01<wbr>...<wbr>TC_<wbr>GROUP_<wbr>LIST_<wbr>09</td>
    <td>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Owner/admin/member role condition<br>valid vs blank/over-limit field values<br>and existing vs missing group/member target.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique should be clarified or strengthened if deeper black-box rigor is required.</td>
  </tr>
  <tr>
    <td>FR-GROUP-5</td>
    <td>Quản Lý Thành Viên Nhóm</td>
    <td>TC_<wbr>GROUP_<wbr>MEMBERS<wbr>.md</td>
    <td>TC_<wbr>GROUP_<wbr>MEMBERS_<wbr>01<wbr>...<wbr>TC_<wbr>GROUP_<wbr>MEMBERS_<wbr>22</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Owner/admin/member role condition<br>valid vs blank/over-limit field values<br>and existing vs missing group/member target.</td>
    <td>Observed in: TC_GROUP_MEMBERS_05</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-GROUP-6</td>
    <td>Chuyển Đổi Nhóm Đang Làm Việc</td>
    <td>TC_<wbr>GROUP_<wbr>SWITCH<wbr>.md</td>
    <td>TC_<wbr>GROUP_<wbr>SWITCH_<wbr>01<wbr>...<wbr>TC_<wbr>GROUP_<wbr>SWITCH_<wbr>09</td>
    <td>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Owner/admin/member role condition<br>valid vs blank/over-limit field values<br>and existing vs missing group/member target.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-GROUP-3</td>
    <td>Cập Nhật Thông Tin Nhóm</td>
    <td>TC_<wbr>GROUP_<wbr>UPDATE<wbr>.md</td>
    <td>TC_<wbr>GROUP_<wbr>UPDATE_<wbr>01<wbr>...<wbr>TC_<wbr>GROUP_<wbr>UPDATE_<wbr>13</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Owner/admin/member role condition<br>valid vs blank/over-limit field values<br>and existing vs missing group/member target.</td>
    <td>Observed in: TC_GROUP_UPDATE_05<br>TC_GROUP_UPDATE_06<br>TC_GROUP_UPDATE_07<br>TC_GROUP_UPDATE_08</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>NFR-PERF</td>
    <td>Hiệu Năng</td>
    <td>TC_<wbr>NFR_<wbr>PERF<wbr>.md</td>
    <td>TC_<wbr>NFR_<wbr>PERF_<wbr>01<wbr>...<wbr>TC_<wbr>NFR_<wbr>PERF_<wbr>12</td>
    <td>Boundary Value Analysis<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Normal vs stressed usage condition, available vs interrupted service condition<br>and permitted vs blocked access or operation.</td>
    <td>Observed in: TC_NFR_PERF_03</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>NFR-RELI</td>
    <td>Độ Tin Cậy</td>
    <td>TC_<wbr>NFR_<wbr>RELI<wbr>.md</td>
    <td>TC_<wbr>NFR_<wbr>RELI_<wbr>01<wbr>...<wbr>TC_<wbr>NFR_<wbr>RELI_<wbr>12</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Normal vs stressed usage condition, available vs interrupted service condition<br>and permitted vs blocked access or operation.</td>
    <td>Observed in: TC_NFR_RELI_06<br>TC_NFR_RELI_07<br>TC_NFR_RELI_10</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>NFR-SCALE</td>
    <td>Khả Năng Mở Rộng</td>
    <td>TC_<wbr>NFR_<wbr>SCALE<wbr>.md</td>
    <td>TC_<wbr>NFR_<wbr>SCALE_<wbr>01<wbr>...<wbr>TC_<wbr>NFR_<wbr>SCALE_<wbr>07</td>
    <td>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Normal vs stressed usage condition, available vs interrupted service condition<br>and permitted vs blocked access or operation.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique should be clarified or strengthened if deeper black-box rigor is required.</td>
  </tr>
  <tr>
    <td>NFR-SEC</td>
    <td>Bảo Mật</td>
    <td>TC_<wbr>NFR_<wbr>SEC<wbr>.md</td>
    <td>TC_<wbr>NFR_<wbr>SEC_<wbr>01<wbr>...<wbr>TC_<wbr>NFR_<wbr>SEC_<wbr>14</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Normal vs stressed usage condition, available vs interrupted service condition<br>and permitted vs blocked access or operation.</td>
    <td>Observed in: TC_NFR_SEC_02</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>NFR-USAB</td>
    <td>Khả Năng Sử Dụng</td>
    <td>TC_<wbr>NFR_<wbr>USAB<wbr>.md</td>
    <td>TC_<wbr>NFR_<wbr>USAB_<wbr>01<wbr>...<wbr>TC_<wbr>NFR_<wbr>USAB_<wbr>16</td>
    <td>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Normal vs stressed usage condition, available vs interrupted service condition<br>and permitted vs blocked access or operation.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-NOTE-1</td>
    <td>Tạo Ghi Chú</td>
    <td>TC_<wbr>NOTE_<wbr>CREATE<wbr>.md</td>
    <td>TC_<wbr>NOTE_<wbr>CREATE_<wbr>01<wbr>...<wbr>TC_<wbr>NOTE_<wbr>CREATE_<wbr>09</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Own vs other user note, shared vs private note<br>valid vs empty content<br>and existing vs removed favorite/tag/share state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>More explicit boundary values would improve technique traceability.</td>
  </tr>
  <tr>
    <td>FR-NOTE-5</td>
    <td>Xóa Ghi Chú</td>
    <td>TC_<wbr>NOTE_<wbr>DELETE<wbr>.md</td>
    <td>TC_<wbr>NOTE_<wbr>DELETE_<wbr>01<wbr>...<wbr>TC_<wbr>NOTE_<wbr>DELETE_<wbr>09</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Own vs other user note, shared vs private note<br>valid vs empty content<br>and existing vs removed favorite/tag/share state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-NOTE-3</td>
    <td>Xem Chi Tiết Ghi Chú</td>
    <td>TC_<wbr>NOTE_<wbr>DETAIL<wbr>.md</td>
    <td>TC_<wbr>NOTE_<wbr>DETAIL_<wbr>01<wbr>...<wbr>TC_<wbr>NOTE_<wbr>DETAIL_<wbr>09</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Own vs other user note, shared vs private note<br>valid vs empty content<br>and existing vs removed favorite/tag/share state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-NOTE-6</td>
    <td>Đánh Dấu Ghi Chú Yêu Thích</td>
    <td>TC_<wbr>NOTE_<wbr>FAVORITE<wbr>.md</td>
    <td>TC_<wbr>NOTE_<wbr>FAVORITE_<wbr>01<wbr>...<wbr>TC_<wbr>NOTE_<wbr>FAVORITE_<wbr>08</td>
    <td>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Own vs other user note, shared vs private note<br>valid vs empty content<br>and existing vs removed favorite/tag/share state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-NOTE-2</td>
    <td>Xem Danh Sách Ghi Chú</td>
    <td>TC_<wbr>NOTE_<wbr>LIST<wbr>.md</td>
    <td>TC_<wbr>NOTE_<wbr>LIST_<wbr>01<wbr>...<wbr>TC_<wbr>NOTE_<wbr>LIST_<wbr>07</td>
    <td>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Own vs other user note, shared vs private note<br>valid vs empty content<br>and existing vs removed favorite/tag/share state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-NOTE-7</td>
    <td>Chia Sẻ Ghi Chú</td>
    <td>TC_<wbr>NOTE_<wbr>SHARE<wbr>.md</td>
    <td>TC_<wbr>NOTE_<wbr>SHARE_<wbr>01<wbr>...<wbr>TC_<wbr>NOTE_<wbr>SHARE_<wbr>10</td>
    <td>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Own vs other user note, shared vs private note<br>valid vs empty content<br>and existing vs removed favorite/tag/share state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-NOTE-8</td>
    <td>Xóa Nhãn Khỏi Ghi Chú</td>
    <td>TC_<wbr>NOTE_<wbr>TAG<wbr>.md</td>
    <td>TC_<wbr>NOTE_<wbr>TAG_<wbr>01<wbr>...<wbr>TC_<wbr>NOTE_<wbr>TAG_<wbr>08</td>
    <td>Equivalence Partitioning<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Own vs other user note, shared vs private note<br>valid vs empty content<br>and existing vs removed favorite/tag/share state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-NOTE-4</td>
    <td>Cập Nhật Ghi Chú</td>
    <td>TC_<wbr>NOTE_<wbr>UPDATE<wbr>.md</td>
    <td>TC_<wbr>NOTE_<wbr>UPDATE_<wbr>01<wbr>...<wbr>TC_<wbr>NOTE_<wbr>UPDATE_<wbr>10</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Own vs other user note, shared vs private note<br>valid vs empty content<br>and existing vs removed favorite/tag/share state.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>More explicit boundary values would improve technique traceability.</td>
  </tr>
  <tr>
    <td>FR-NOTIF-3</td>
    <td>Lưu Trữ Thông Báo</td>
    <td>TC_<wbr>NOTIF_<wbr>ARCHIVE<wbr>.md</td>
    <td>TC_<wbr>NOTIF_<wbr>ARCHIVE_<wbr>01<wbr>...<wbr>TC_<wbr>NOTIF_<wbr>ARCHIVE_<wbr>08</td>
    <td>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Read vs unread state, archived vs active state, accepted vs rejected response<br>and online/offline or enabled/disabled notification condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-NOTIF-5</td>
    <td>Nhận Thông Báo Tự Động</td>
    <td>TC_<wbr>NOTIF_<wbr>AUTO<wbr>.md</td>
    <td>TC_<wbr>NOTIF_<wbr>AUTO_<wbr>01<wbr>...<wbr>TC_<wbr>NOTIF_<wbr>AUTO_<wbr>17</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Read vs unread state, archived vs active state, accepted vs rejected response<br>and online/offline or enabled/disabled notification condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-NOTIF-4</td>
    <td>Xóa Thông Báo</td>
    <td>TC_<wbr>NOTIF_<wbr>DELETE<wbr>.md</td>
    <td>TC_<wbr>NOTIF_<wbr>DELETE_<wbr>01<wbr>...<wbr>TC_<wbr>NOTIF_<wbr>DELETE_<wbr>08</td>
    <td>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Read vs unread state, archived vs active state, accepted vs rejected response<br>and online/offline or enabled/disabled notification condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-NOTIF-6</td>
    <td>Phản Hồi Lời Mời Nhóm</td>
    <td>TC_<wbr>NOTIF_<wbr>INVITE<wbr>.md</td>
    <td>TC_<wbr>NOTIF_<wbr>INVITE_<wbr>01<wbr>...<wbr>TC_<wbr>NOTIF_<wbr>INVITE_<wbr>10</td>
    <td>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Read vs unread state, archived vs active state, accepted vs rejected response<br>and online/offline or enabled/disabled notification condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-NOTIF-2</td>
    <td>Đánh Dấu Đã Đọc</td>
    <td>TC_<wbr>NOTIF_<wbr>READ<wbr>.md</td>
    <td>TC_<wbr>NOTIF_<wbr>READ_<wbr>01<wbr>...<wbr>TC_<wbr>NOTIF_<wbr>READ_<wbr>09</td>
    <td>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Read vs unread state, archived vs active state, accepted vs rejected response<br>and online/offline or enabled/disabled notification condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-NOTIF-7</td>
    <td>Thông Báo Thời Gian Thực</td>
    <td>TC_<wbr>NOTIF_<wbr>REALTIME<wbr>.md</td>
    <td>TC_<wbr>NOTIF_<wbr>REALTIME_<wbr>01<wbr>...<wbr>TC_<wbr>NOTIF_<wbr>REALTIME_<wbr>07</td>
    <td>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Read vs unread state, archived vs active state, accepted vs rejected response<br>and online/offline or enabled/disabled notification condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>More explicit boundary values would improve technique traceability.</td>
  </tr>
  <tr>
    <td>FR-NOTIF-1</td>
    <td>Xem Danh Sách Thông Báo & Số Chưa Đọc</td>
    <td>TC_<wbr>NOTIF_<wbr>VIEW<wbr>.md</td>
    <td>TC_<wbr>NOTIF_<wbr>VIEW_<wbr>01<wbr>...<wbr>TC_<wbr>NOTIF_<wbr>VIEW_<wbr>12</td>
    <td>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Read vs unread state, archived vs active state, accepted vs rejected response<br>and online/offline or enabled/disabled notification condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-TASK-8</td>
    <td>Xem Công Việc Được Giao Cho Tôi</td>
    <td>TC_<wbr>TASK_<wbr>ASSIGNED<wbr>.md</td>
    <td>TC_<wbr>TASK_<wbr>ASSIGNED_<wbr>01<wbr>...<wbr>TC_<wbr>TASK_<wbr>ASSIGNED_<wbr>10</td>
    <td>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Required vs optional fields<br>valid vs invalid task values, current vs target status/view<br>and linked/repeated vs non-linked/non-repeated condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-TASK-6</td>
    <td>Xem Công Việc Theo Lịch</td>
    <td>TC_<wbr>TASK_<wbr>CALENDAR<wbr>.md</td>
    <td>TC_<wbr>TASK_<wbr>CALENDAR_<wbr>01<wbr>...<wbr>TC_<wbr>TASK_<wbr>CALENDAR_<wbr>12</td>
    <td>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Required vs optional fields<br>valid vs invalid task values, current vs target status/view<br>and linked/repeated vs non-linked/non-repeated condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique should be clarified or strengthened if deeper black-box rigor is required.</td>
  </tr>
  <tr>
    <td>FR-TASK-1</td>
    <td>Tạo Công Việc</td>
    <td>TC_<wbr>TASK_<wbr>CREATE<wbr>.md</td>
    <td>TC_<wbr>TASK_<wbr>CREATE_<wbr>01<wbr>...<wbr>TC_<wbr>TASK_<wbr>CREATE_<wbr>20</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Required vs optional fields<br>valid vs invalid task values, current vs target status/view<br>and linked/repeated vs non-linked/non-repeated condition.</td>
    <td>Observed in: TC_TASK_CREATE_06<br>TC_TASK_CREATE_07<br>TC_TASK_CREATE_08<br>TC_TASK_CREATE_09<br>TC_TASK_CREATE_12<br>TC_TASK_CREATE_13<br>TC_TASK_CREATE_14<br>TC_TASK_CREATE_15<br>TC_TASK_CREATE_18</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-TASK-5</td>
    <td>Xóa Công Việc</td>
    <td>TC_<wbr>TASK_<wbr>DELETE<wbr>.md</td>
    <td>TC_<wbr>TASK_<wbr>DELETE_<wbr>01<wbr>...<wbr>TC_<wbr>TASK_<wbr>DELETE_<wbr>10</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Required vs optional fields<br>valid vs invalid task values, current vs target status/view<br>and linked/repeated vs non-linked/non-repeated condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-TASK-3</td>
    <td>Xem Chi Tiết Công Việc</td>
    <td>TC_<wbr>TASK_<wbr>DETAIL<wbr>.md</td>
    <td>TC_<wbr>TASK_<wbr>DETAIL_<wbr>01<wbr>...<wbr>TC_<wbr>TASK_<wbr>DETAIL_<wbr>12</td>
    <td>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Required vs optional fields<br>valid vs invalid task values, current vs target status/view<br>and linked/repeated vs non-linked/non-repeated condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-TASK-7</td>
    <td>Xem Công Việc Theo Kanban</td>
    <td>TC_<wbr>TASK_<wbr>KANBAN<wbr>.md</td>
    <td>TC_<wbr>TASK_<wbr>KANBAN_<wbr>01<wbr>...<wbr>TC_<wbr>TASK_<wbr>KANBAN_<wbr>11</td>
    <td>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Required vs optional fields<br>valid vs invalid task values, current vs target status/view<br>and linked/repeated vs non-linked/non-repeated condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-TASK-10</td>
    <td>Liên Kết Công Việc</td>
    <td>TC_<wbr>TASK_<wbr>LINK<wbr>.md</td>
    <td>TC_<wbr>TASK_<wbr>LINK_<wbr>01<wbr>...<wbr>TC_<wbr>TASK_<wbr>LINK_<wbr>13</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Required vs optional fields<br>valid vs invalid task values, current vs target status/view<br>and linked/repeated vs non-linked/non-repeated condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-TASK-2</td>
    <td>Xem Danh Sách Công Việc</td>
    <td>TC_<wbr>TASK_<wbr>LIST<wbr>.md</td>
    <td>TC_<wbr>TASK_<wbr>LIST_<wbr>01<wbr>...<wbr>TC_<wbr>TASK_<wbr>LIST_<wbr>18</td>
    <td>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Required vs optional fields<br>valid vs invalid task values, current vs target status/view<br>and linked/repeated vs non-linked/non-repeated condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-TASK-9</td>
    <td>Lặp Lại Công Việc</td>
    <td>TC_<wbr>TASK_<wbr>REPEAT<wbr>.md</td>
    <td>TC_<wbr>TASK_<wbr>REPEAT_<wbr>01<wbr>...<wbr>TC_<wbr>TASK_<wbr>REPEAT_<wbr>16</td>
    <td>Equivalence Partitioning<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Required vs optional fields<br>valid vs invalid task values, current vs target status/view<br>and linked/repeated vs non-linked/non-repeated condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Decision-table coverage should be clarified or strengthened.</td>
  </tr>
  <tr>
    <td>FR-TASK-4</td>
    <td>Cập Nhật Công Việc</td>
    <td>TC_<wbr>TASK_<wbr>UPDATE<wbr>.md</td>
    <td>TC_<wbr>TASK_<wbr>UPDATE_<wbr>01<wbr>...<wbr>TC_<wbr>TASK_<wbr>UPDATE_<wbr>16</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Required vs optional fields<br>valid vs invalid task values, current vs target status/view<br>and linked/repeated vs non-linked/non-repeated condition.</td>
    <td>Observed in: TC_TASK_UPDATE_06<br>TC_TASK_UPDATE_07<br>TC_TASK_UPDATE_08</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-TIME-1</td>
    <td>Bắt Đầu Tính Giờ</td>
    <td>TC_<wbr>TIME_<wbr>START<wbr>.md</td>
    <td>TC_<wbr>TIME_<wbr>START_<wbr>01<wbr>...<wbr>TC_<wbr>TIME_<wbr>START_<wbr>10</td>
    <td>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Not-started vs running vs stopped timer state<br>valid vs invalid stop data<br>and single-active vs conflicting-timer condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>More explicit boundary values would improve technique traceability.</td>
  </tr>
  <tr>
    <td>FR-TIME-2</td>
    <td>Dừng Tính Giờ & Ghi Chú</td>
    <td>TC_<wbr>TIME_<wbr>STOP<wbr>.md</td>
    <td>TC_<wbr>TIME_<wbr>STOP_<wbr>01<wbr>...<wbr>TC_<wbr>TIME_<wbr>STOP_<wbr>13</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Not-started vs running vs stopped timer state<br>valid vs invalid stop data<br>and single-active vs conflicting-timer condition.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>More explicit boundary values would improve technique traceability.</td>
  </tr>
  <tr>
    <td>FR-USER-3</td>
    <td>Cập Nhật Ảnh Đại Diện</td>
    <td>TC_<wbr>USER_<wbr>AVATAR<wbr>.md</td>
    <td>TC_<wbr>AVATAR_<wbr>01<wbr>...<wbr>TC_<wbr>AVATAR_<wbr>12</td>
    <td>Equivalence Partitioning<br>Decision Table Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Valid vs invalid profile/password/avatar/settings input, active vs deactivated account state<br>and enabled vs disabled user preference.</td>
    <td>Observed in: TC_AVATAR_02</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>More explicit boundary values would improve technique traceability.</td>
  </tr>
  <tr>
    <td>FR-USER-2</td>
    <td>Đổi Mật Khẩu</td>
    <td>TC_<wbr>USER_<wbr>CHANGE_<wbr>PASSWORD<wbr>.md</td>
    <td>TC_<wbr>CHGPW_<wbr>01<wbr>...<wbr>TC_<wbr>CHGPW_<wbr>17</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Valid vs invalid profile/password/avatar/settings input, active vs deactivated account state<br>and enabled vs disabled user preference.</td>
    <td>Observed in: TC_CHGPW_02<br>TC_CHGPW_07<br>TC_CHGPW_11<br>TC_CHGPW_12</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-USER-6</td>
    <td>Hủy Kích Hoạt Tài Khoản</td>
    <td>TC_<wbr>USER_<wbr>DEACTIVE<wbr>.md</td>
    <td>TC_<wbr>DEACT_<wbr>01<wbr>...<wbr>TC_<wbr>DEACT_<wbr>09</td>
    <td>Decision Table Testing<br>State Transition Testing<br>Use Case / Scenario-based Testing</td>
    <td>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Valid vs invalid profile/password/avatar/settings input, active vs deactivated account state<br>and enabled vs disabled user preference.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
  <tr>
    <td>FR-USER-5</td>
    <td>Tùy Chỉnh Cài Đặt Thông Báo</td>
    <td>TC_<wbr>USER_<wbr>NOTIF_<wbr>SETTINGS<wbr>.md</td>
    <td>TC_<wbr>NOTIFSET_<wbr>01<wbr>...<wbr>TC_<wbr>NOTIFSET_<wbr>14</td>
    <td>State Transition Testing<br>Use Case / Scenario-based Testing</td>
    <td>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Valid vs invalid profile/password/avatar/settings input, active vs deactivated account state<br>and enabled vs disabled user preference.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.</td>
    <td>Decision-table coverage should be clarified or strengthened.<br>Technique should be clarified or strengthened if deeper black-box rigor is required.</td>
  </tr>
  <tr>
    <td>FR-USER-4</td>
    <td>Tùy Chỉnh Giao Diện & Khu Vực</td>
    <td>TC_<wbr>USER_<wbr>PREFERENCES<wbr>.md</td>
    <td>TC_<wbr>PREF_<wbr>01<wbr>...<wbr>TC_<wbr>PREF_<wbr>14</td>
    <td>Use Case / Scenario-based Testing</td>
    <td>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Valid vs invalid profile/password/avatar/settings input, active vs deactivated account state<br>and enabled vs disabled user preference.</td>
    <td>Not clearly specified in current test case.</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique should be clarified or strengthened if deeper black-box rigor is required.</td>
  </tr>
  <tr>
    <td>FR-USER-1</td>
    <td>Cập Nhật Thông Tin Cá Nhân</td>
    <td>TC_<wbr>USER_<wbr>UPDATE_<wbr>PROFILE<wbr>.md</td>
    <td>TC_<wbr>PROFILE_<wbr>01<wbr>...<wbr>TC_<wbr>PROFILE_<wbr>13</td>
    <td>Boundary Value Analysis<br>Equivalence Partitioning<br>Decision Table Testing<br>State Transition Testing<br>Error Guessing / Negative Testing<br>Use Case / Scenario-based Testing</td>
    <td>The documented test cases include explicit limit, edge, or near-limit values.<br>The feature separates observable valid and invalid classes of input, access, or business condition.<br>The visible outcome depends on a small set of user choices or role-based conditions.<br>The feature verifies a user-visible change of state and the resulting observable state after transition.<br>The test set includes failure-oriented scenarios intended to expose user-visible rejection or recovery behavior.<br>The feature is documented as end-user flows with observable UI, API, or business-flow outcomes.</td>
    <td>Valid vs invalid profile/password/avatar/settings input, active vs deactivated account state<br>and enabled vs disabled user preference.</td>
    <td>Observed in: TC_PROFILE_06<br>TC_PROFILE_07<br>TC_PROFILE_10</td>
    <td>The system returns visible feedback, navigation, or validation messaging.<br>The UI changes are directly observable to the user.<br>The resulting state remains observable after reload or re-open where specified.<br>The update appears immediately when the feature requires real-time behavior.</td>
    <td>Technique mapping is adequate at the current document detail level.</td>
  </tr>
</tbody>
</table>

## Recommendations

- Features that need more boundary tests: **TC_ASSIGN_ADD.md, TC_ASSIGN_REMOVE.md, TC_FOLDER_CREATE.md, TC_FOLDER_UPDATE.md, TC_NOTE_CREATE.md, TC_NOTE_UPDATE.md, TC_TIME_START.md, TC_TIME_STOP.md, TC_USER_AVATAR.md, TC_USER_UPDATE_PROFILE.md**
- Features that need more invalid / negative tests: **TC_BOT_CONTEXT.md, TC_BOT_SUGGEST.md, TC_DIRECT_START.md, TC_FOLDER_ACCESS.md, TC_NOTE_SHARE.md, TC_TASK_CALENDAR.md**
- Features that would benefit most from explicit decision table or state transition treatment: **TC_ADMIN_ACCESS_CONTROL.md, TC_ADMIN_ROLE_MANAGEMENT.md, TC_ADMIN_LOCK_UNLOCK.md, TC_NOTIF_INVITE.md, TC_USER_NOTIF_SETTINGS.md, TC_TASK_REPEAT.md, TC_USER_DEACTIVE.MD**
- Documentation structure recommendation:
  - The system-test source files should remain at feature level, because the repository is already organized as one main feature per file.
  - The consolidated matrix should stay as a reporting artifact, but each feature file should explicitly label the black-box technique used when the cases are next revised.
