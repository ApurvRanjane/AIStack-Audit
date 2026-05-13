# AIStack Audit - Architecture

## Overview

AIStack Audit is a full-stack web application designed to help users analyze AI tool spending and identify potential cost-saving opportunities.

The platform acts as an AI subscription optimization tool where users can:
- Enter AI tools and subscription details
- Analyze monthly and yearly spending
- Receive optimization recommendations
- Generate AI-powered audit summaries
- Save and share audit reports

The goal of the project is to simulate a real SaaS-style AI cost optimization product with practical business and engineering considerations.

---

# System Architecture

+------------------+
|      User        |
+------------------+
          |
          v
+---------------------------+
| React Frontend            |
| - Dynamic Forms           |
| - Results Dashboard       |
| - localStorage Handling   |
+---------------------------+
          |
          v
+---------------------------+
| Express Backend API       |
| - Audit Requests          |
| - Savings Calculations    |
| - AI Summary Requests     |
+---------------------------+
          |
          v
+---------------------------+
| Audit Engine              |
| - Rule-Based Logic        |
| - Savings Detection       |
| - Recommendation System   |
+---------------------------+
          |
          v
+---------------------------+
| AI Integration            |
| - OpenAI / Anthropic API  |
| - Personalized Summaries  |
+---------------------------+
          |
          v
+---------------------------+
| Database                  |
| Firebase / Supabase       |
| - Audit Storage           |
| - Email Capture           |
| - Shareable Reports       |
+---------------------------+

---

# Frontend Architecture

The frontend is built using React and JavaScript.

Main responsibilities:
- Displaying the landing page
- Handling dynamic AI tool input forms
- Managing component state
- Persisting temporary data using localStorage
- Displaying audit recommendations
- Showing total savings
- Capturing user email addresses
- Rendering public audit result pages
- Dynamic public audit routing using React Router
- Fetching audit reports using route parameters
- Rendering public shareable audit pages

---

# Backend Architecture

The backend is built using Express.js and Node.js.

Responsibilities:
- Receiving audit form data from frontend
- Running pricing and optimization calculations
- Processing rule-based savings logic
- Calling AI APIs for summary generation
- Saving audit data into database
- Generating public audit IDs
- Returning structured audit responses

---

# Audit Engine Design

The audit engine uses deterministic rule-based logic instead of AI-generated calculations.

This approach was intentionally chosen because:
- Pricing calculations must remain predictable
- Recommendations should be explainable
- Hardcoded rules are easier to validate and test
- Business logic should remain transparent

Example audit rules:
- Detect overkill plans for small teams
- Detect duplicate AI subscriptions
- Identify unused seats
- Recommend cheaper alternatives
- Suggest API usage instead of subscriptions

---

# Planned Data Flow

## Step 1 — User Input
The user enters:
- AI tool name
- Subscription plan
- Monthly spend
- Number of seats
- Primary use case

---

## Step 2 — Frontend Validation
The frontend validates:
- Empty fields
- Numeric inputs
- Invalid seat counts

Data is temporarily persisted in localStorage.

---

## Step 3 — Backend Request
The frontend sends audit data to the Express backend using a POST request.

Example:
POST /audit

---

## Step 4 — Audit Processing
The backend audit engine:
- Evaluates spending rules
- Calculates savings opportunities
- Generates recommendations
- Computes monthly and yearly savings

---

## Step 5 — AI Summary Generation
The processed audit data is sent to an LLM API (OpenAI or Anthropic).

The AI generates:
- Personalized audit explanation
- Human-readable optimization summary
- Recommendations overview

---

## Step 6 — Database Storage
Audit data is stored in Firebase or Supabase.

Stored data includes:
- Audit ID
- User email
- Savings totals
- Tool recommendations
- AI-generated summary

Currently, audit reports are temporarily persisted using an in-memory Express storage layer during MVP development. Firebase or Supabase integration is planned for production persistence.
---

## Step 7 — Public Shareable URL

Each audit is assigned a UUID-based identifier which allows generation of unique public report URLs.

Example:
https://ai-stack-audit-zeta.vercel.app/audit/abc123

The frontend uses React Router dynamic routes to render saved audit reports publicly.

Example Route:
Route path="/audit/:id"

The backend exposes a GET API endpoint for retrieving saved audit reports by UUID.

Example:
GET /audit/:id

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

## AI Integration
- OpenAI API or Anthropic API

## Deployment
- Vercel
- Render

---

# Current Progress (Day 7)

## Completed
- React frontend setup
- Express backend setup
- Dynamic AI spend form
- Add/remove tool functionality
- localStorage persistence
- Rule-based audit engine
- Savings calculation logic
- Audit results display
- Monthly and yearly savings totals
- AI-generated summary system
- Improved results UI
- Empty audit state handling
- Email capture system
- Express backend save API
- UUID-based audit generation
- Shareable audit URL generation
- Frontend-backend integration
- React Router integration
- Dynamic audit result pages
- Backend audit fetch API
- Public shareable report rendering
- SEO metadata optimization
- Open Graph tag integration
- Improved SaaS-style UI design
- User interview research
- Final documentation system
- Deployment preparation

## In Progress
- Production database integration
- Real transactional email delivery
- Production monitoring and scaling improvements

## Planned
- Automated testing workflows
- CI/CD pipeline setup
- AI usage analytics dashboard
- Stripe billing integration
- Multi-user collaboration features

---

# Future Improvements

Potential future improvements include:
- Benchmark comparisons against industry averages
- Team usage analytics
- PDF export support
- Stripe billing integration
- Multi-user dashboards
- AI usage trend analysis
- Advanced recommendation scoring

---

# Final MVP Summary

AIStack Audit was designed as a fast-moving MVP focused on entrepreneurial execution rather than enterprise-scale infrastructure.

The project prioritizes:
- Rapid product iteration
- User validation
- Shareable SaaS workflows
- Lead-generation mechanics
- Clear and explainable audit logic

The architecture intentionally separates frontend, backend, and audit logic layers to support future scalability and production migration.