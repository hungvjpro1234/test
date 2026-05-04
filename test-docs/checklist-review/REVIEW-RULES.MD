# Rule: How to Evaluate Pass / Fail / N/A in Code Review Checklist

## Purpose
Use this rule when reviewing source code against a checklist item.  
Do **not** guess. Every result must be based on observable evidence in the code.

---

## 1. Result meanings

- **Pass**: The checklist item applies to the reviewed scope, and the code satisfies it. No defect is found for that item.
- **Fail**: The checklist item applies to the reviewed scope, and at least one defect is found.
- **N/A**: The checklist item does not apply to the reviewed scope, stack, language, or module.

---

## 2. Mandatory note rule

### For every **Fail** or **N/A**, the reviewer **must write a clear explanation in the Notes column**.

- A **Fail** result is invalid if it does not explain:
  - what is wrong
  - where the issue appears
  - why it is considered a defect

- An **N/A** result is invalid if it does not explain:
  - why the checklist item does not apply to this scope, stack, or module

### Minimum requirement
- **Fail** → must include a concrete reason and code-context explanation
- **N/A** → must include a concrete reason for non-applicability

### Examples

**Valid Fail note**
- `req.params.id` is used directly in `findById()` without ObjectId validation in `taskController.js`.

**Invalid Fail note**
- Error
- Not good
- Failed

**Valid N/A note**
- Not applicable for JavaScript/Node.js because this project does not use manual memory management or pointers.

**Invalid N/A note**
- N/A
- Not relevant

---

## 3. Core review logic

For each checklist question, always follow this order:

### Step 1 — Check applicability
Ask:
- Does this question apply to the current module, file, feature, or stack?
- Is this relevant to backend, frontend, database, auth, socket, etc.?

If **no**, mark **N/A** and explain clearly in Notes.

Examples:
- Pointer-related checks in Node.js/JavaScript → **N/A**
- Socket.IO checks in a module that does not use sockets → **N/A**
- Frontend UI state checks in a backend middleware file → **N/A**

---

### Step 2 — Find the relevant code
Open the actual code locations related to the checklist item.

Examples:
- Input validation → routes, controllers, middlewares
- Business logic separation → controllers, services, utils
- MongoDB query safety → models, services, repositories
- Role-based access → middleware, controller guards, service checks
- Frontend loading/error state → page, component, hook, context
- Socket event safety → realtime/socket handlers, listeners, emitters

Do not review unrelated files.

---

### Step 3 — Look for evidence
You must identify one of these:

- clear evidence the requirement is implemented correctly → **Pass**
- clear evidence at least one issue exists → **Fail**
- clear evidence the item does not apply → **N/A**

Never mark **Pass** just because “nothing looks wrong”.

---

## 4. How to decide Pass / Fail / N/A

### Mark **Pass** when:
- The item applies
- You checked the relevant code
- The implementation is present and correct
- No defect is found for that checklist item

Example:
- A route uses `authMiddleware` and `validateCreateTask` before controller execution
- Controller delegates logic to service layer
- Mongo query has pagination and proper error handling

---

### Mark **Fail** when:
- The item applies
- You checked the relevant code
- At least one issue is found

Important:
- **One defect is enough to mark Fail**
- A single failed checklist item may contain **multiple errors**
- A **Fail** must always include a written explanation in Notes

Example:
- `req.params.id` not validated
- Admin route has no role check
- Controller contains validation, business logic, DB writes, and notification logic all in one file

---

### Mark **N/A** when:
- The item truly does not apply to the reviewed scope

Important:
- An **N/A** must always include a written explanation in Notes

Example notes:
- “Not applicable for JavaScript/Node.js.”
- “Not applicable because this frontend component does not access request data.”
- “Not applicable because this module does not use Socket.IO.”

Do not overuse **N/A** to avoid analysis.

---

## 5. How to count errors

### Review Result
- Each row gets only **one** of: Pass / Fail / N/A

### Number of Errors
- Count the total number of actual defects found
- One **Fail** row may produce multiple errors

Example:
Checklist item:
> Are request inputs validated before being processed?

Findings:
- `req.params.id` not validated
- invalid `ObjectId` not handled safely

Result:
- Review Result = **Fail**
- Number of Errors = **2**

---

## 6. Notes writing rule

### If Pass
Writing a note is recommended but not mandatory unless the review template requires it.

Examples:
- `req.body` is validated through middleware before controller execution.
- Business logic is delegated to service layer.
- Error responses follow a consistent structure.

### If Fail
Writing a note is **mandatory**.

The note must state:
- the concrete defect
- the relevant file/layer/context if available
- why it fails the checklist item

Examples:
- `req.params.id` is used directly in `findById()` without ObjectId validation.
- Controller contains business logic and database operations instead of delegating to service layer.
- Role-based access check is missing in admin-only route.

### If N/A
Writing a note is **mandatory**.

The note must state:
- why the checklist item does not apply

Examples:
- Not applicable for JavaScript/Node.js because the project does not use manual memory management.
- Not applicable for this presentational frontend component.
- Not applicable because this module does not use real-time socket events.

---

## 7. Review scope rule

Do not review the whole codebase for every question.

Always review by **defined scope**, for example:
- Backend - Auth module
- Backend - Notification module
- Frontend - Admin pages
- Frontend - Task management pages

Then judge each checklist item **within that scope only**.

This means:
- Some items will be **Pass**
- Some will be **Fail**
- Some will be **N/A**

That is normal.

---

## 8. Simple decision template for the agent

For each checklist item, ask:

1. **Does this apply to the reviewed scope?**
   - No → **N/A** + mandatory explanation in Notes
   - Yes → continue

2. **Which files or layers should be checked?**
   - controller / service / model / middleware / route / component / hook / socket / etc.

3. **What evidence is present?**
   - Correct implementation with no defect → **Pass**
   - At least one concrete defect → **Fail** + mandatory explanation in Notes

4. **How many defects were found?**
   - Record in **Number of Errors**

5. **What short note explains the result?**
   - Required for **Fail** and **N/A**
   - Recommended for **Pass**

---

## 9. Example

### Checklist item
> Are request inputs validated before being processed?

### Reviewed scope
Backend - Task module

### Code found
```js
router.get('/tasks/:id', authMiddleware, getTaskById);

export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  return res.json(task);
};