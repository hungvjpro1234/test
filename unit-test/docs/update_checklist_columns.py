# -*- coding: utf-8 -*-
"""
Chèn cột Mục tiêu kiểm thử (SRS v3 + PLAN.md) và đổi tên nội dung cũ thành Trường hợp test.
Chạy từ repo: python unit-test/docs/update_checklist_columns.py
"""
from __future__ import annotations

import os
import re
from pathlib import Path

OLD_HEADER = (
    "| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Dữ liệu vào | "
    "Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |"
)
NEW_HEADER = (
    "| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | "
    "Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |"
)
OLD_SEP = (
    "|----|------------------------|-------------------|-------------|"
    "-----------------|-----------------|-----------|---------|"
)
NEW_SEP = (
    "|----|------------------------|-------------------|-----------------|-------------|"
    "-----------------|-----------------|-----------|---------|"
)

ROW_RE = re.compile(r"^\|\s*(UT_[A-Z0-9_]+)\s*\|")


def split_table_row(line: str) -> list[str] | None:
    s = line.rstrip("\n\r")
    if not (s.startswith("|") and s.endswith("|")):
        return None
    inner = s[1:-1]
    return [c.strip() for c in inner.split("|")]


def goal_notification(heading: str) -> str:
    h = heading.strip()
    m = {
        "createGroupInvitationNotification — Input Validation": (
            "Xác minh producer từ chối sớm request có ObjectId không hợp lệ (SRS C-12), "
            "tránh truy vấn DB / gọi notifier với payload rỗng — PLAN mục 4.6."
        ),
        "createGroupInvitationNotification — Deduplication (FR-GROUP-5.5)": (
            "Xác minh không tạo trùng thông báo lời mời khi đã có bản ghi pending cho cùng "
            "nhóm + người nhận (FR-GROUP-5.5) — PLAN mục 4.6."
        ),
        "createGroupInvitationNotification — Happy Path": (
            "Xác minh luồng mời nhóm thành công: enqueue notifier đúng contract và trả payload "
            "cho tầng gọi (FR-GROUP-5.5) — PLAN mục 4.6."
        ),
        "createGroupNameChangeNotification — Input Validation": (
            "Xác minh validation đầu vào (ObjectId) trước khi tra cứu nhóm đổi tên (FR-GROUP-5.6) — PLAN mục 4.6."
        ),
        "createGroupNameChangeNotification — Group Not Found": (
            "Xác minh phản hồi khi nhóm không tồn tại (404), không enqueue sai (FR-GROUP-5.6) — PLAN mục 4.6."
        ),
        "createGroupNameChangeNotification — Happy Path": (
            "Xác minh broadcast đổi tên nhóm tới thành viên với oldName/newName đúng (FR-GROUP-5.6) — PLAN mục 4.6."
        ),
    }
    return m.get(h, "Xác minh notification producer đúng SRS FR-GROUP-5.5/5.6 và PLAN mục 4.6.")


def goal_assignment(heading: str) -> str:
    h = heading.strip()
    pairs = [
        ("Edge Cases", "Xác minh biên đầu vào của validateAssignmentPermissions (target rỗng/null) — FR-ASSIGN, PLAN mục 4.5."),
        ("Self-assignment", "Xác minh tự phân công luôn được phép bất kể role (đặc thù FR-ASSIGN) — PLAN mục 4.5."),
        ("User không tồn tại", "Xác minh user không tồn tại / không active bị đưa vào restrictedIds an toàn — FR-ASSIGN, PLAN mục 4.5."),
        ("PM non-lead", "Xác minh ma trận PM non-lead: được/không được gán theo nhóm PM/PO/lead — FR-ASSIGN, PLAN mục 4.5."),
        ("PO non-lead", "Xác minh ma trận PO non-lead đối xứng policy với PM — FR-ASSIGN, PLAN mục 4.5."),
        ("PM lead", "Xác minh PM lead được phân công rộng (kể cả lead khác) — FR-ASSIGN, PLAN mục 4.5."),
        ("PO lead", "Xác minh PO lead được phân công rộng — FR-ASSIGN, PLAN mục 4.5."),
        ("Leader (non-PM/PO)", "Xác minh leader không phải PM/PO: được gán non-lead, không gán chéo leader — FR-ASSIGN, PLAN mục 4.5."),
        ("Regular role", "Xác minh role thường (không PM/PO/leader) không gán người khác — FR-ASSIGN, PLAN mục 4.5."),
        ("Mixed valid + restricted", "Xác minh tổ hợp valid + restricted: validIds partial và errorMessage đúng luật — FR-ASSIGN, PLAN mục 4.5."),
        ("errorMessage behavior", "Xác minh điều kiện điền errorMessage (all restricted vs có valid) — FR-ASSIGN, PLAN mục 4.5."),
    ]
    for key, text in pairs:
        if key in h:
            return text
    return "Xác minh validateAssignmentPermissions khớp FR-ASSIGN và ma trận PLAN mục 4.5."


def goal_task_helpers(heading: str) -> str:
    h = heading.strip()
    if "normalizeId" in h:
        return (
            "Xác minh chuẩn hóa ID (string / ObjectId / populated) dùng xuyên suốt pipeline task, "
            "tránh lọt giá trị không resolve được — PLAN mục 4.4."
        )
    if "buildRecipientList" in h:
        return (
            "Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) "
            "theo FR-NOTIF-5 — PLAN mục 4.4."
        )
    if "buildFolderClauses" in h:
        return (
            "Xác minh điều kiện truy vấn MongoDB theo default vs non-default folder (FR-FOLDER-5) — PLAN mục 4.4."
        )
    if "hasFolderAssignment" in h:
        return (
            "Xác minh thành viên có trong memberAccess của folder (đồng bộ quyền folder-scoped) — "
            "FR-FOLDER / PLAN mục 4.4."
        )
    return "Xác minh pure helper task.service khớp PLAN mục 4.4 và luồng FR-TASK / FR-NOTIF."


def goal_date_helper(heading: str) -> str:
    h = heading.strip()
    if "isValidDate" in h:
        return (
            "Xác minh nhận diện ngày hợp lệ phục vụ calendar, repeat task, due soon "
            "(FR-TASK-6, FR-TASK-9, FR-NOTIF-5.8) — PLAN mục 4.3."
        )
    if "getFirstDayOfMonth" in h or "getLastDayOfMonth" in h:
        return "Xác minh ranh giới tháng (đầu/cuối) phục vụ calendar (FR-TASK-6) — PLAN mục 4.3."
    if "addDays" in h:
        return "Xác minh cộng trừ ngày ổn định cho lịch và SLA hiển thị — PLAN mục 4.3."
    if "addHours" in h:
        return "Xác minh cộng trừ giờ cho mốc thời gian và thông báo — PLAN mục 4.3."
    if "daysBetween" in h or "hoursBetween" in h:
        return "Xác minh khoảng cách thời gian (ngày/giờ) phục vụ báo cáo và UI — PLAN mục 4.3."
    if "isSameDay" in h:
        return "Xác minh so sánh cùng ngày (bỏ qua giờ) cho calendar và filter — PLAN mục 4.3."
    if "getToday" in h or "getTomorrow" in h or "getYesterday" in h:
        return "Xác minh neo mốc hôm nay / mai / hôm qua nhất quán múi giờ local — PLAN mục 4.3."
    if "formatRelativeTime" in h:
        return "Xác minh chuỗi thời gian tương đối (FR-NOTIF / activity UI) — PLAN mục 4.3."
    if "formatDateToYYYYMMDD" in h:
        return "Xác minh định dạng ngày YYYY-MM-DD cho export và query — PLAN mục 4.3."
    if "isPastDate" in h or "isFutureDate" in h:
        return "Xác minh phân loại quá khứ / tương lai phục vụ hạn task và reminder — PLAN mục 4.3."
    if "parseDate" in h:
        return "Xác minh parse chuỗi ngày an toàn (invalid → null) — PLAN mục 4.3."
    return "Xác minh dateHelper đúng hợp đồng PLAN mục 4.3 và use case FR-TASK / FR-NOTIF."


def goal_group_permissions(heading: str) -> str:
    h = heading.strip()
    rules = [
        (
            "canCreateTasks",
            "Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1.",
        ),
        (
            "canEditTask",
            "Xác minh quyền cập nhật task (FR-TASK-4.3): admin/creator/assignee/QA có folder vs leader — PLAN mục 4.1.",
        ),
        (
            "canDeleteTask",
            "Xác minh quyền xóa task (FR-TASK-5.2); lưu ý assignee không được xóa — PLAN mục 4.1.",
        ),
        (
            "canWriteInFolder",
            "Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1.",
        ),
        (
            "canViewFolder",
            "Xác minh quyền xem folder theo FR-FOLDER-5 và các role xem toàn cục — PLAN mục 4.1.",
        ),
        (
            "canViewAllFolders",
            "Xác minh canViewAllFolders (object + legacy string) khớp ma trận PM/PO/Sale vs scoped — PLAN mục 4.1.",
        ),
        (
            "requiresFolderAssignment",
            "Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1.",
        ),
        ("isAdminRole", "Xác minh nhận diện admin role phục vụ nhánh quyền cao — PLAN mục 4.1."),
        (
            "canManageFolders",
            "Xác minh quyền quản lý cấu trúc folder (FR-FOLDER-1,3,4) — PLAN mục 4.1.",
        ),
        (
            "canAssignFolderMembers",
            "Xác minh quyền gán thành viên vào folder (FR-FOLDER-5.1) — PLAN mục 4.1.",
        ),
        ("isReadOnlyRole", "Xác minh READ_ONLY roles (Sale/QA/dev manager) — PLAN mục 4.1."),
        ("getRoleGroup", "Xác minh mapping role → nhóm chức năng (PRODUCT_TEAM, DELIVERY, …) — PLAN mục 4.1."),
        ("isRoleInGroup", "Xác minh helper isRoleInGroup nhất quán với nhóm role — PLAN mục 4.1."),
    ]
    for key, text in rules:
        if key in h:
            return text
    return "Xác minh ma trận phân quyền nhóm/folder/task (SRS FR-FOLDER, FR-TASK, FR-ASSIGN; PLAN mục 4.1)."


def goal_validation(heading: str) -> str:
    h = heading.strip()
    if "validatePassword" in h:
        return "Xác minh ràng buộc mật khẩu (FR-AUTH-1.4, FR-USER-2.3) trước khi lưu user — PLAN mục 4.2."
    if "isValidEmail" in h:
        return "Xác minh định dạng email đăng ký/đăng nhập (FR-AUTH-1.3) — PLAN mục 4.2."
    if "isValidObjectId" in h:
        return "Xác minh ObjectId 24 hex (C-12) để chặn ID bẩn vào DB — PLAN mục 4.2."
    if "isValidTaskStatus" in h:
        return "Xác minh status task title-case (FR-TASK-1.5), tránh enum lệch — PLAN mục 4.2."
    if "isValidTaskPriority" in h:
        return "Xác minh mức ưu tiên task hợp lệ (FR-TASK-1.6) — PLAN mục 4.2."
    if "isValidColor" in h:
        return "Xác minh mã màu #RGB/#RRGGBB cho label/UI — PLAN mục 4.2."
    if "isValidLength" in h:
        return "Xác minh giới hạn độ dài chuỗi (C-10: max 200) — PLAN mục 4.2."
    if "validateTaskDates" in h:
        return "Xác minh cặp start/due date hợp lệ khi tạo-sửa task — PLAN mục 4.2."
    if "validatePagination" in h:
        return "Xác minh sanitize phân trang (NFR-PERF-2: page/limit an toàn) — PLAN mục 4.2."
    if "sanitizeEnumArray" in h:
        return "Xác minh mảng enum nhãn task (FR-TASK-1.7, C-9 max 10) — PLAN mục 4.2."
    if "sanitizeSort" in h:
        return "Xác minh sortBy/order whitelist + default — PLAN mục 4.2."
    if "sanitizeString" in h:
        return "Xác minh trim/giới hạn chuỗi đầu vào API — PLAN mục 4.2."
    if "isValidUrl" in h:
        return "Xác minh URL hợp lệ cho trường link/attachment — PLAN mục 4.2."
    if "isNonEmptyArray" in h or "isNonEmptyObject" in h:
        return "Xác minh guard non-empty array/object cho payload — PLAN mục 4.2."
    return "Xác minh validationHelper khớp constraints SRS C-6–C-12 và FR liên quan — PLAN mục 4.2."


def goal_group_role_utils(heading: str) -> str:
    h = heading.strip()
    if "getMemberId" in h:
        return "Xác minh trích userId từ member (string vs populated) cho UI group — PLAN mục 4.7."
    if "getMemberRole" in h:
        return "Xác minh tra role theo user trong group (show/hide đúng) — PLAN mục 4.7."
    if "isReadOnlyRole" in h:
        return "Xác minh READ_ONLY role phía FE khớp backend — PLAN mục 4.7."
    if "requiresFolderAssignment" in h:
        return "Xác minh role cần gán folder trước khi bật thao tác — PLAN mục 4.7."
    if "canManageRoles" in h:
        return "Xác minh quyền chỉnh role thành viên trên UI — PLAN mục 4.7 / FR-GROUP."
    if "canAddMembers" in h:
        return "Xác minh quyền mời thêm thành viên (FR-GROUP-5.1) — PLAN mục 4.7."
    if "canManageFolders" in h:
        return "Xác minh quyền quản lý folder trên UI (FR-FOLDER-1,3,4) — PLAN mục 4.7."
    if "canAssignFolderMembers" in h:
        return "Xác minh quyền gán thành viên vào folder (FR-FOLDER-5.1) — PLAN mục 4.7."
    if "isPersonalWorkspaceOwner" in h:
        return "Xác minh chủ personal workspace (FR-GROUP-6) — PLAN mục 4.7."
    return "Xác minh groupRoleUtils.ts khớp policy SRS và PLAN mục 4.7."


def pick_goal(basename: str, heading: str) -> str:
    if basename == "CHECKLIST_01_notification_producer.md":
        return goal_notification(heading)
    if basename == "CHECKLIST_02_task_assignment.md":
        return goal_assignment(heading)
    if basename == "CHECKLIST_03_task_helpers.md":
        return goal_task_helpers(heading)
    if basename == "CHECKLIST_04_dateHelper.md":
        return goal_date_helper(heading)
    if basename == "CHECKLIST_05_groupPermissions.md":
        return goal_group_permissions(heading)
    if basename == "CHECKLIST_06_validationHelper.md":
        return goal_validation(heading)
    if basename == "CHECKLIST_07_groupRoleUtils.md":
        return goal_group_role_utils(heading)
    return f"Xác minh đúng yêu cầu SRS / PLAN (nhóm: {heading[:60]}…)." if len(heading) > 60 else f"Xác minh đúng yêu cầu SRS / PLAN (nhóm: {heading})."


def transform_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines(keepends=True)
    out: list[str] = []
    in_tests = False
    last_h3 = ""
    changed = False
    basename = path.name

    for line in lines:
        if line.startswith("## TEST CASES"):
            in_tests = True
            last_h3 = ""
            out.append(line)
            continue
        if in_tests and line.startswith("## ") and not line.startswith("## TEST CASES"):
            in_tests = False
            out.append(line)
            continue

        if in_tests and line.startswith("### "):
            last_h3 = line[4:].strip()
            out.append(line)
            continue

        if in_tests and line.rstrip("\n\r") == OLD_HEADER:
            out.append(NEW_HEADER + ("\n" if line.endswith("\n") else ""))
            changed = True
            continue
        if in_tests and line.rstrip("\n\r") == OLD_SEP:
            out.append(NEW_SEP + ("\n" if line.endswith("\n") else ""))
            changed = True
            continue

        if in_tests and ROW_RE.match(line):
            cells = split_table_row(line)
            if cells is None or len(cells) != 8:
                out.append(line)
                continue
            tid, method, scenario, din, expect, actual, pf, note = cells
            goal = pick_goal(basename, last_h3)
            new_cells = [tid, method, goal, scenario, din, expect, actual, pf, note]
            if line.endswith("\r\n"):
                eol = "\r\n"
            elif line.endswith("\n"):
                eol = "\n"
            else:
                eol = ""
            out.append("| " + " | ".join(new_cells) + " |" + eol)
            changed = True
            continue

        out.append(line)

    if changed:
        path.write_text("".join(out), encoding="utf-8")
    return changed


def main() -> None:
    root = Path(__file__).resolve().parent / "checklists"
    files = sorted(root.glob("CHECKLIST_*.md"))
    if not files:
        raise SystemExit(f"No checklists under {root}")
    for f in files:
        if transform_file(f):
            print("updated:", f.name)
        else:
            print("skip (no change):", f.name)


if __name__ == "__main__":
    main()
