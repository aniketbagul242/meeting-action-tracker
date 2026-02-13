# Meeting Action Items Tracker

A simple web app to extract action items from meeting transcripts.  
Built with **React**, **Node.js (Express)**, **MongoDB**, and **OpenRouter AI API**.

---

## Features

- Paste meeting transcripts to extract **tasks, owners, and due dates**.
- **Add, edit, delete, and mark tasks as done**.
- Keep **history of last 5 transcripts**.
- Simple and clean **UI with filters and task status**.
- Responsive and professional layout.

---

## Demo

Live App Link - https://meeting-action-tracker-1.onrender.com

---

## Getting Started

### 1. Clone Repo
```bash
git clone https://github.com/aniketbagul242/meeting-action-tracker.git
cd meeting-action-tracker


npm install        # backend
cd client
npm install        # frontend


# env.example 
MONGO_URI=<your mongo uri>
OPENROUTER_API_KEY=<your api key>
PORT=3000


# backend
npm run server

# frontend (in /client)
npm run dev


