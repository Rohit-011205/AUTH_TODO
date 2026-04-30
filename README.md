# Task.Base - Project & Task Manager

A full-stack project and task management application built with React, Node.js, Express, and MongoDB.

## 🚀 Live Demo
     https://task-base-rust.vercel.app

## ⚠️ Important Note
> OTP email verification may not work as the email service is running on a free Gmail account with limited access. To test the app, use the following test credentials:
> - **Email:** collegerohit789@gmail.com
> - **Password:** 1234

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Zustand (State Management)
- Axios
- React Router DOM

**Backend**
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- Nodemailer (OTP)

## ✨ Features
- OTP-based Email Verification
- JWT Authentication (Signup, Login, Logout)
- Create, View, Delete Projects
- Create, View, Update Status, Delete Tasks
- Protected Routes
- Persistent Login Session
- Responsive UI with Dark Theme

## 📁 Project Structure
AUTH_TODO/
├── Backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── Middleware/
│   ├── NodeMailer.js
│   └── server.js
└── Frontend/
├── src/
│   ├── pages/
│   ├── store/
│   ├── API.js
│   └── App.jsx
└── index.html

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/verify-otp | Verify OTP |
| POST | /api/auth/login | Login |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/projects/create | Create project |
| GET | /api/projects/get | Get all projects |
| DELETE | /api/projects/delete/:id | Delete project |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/tasks/create/:projectId | Create task |
| GET | /api/tasks/get/:projectId | Get tasks |
| PUT | /api/tasks/update/:id/status | Update status |
| DELETE | /api/tasks/delete/:id | Delete task |
