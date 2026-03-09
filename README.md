# LastManStanding

A modern web app for creating and joining **last-man-standing** style prediction pools (e.g. sports leagues, survivor challenges).  
Built with **React + Vite + Supabase** (auth, realtime DB, PostgreSQL).

## Features (Current)

- Email + Google OAuth login
- Create public or private pools
- Auto-generated 8-char join codes (via DB trigger)
- Dashboard showing your pools
- Pool detail view with members list, join code, visibility, ruleset
- Consistent dark-themed UI with reusable header
- Protected routes (redirect to login if not authenticated)

## Tech Stack

- **Frontend**: React 18, React Router v6, Vite
- **Backend & Auth**: Supabase (Auth, Database, Row Level Security)
- **Styling**: CSS variables + custom classes (no Tailwind/UI libs yet)
- **Deployment-ready**: Environment variables for Supabase URL & anon key


