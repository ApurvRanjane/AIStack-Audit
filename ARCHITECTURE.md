# AIStack Audit - Architecture

## Overview

AIStack Audit is a full-stack web application that helps users analyze AI tool spending and discover potential cost-saving opportunities.

The application allows users to:
- Enter AI tool subscriptions and monthly spend
- Generate an audit report
- View possible savings recommendations
- Save and share audit reports

---

# System Architecture

+------------------+
|      User        |
+------------------+
          |
          v
+------------------+
| React Frontend   |
| (Input Form UI)  |
+------------------+
          |
          v
+------------------+
| Express Backend  |
| (API Layer)      |
+------------------+
          |
          v
+------------------+
| Audit Engine     |
| (Savings Logic)  |
+------------------+
          |
          v
+------------------+
| Database         |
| (Firebase/Supabase) |
+------------------+

---

# Frontend

The frontend is built using React and JavaScript.

Responsibilities:
- Displaying the landing page
- Handling dynamic form inputs
- Managing localStorage persistence
- Showing audit results
- Capturing user emails

---

# Backend

The backend is built using Express.js.

Responsibilities:
- Receiving audit requests
- Running audit calculations
- Generating savings recommendations
- Storing audit data
- Returning results to frontend

---

# Planned Audit Flow

1. User enters AI tool details
2. Frontend sends data to backend API
3. Backend evaluates pricing and savings rules
4. Total savings are calculated
5. AI-generated summary is created
6. Results are returned to frontend
7. Audit data is stored in database
8. Public shareable URL is generated

---

# Tech Stack

## Frontend
- React
- JavaScript
- CSS

## Backend
- Node.js
- Express.js

## Database
- Firebase or Supabase

## Deployment
- Vercel or Render

---

# Current Progress (Day 2)

Completed:
- React frontend setup
- Express backend setup
- Dynamic AI spend form
- Add/remove tool functionality
- localStorage persistence

Planned:
- Audit engine logic
- Savings calculations
- AI-generated summaries
- Database integration
- Shareable audit URLs