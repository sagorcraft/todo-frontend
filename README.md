# Doable - Todo Management App (React)

A responsive todo manager built with React, React Router, Context API and LocalStorage.

## Run it

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

Other commands: `npm run build` (production build), `npm run preview` (serve the build).

## Features

- Register, log in, log out, demo password reset
- Protected dashboard (logged-out visitors go to /login)
- Add, edit, delete, complete / mark pending
- Creation date on every task, empty-task prevention, empty-state messages
- Each user only sees their own tasks
- Sidebar filters: All, Pending, Completed
- Stats: total, completed, pending, plus a progress bar
- Responsive: phone (slide-out sidebar), tablet, desktop

## Folder structure

```
src/
  components/   reusable UI (Sidebar, Navbar, TodoItem, FormField ...)
  pages/        Login, Register, ForgotPassword, Dashboard, NotFound
  context/      AuthContext (users + session), TodoContext (tasks)
  utils/        LocalStorage helpers and form validators
  App.jsx       routes
  main.jsx      entry point
  index.css     all custom styles
```

## Important

Authentication here is for demonstration only. Passwords are stored in
plain text in LocalStorage. A real app needs a backend with hashed passwords
and secure sessions.

## Demo password reset

No email is sent. On the Forgot Password page, enter the email of an existing
account, then choose a new password.
