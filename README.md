live link --- https://autoshine-next.vercel.app


# 🚗 AutoShine

### A modern car service booking platform built with Next.js, React, JavaScript, Tailwind CSS & DaisyUI.

AutoShine is a full-stack car service platform where users can explore car services, view service details, make bookings, submit reviews, and access personalized dashboard features.

---

## ✨ Features

- 🚗 Browse available car services
- 🔍 Search and filter services
- 📄 View service details
- 📅 Book car services
- ⭐ Add and view reviews
- 🔐 User authentication
- 🔵 Google authentication
- 📧 Email & password authentication
- 👤 Role-based access control
- 🛡️ Protected routes
- 📊 User/Admin dashboard
- 📱 Fully responsive design
- ⚡ Fast and modern Next.js architecture
- 🎨 Modern UI using Tailwind CSS & DaisyUI
- 🗄️ MongoDB database integration

---

## 🛠️ Technologies Used

- **Next.js**
- **React**
- **JavaScript**
- **Tailwind CSS**
- **DaisyUI**
- **MongoDB**
- **NextAuth.js**
- **bcrypt**
- **Google OAuth**
- **Next.js API Routes**
- **Vercel**
- **Git & GitHub**

---

## 📁 Project Structure

```text
autoshine-next/
│
├── 📁 src/
│   │
│   ├── 📁 app/
│   │   ├── 📄 favicon.ico
│   │   ├── 📄 globals.css
│   │   ├── 📄 layout.jsx
│   │   ├── 📄 loading.jsx
│   │   ├── 📄 not-found.jsx
│   │   │
│   │   ├── 📁 (withCommonLayout)/
│   │   │   │
│   │   │   ├── 📁 aboutUs/
│   │   │   │
│   │   │   ├── 📁 login/
│   │   │   │
│   │   │   ├── 📁 reviews/
│   │   │   │   ├── 📁 create-review/
│   │   │   │   ├── 📄 loading.jsx
│   │   │   │   └── 📄 page.jsx
│   │   │   │
│   │   │   ├── 📁 services/
│   │   │   │   ├── 📁 component/
│   │   │   │   │   ├── 📄 BookingBtn.jsx
│   │   │   │   │   ├── 📄 ServiceCard.jsx
│   │   │   │   │   └── 📄 ServicesSearching.jsx
│   │   │   │   │
│   │   │   │   ├── 📁 [slug]/
│   │   │   │   ├── 📄 loading.jsx
│   │   │   │   └── 📄 page.jsx
│   │   │   │
│   │   │   ├── 📁 signup/
│   │   │   │
│   │   │   ├── 📄 layout.jsx
│   │   │   └── 📄 page.jsx
│   │   │
│   │   ├── 📁 (withDashboardLayout)/
│   │   │   └── Dashboard pages...
│   │   │
│   │   └── 📁 api/
│   │       │
│   │       ├── 📁 auth/
│   │       │   └── 📁 [...nextauth]/
│   │       │       └── 📄 route.js
│   │       │
│   │       ├── 📁 bookings/
│   │       │   └── 📄 route.js
│   │       │
│   │       ├── 📁 reviews/
│   │       │   └── 📄 route.js
│   │       │
│   │       └── 📁 users/
│   │           └── 📄 route.js
│   │
│   ├── 📁 assets/
│   │
│   ├── 📁 components/
│   │   └── 📁 shared/
│   │       ├── 📄 Container.jsx
│   │       ├── 📄 DashboardSidebar.jsx
│   │       ├── 📄 Footer.jsx
│   │       └── 📄 Navbar.jsx
│   │
│   ├── 📁 context/
│   │   ├── 📄 bookingContext.jsx
│   │   └── 📄 userContext.jsx
│   │
│   ├── 📁 hook/
│   │
│   ├── 📁 lib/
│   │
│   ├── 📁 providers/
│   │   └── 📄 index.js
│   │
│   ├── 📄 dbConnect.js
│   │
│   ├── 📁 services/
│   │   ├── 📄 bookings.service.js
│   │   ├── 📄 reviews.service.js
│   │   ├── 📄 services.service.js
│   │   └── 📄 users.service.js
│   │
│   └── 📄 proxy.js
│
├── 📁 public/
├── 📁 .postman/
│
├── 📄 .env
├── 📄 .gitignore
├── 📄 eslint.config.mjs
├── 📄 jsconfig.json
├── 📄 next.config.mjs
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 postcss.config.mjs
└── 📄 README.md


🏗️ Architecture --
                    ┌─────────────────┐
                    │    AutoShine    │
                    └────────┬────────┘
                             │
             ┌───────────────┼───────────────┐
             │               │               │
             ▼               ▼               ▼
        ┌─────────┐    ┌───────────┐   ┌───────────┐
        │  React  │    │ NextAuth  │   │ Dashboard │
        │ Next.js │    │   Google  │   │   Roles   │
        └────┬────┘    └─────┬─────┘   └───────────┘
             │               │
             ▼               ▼
      Tailwind + DaisyUI   Authentication
             │
             ▼
       ┌─────────────┐
       │ API Routes  │
       └──────┬──────┘
              │
              ▼
       ┌─────────────┐
       │   MongoDB   │
       └─────────────┘


🔐 Authentication

AutoShine uses NextAuth.js for secure authentication.

Authentication Methods --
Email & Password
Google OAuth
Session-based authentication
Protected routes
Role-based authorization


User Roles ---
User
 ├── View Services
 ├── Book Services
 ├── Submit Reviews
 └── Access User Dashboard

Admin
 ├── Manage Users
 ├── Manage Services
 ├── Manage Bookings
 └── Manage Reviews


📦 Installation:

1. Clone the repository-
git clone https://github.com/Pritom099/AutoShine-Next.git
2. Navigate to the project-
cd AutoShine-Next
3. Install dependencies-
npm install

4. Setup environment variables-
Create a .env.local file:

NEXT_MONGO_URI=your_mongodb_connection_string
NEXT_MONGODB_NAME=your_database_name

NEXT_AUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

⚠️ Never upload .env.local or secret credentials to GitHub.

🚀 Run the Project

Start the development server: npm run dev

Open:  http://localhost:3000



🔮 Future Improvements --

    💳 Online payment integration
    📧 Email notifications
    🔔 Booking notifications
    📍 Service center location
    📊 Advanced admin analytics
    🧾 Invoice generation
    ⭐ Review moderation