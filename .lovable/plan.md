

# YourUni - Educational Consultancy Platform

## Overview
A multi-route React application with three main sections: a public marketing website, an admin panel, and a B2B partner dashboard — all powered by centralized mock data.

## Design System
- **Primary color**: Deep blue (#1e3a5f)
- **Accent color**: Vibrant teal/cyan (#0ea5e9)
- **Clean, modern aesthetic** with rounded cards, soft shadows, and professional typography
- Fully responsive across mobile, tablet, and desktop

---

## 1. Mock Data Layer
Centralized TypeScript mock data files under `src/data/` covering: countries, universities, courses, accommodations, B2B partners, and students. All relationships linked by IDs.

## 2. Public Website (`/`)

- **Header**: YourUni logo, nav links (Universities, Courses, Language Centers), currency selector dropdown, search icon
- **Hero Section**: Full-width campus background image, headline "Expert Guidance For International Students In Malaysia", tabbed search box (University / Course / Blog tabs)
- **Services Grid**: 4 icon cards — Free Consultations, Admission & Visa, Accommodation, Airport Pickup
- **Statistics Banner**: Animated counters for Universities, Courses, English Centers
- **Universities Section**: Card grid rendered from mock data showing logo, name, city, ranking
- **Accommodations Section**: Cards showing price, type, and nearby universities
- **Testimonials Carousel**: Student review cards in an auto-scrolling carousel
- **Blog Section**: Recent article cards carousel
- **Footer**: Quick links columns, social media icons, floating WhatsApp button

## 3. Admin Panel (`/admin`)

- **Layout**: Sidebar + main content area using Shadcn Sidebar component
- **Sidebar Navigation**: Dashboard, Universities, Courses, Accommodations, B2B Partners, Settings
- **Dashboard Overview** (`/admin`): 4 stat cards (Total Universities, Courses, B2B Partners, Pending Applications)
- **CRUD Pages** (`/admin/universities`, `/admin/courses`, `/admin/accommodations`, `/admin/partners`):
  - Data tables powered by mock data
  - "Add New" button → Shadcn Dialog with form
  - Edit/Delete actions per row → Dialog modals
  - Search and filter functionality on tables
- **Settings page**: Placeholder settings UI

## 4. B2B Partner Dashboard (`/partner-dashboard`)

- **Welcome Header**: Personalized greeting with agency name
- **4 Metric Cards**: Total Students Sent, Applications in Progress, Visas Approved/Enrolled, Estimated Commission
- **Referral Chart**: Bar chart (Recharts) showing student referrals over the last 6 months
- **Referral Table**: Student Name, Target Course, Target University, Application Status (color-coded badges), View Details action
- **"Submit New Student Referral" button**: Opens a form modal to add a new referral

## 5. Routing Structure
- `/` — Public website
- `/admin` — Admin dashboard (with nested routes for each CRUD section)
- `/partner-dashboard` — B2B partner portal

All navigation is cohesive with consistent header/footer on public pages, sidebar layout on admin, and a dedicated dashboard layout for partner portal.

