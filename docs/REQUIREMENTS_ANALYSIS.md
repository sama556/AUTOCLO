# Instructor Dashboard System (AUTOCLO) — Requirements Analysis

## 1. Project Overview

**Purpose:** Outcome-based education (OBE) dashboard for instructors to manage courses, link learning outcomes to benchmarks, run assessments, analyze performance, and use AI (Google Gemini) for analytics, reports, and career guidance.

**Tech Stack:** HTML, CSS, JavaScript (vanilla), Toast notifications, Font Awesome, AOS (Animate On Scroll).

**Design Tokens (CSS Variables):**
```css
:root {
  --shell: #F7F5F1;
  --stone: #E0DCD1;
  --sky: #D5E3E8;
  --honeydew: #E4E3BC;
  --viridian: #344945;
}
```

**Language:** Website content and UI in **English** (database/labels can stay as provided; API and code identifiers in English).

---

## 2. Database Schema (Normalized)

| # | Table (EN) | Key Fields | Purpose |
|---|------------|------------|--------|
| 1 | **instructors** | id, full_name, email, password, department_id | Instructor accounts and department |
| 2 | **courses** | id, name, department_id | Courses per department |
| 3 | **sections** | id, course_id, instructor_id, section_number, semester | Sections (classes) of a course taught by an instructor |
| 4 | **students** | id, full_name, email, department_id | Student accounts |
| 5 | **section_enrollments** | id, student_id, section_id, enrolled_at | Student enrollment in sections |
| 6 | **learning_outcomes** | id, course_id, title, description | LOs per course |
| 7 | **benchmarks** | id, learning_outcome_id, name, type, value | Benchmark types: ratio / average / min–max; value stores threshold |
| 8 | **assessments** | id, section_id, type, title, max_grade, weight | type: assignment / exam / project |
| 9 | **assessment_lo_links** | id, assessment_id, learning_outcome_id | Links assessments to LOs for evaluation |
| 10 | **grades** | id, student_id, assessment_id, score, recorded_at | Student grades per assessment |

**Relationships (concise):**
- Instructor → Department; Course → Department; Section → Course, Instructor; Student → Department.
- Section ↔ Students via section_enrollments.
- Course → Learning Outcomes → Benchmarks.
- Section → Assessments; Assessment ↔ Learning Outcomes via assessment_lo_links.
- Grades: Student + Assessment → one grade record.

---

## 3. Instructor Features (Functional Requirements)

### 3.1 Authentication
- **Login:** Email + password.
- **Session:** Persist instructor id and department_id (e.g. localStorage/sessionStorage or cookie) for filtering data.
- **Logout:** Clear session and redirect to login.

### 3.2 Course Management
- **View assigned courses:** List courses where `course.department_id = instructor.department_id` (and optionally filter by assignments: sections where `section.instructor_id = current_instructor_id`).
- **Display:** Course name, course id, linked sections, semester; optional link to section detail.

### 3.3 Link Outcomes (LO ↔ Benchmark) — from main/dashboard
- **From main page:** List LOs (by course or by assigned courses) with their benchmarks.
- **Action:** For each Learning Outcome, link/select the corresponding Benchmark (one-to-one or one-to-many as per schema: one LO can have multiple benchmarks).
- **Data:** Use `learning_outcomes` and `benchmarks` (benchmark.learning_outcome_id). UI: dropdown or selector to attach benchmark to LO if not already linked, or display existing links.

### 3.4 Assessment Management
- **Add assessment:** Section, type (assignment / exam / project), title, date (optional in schema; can add to assessments table or use `recorded_at` from grades), max grade, weight.
- **List/Edit/Delete:** List assessments per section; edit title, type, max_grade, weight; delete if no grades depend on it (or soft-delete).
- **Link assessments to LOs:** Use `assessment_lo_links` to associate an assessment with one or more learning outcomes (for later performance analysis).

### 3.5 Performance Analysis
- **View:** Results of performance analysis per section/course: achievement rates per LO, per benchmark.
- **Display:** AI-generated notes (from Gemini), achievement percentages, strengths/weaknesses (from AI analysis).
- **Input for AI:** Aggregated grades, LO–assessment links, benchmark types/values; send to Gemini API for insights.

### 3.6 Career Guidance (Instructor View)
- **View Career Recommendations:** List or detail view of AI-driven career recommendations per student (or per section).
- **Data source:** Recommendation system powered by Gemini (inputs: LOs, grades, benchmarks, optional student preferences).
- **Use case:** Instructor uses this to guide students in advising sessions.

### 3.7 Report Management
- **View analytical reports:** List available reports (e.g. by section, course, semester).
- **Choose format:** e.g. PDF, DOCX (or HTML print).
- **Download:** Via dedicated link or “Export” button; report content generated with Gemini (NLP/NLG) and optionally server-side rendering.

---

## 4. AI by Gemini — Capabilities

| # | Capability | Implementation idea |
|---|------------|---------------------|
| 1 | **Student data analysis (strengths/weaknesses)** | Send aggregated grades + LOs + benchmarks to Gemini; prompt for per-student or per-LO analysis (Data Analysis / ML-style reasoning). |
| 2 | **Formal/text reports generation** | Use NLP/NLG: structured data (grades, LOs, benchmarks, achievement rates) → Gemini → narrative or formal report text; then format (HTML/PDF). |
| 3 | **Career recommendations** | Recommendation logic: inputs = LOs achieved, grades, benchmarks; Gemini suggests career paths or skills; store as “Career Recommendation” for instructor/student view. |
| 4 | **Decision support / smart UI** | Use Gemini for short suggestions in UI (e.g. “Consider adding an assessment for LO X”) or next-best-action tips based on current dashboard state. |

**API:** Google Gemini API (REST or SDK) from a backend service (e.g. Node/Python). Frontend sends requests to your backend; backend calls Gemini and returns results (to avoid exposing API key).

---

## 5. Page & Screen Structure (Suggested)

- **login.html** — Email/password login.
- **dashboard.html** — Main instructor dashboard:
  - Quick stats (courses, sections, pending actions).
  - **Link LOs to Benchmarks** (main-page action as per requirements).
  - Shortcuts to courses, assessments, performance, reports.
- **courses.html** (dashboard) — List assigned courses; click → section list.
- **sections.html** — List sections (by course or all); link to assessments and grades.
- **outcomes.html** — Manage LOs and link to benchmarks (can be merged into dashboard if “from main page” only).
- **assessments.html** — List/Add/Edit assessments; link assessments to LOs.
- **grades.html** (or **assessment-grades.html**) — Enter/view grades per assessment.
- **performance.html** — Performance analysis, achievement rates, AI notes.
- **career-recommendations.html** — View career recommendations (by student/section).
- **reports.html** — List reports, choose format, download via link.

Optional: **profile.html** (instructor profile), **404.html** (already present).

---

## 6. UI/UX Requirements

- **Toasts:** Success/error/info for form submit, save, delete, API errors (e.g. use a library like Toastify or similar).
- **Icons:** Font Awesome for nav, buttons, tables, status indicators.
- **Animations:** AOS for scroll-based animations on sections/cards.
- **Theme:** Use the provided palette:
  - **Backgrounds:** --shell (page), --stone (cards/panels), --sky (highlights), --honeydew (accents).
  - **Primary actions / text:** --viridian (buttons, headings, primary text).
- **Responsive:** Mobile-first; tables scroll or collapse on small screens.
- **Accessibility:** Semantic HTML, labels, ARIA where needed, focus states.

---

## 7. Data Flow (High Level)

1. **Login** → Validate credentials → Store instructor_id, department_id → Redirect to dashboard.
2. **Dashboard** → Load courses/sections for instructor → Load LOs/Benchmarks for linking.
3. **LO–Benchmark link** → Save/update links (backend/API) → Refresh list.
4. **Assessments** → CRUD assessments → Link to LOs via `assessment_lo_links`.
5. **Grades** → Enter grades per (student, assessment) → Stored in `grades`.
6. **Performance** → Backend aggregates grades by LO/benchmark → Optionally send to Gemini → Return rates + AI notes → Display.
7. **Career recommendations** → Backend (or cron) calls Gemini with student/LO/grade data → Store recommendations → Instructor views in UI.
8. **Reports** → User selects report + format → Backend generates (with Gemini for text) → Return download link.

---

## 8. Out of Scope (Frontend-Only Assumptions)

- **Backend/API:** Not in this analysis; required for auth, CRUD, and Gemini. Assume REST or similar; frontend consumes JSON.
- **Database implementation:** Schema only; no SQL or ORM defined here.
- **Admin panel:** Only instructor-facing dashboard in scope.
- **Student portal:** Mentioned only as consumer of “career recommendations”; not part of instructor dashboard scope.

---

## 9. Summary Checklist

| Area | Item | Status |
|------|------|--------|
| DB | 10 tables mapped (instructors → grades) | Done |
| Auth | Login (email/password) | Required |
| Courses | Show assigned courses (dept + instructor) | Required |
| LO–Benchmark | Link each LO to benchmark from main page | Required |
| Assessments | Add/Edit: type, title, max grade, weight; link to LOs | Required |
| Performance | View analysis, AI notes, achievement rates | Required |
| Career | View AI career recommendations | Required |
| Reports | View, choose format, download | Required |
| AI | Gemini: analysis, reports, recommendations, decision support | Required |
| UI | HTML/CSS/JS, Toast, Font Awesome, AOS, :root palette | Required |
| Language | Website in English | Required |

This document can be used as the single source of truth for implementation and for creating issues/tasks (e.g. login page, dashboard LO linking, assessment CRUD, Gemini integration).
