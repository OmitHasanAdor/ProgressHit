# 🎯 ProgressHit – Goal & Progress Tracking Platform

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit-blue?style=for-the-badge)](YOUR_LIVE_SITE_URL)
[![Client Repo](https://img.shields.io/badge/Repository-GitHub-black?style=for-the-badge\&logo=github)](https://github.com/OmitHasanAdor/ProgressHit)

### ProgressHit is a modern, user-friendly, and fully responsive goal and progress tracking web application designed to help users set goals, manage tasks, track progress, and stay focused on their achievements. The platform provides a clean dashboard experience where users can organize their targets and monitor their progress in one place.

---

## Technologies Used

* **Frontend Framework:** Next.js (App Router)
* **Programming Language:** TypeScript
* **Authentication:** Better Auth
* **UI & Styling:** Tailwind CSS & shadcn/ui
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Form & Validation:** React Hook Form & Zod
* **State Management:** React Hooks
* **Icons:** Lucide React
* **Notifications:** Sonner
* **Deployment:** Vercel

---

## Features

1. **Secure Authentication:** User registration, login, logout, and session management powered by Better Auth.

2. **Goal Management:** Users can create, update, delete, and manage their personal goals and targets.

3. **Progress Tracking:** Track the completion percentage of each goal and easily understand current progress.

4. **Task Management:** Create and manage tasks related to specific goals to maintain a structured workflow.

5. **Progress Dashboard:** A clean dashboard provides an overview of goals, completed tasks, pending tasks, and overall progress.

6. **Target-Based Tracking:** Set specific targets and monitor progress toward achieving them.

7. **Database Integration:** PostgreSQL is used for reliable and structured data storage, with Prisma providing a clean and type-safe database layer.

8. **Modern UI:** Built with Tailwind CSS and shadcn/ui for a clean, accessible, and responsive interface.

9. **Responsive Design:** Optimized for mobile, tablet, and desktop devices.

10. **User-Specific Data:** Each authenticated user can securely access and manage their own goals, tasks, and progress information.

---

## Core Concept

ProgressHit follows a simple workflow:

**Set → Track → Progress → Achieve**

Users can set their targets, break them into manageable tasks, track their progress, and stay motivated until the target is achieved.

---

## Project Structure

```text
ProgressHit/
├── app/
│   ├── dashboard/
│   ├── goals/
│   ├── tasks/
│   ├── login/
│   └── register/
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── goals/
│   └── tasks/
├── lib/
│   ├── auth/
│   ├── prisma/
│   └── utils/
├── prisma/
│   └── schema.prisma
├── public/
├── types/
└── README.md
```

---

## Database

ProgressHit uses **PostgreSQL** as the primary database and **Prisma ORM** for database management.

The database is designed to handle:

* User accounts
* Goals
* Tasks
* Progress data
* Goal completion status
* User-specific relationships

Prisma provides type-safe database queries and makes it easier to manage the application's relational data.

---

## 🔐 Authentication

Authentication is handled using **Better Auth**, providing secure user authentication and session management.

Authenticated users can:

* Create an account
* Sign in securely
* Manage their profile
* Access their personal dashboard
* Create and manage their own goals
* Track their personal progress

---

## 🎨 UI & Design

The application uses **shadcn/ui** and **Tailwind CSS** to create a clean and modern user interface.

The design focuses on:

* Minimal and intuitive layouts
* Clear progress indicators
* Responsive components
* Accessible UI elements
* Simple navigation
* Dashboard-focused user experience

---

## 🔗 Project Links

| Resource             | Link                                           |
| -------------------- | ---------------------------------------------- |
| 🌐 Live Site         | [ProgressHit](YOUR_LIVE_SITE_URL)              |
| 💻 GitHub Repository | [ProgressHit Repository](https://github.com/OmitHasanAdor/ProgressHit) |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the required environment variables:

```env
DATABASE_URL="your_postgresql_database_url"

BETTER_AUTH_SECRET="your_better_auth_secret"
BETTER_AUTH_URL="your_application_url"
```

Add any additional environment variables required by your project configuration.

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone YOUR_GITHUB_REPO_URL
```

Navigate to the project directory:

```bash
cd progresshit
```

Install dependencies:

```bash
npm install
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

---

## 📌 Future Improvements

* Advanced progress analytics
* Goal streak tracking
* Daily and weekly progress reports
* Reminder and notification system
* Goal categories
* Achievement badges
* Progress charts and statistics
* Improved dashboard customization

---

## 👨‍💻 Developer

**Omit Hasan Ador**

Frontend-Focused MERN Stack Developer

* GitHub: [OmitHasanAdor](https://github.com/OmitHasanAdor)

---

### ProgressHit

**Set your target. Track your progress. Hit your goals. 🎯**
