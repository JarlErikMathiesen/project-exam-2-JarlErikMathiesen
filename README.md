# Holidaze – Accommodation Booking Front-End

Welcome to **Holidaze**, a modern accommodation booking platform. This project is a single-page application built as part of Project Exam 2. It allows users to browse venues, make bookings, and manage listings through the Noroff v2 API.

The application supports both **customers** and **venue managers**, each with tailored functionality.

---

## 🎯 Project Goal

The goal of this project is to demonstrate the ability to plan, design, and build a fully functional front-end application using modern tools and frameworks.

It showcases:

- API integration
- State management and authentication
- Component-based architecture in React
- Form handling and validation
- Responsive UI development

---

## ✨ Features

### 🏠 Customer Functionality

- Browse venues on the home page
- View detailed venue pages with image gallery and booking calendar
- Book venues directly from the venue page
- View bookings in user profile

### 🛠️ Venue Manager Functionality

- Register as a venue manager
- Create new venues
- Edit and delete owned venues
- View bookings for managed venues

### 👤 General User Functionality

- Register (requires @stud.noroff.no email)
- Login and logout
- Persistent authentication using localStorage
- Manage profile information

---

## 🛠 Technical Specifications

### Frameworks and Libraries

- **React 19**
- **Vite 7**
- **React Router 7**
- **Styled Components 6**
- **React Hook Form 7 + Yup** (validation)
- **React Day Picker** (calendar)
- **ESLint 9**

### API Integration

The application uses the **Noroff v2 API** for all data operations:

- Venues
- Bookings
- Authentication

All requests are handled through a centralized `apiFetch()` function that:

- Adds JSON headers
- Adds `X-Noroff-API-Key` from environment variables
- Includes `Authorization: Bearer <token>` if available

---

🚀 Setup and Installation
Prerequisites
Node.js (>= 18)
Noroff API key
Installation

Clone the repository:

git clone <your-repo-url>

Navigate into the project folder:
bash```
cd holidaze

Install dependencies:
bash```
npm install

Run development server:
bash```
npm run dev

Build for production:
bash```
npm run build
