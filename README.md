# 🤖 Sureka Designz — Instagram AI DM Sales Agent

> **Part of Gen AI 5 Projects Series — Project 3: AI Agents (n8n)**
> Built by Sureka Designz, Tamil Nadu | Trainer: Manoj Kanur

![Status](https://img.shields.io/badge/Status-Production%20Live-brightgreen)
![n8n](https://img.shields.io/badge/Built%20with-n8n-orange)
![Groq](https://img.shields.io/badge/AI-Groq%20llama--3.1--8b--instant-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📌 What This Project Does

An AI-powered Instagram DM automation that:

- ✅ Replies to Instagram DMs **24/7 automatically**
- ✅ Remembers **full conversation history** per customer (Google Sheets memory)
- ✅ Auto detects **English, Tamil, and Tanglish** language
- ✅ Follows **6-step lead qualification flow**
- ✅ Collects **phone number and email** before closing
- ✅ Handles **below-budget clients** without rejecting them
- ✅ Sends **complete lead details** to owner via Gmail notification

---

## 🏗️ Architecture

```
Instagram DM
     ↓
n8n Webhook (POST)
     ↓
Extract Message (senderId, messageText)
     ↓
Read History (Google Sheets — filter by SenderId)
     ↓
Build Messages with History (JS detection + Groq messages array)
     ↓
Groq AI Reply (llama-3.1-8b-instant)
     ↓
Parse AI Reply
     ↓
Save User Message + Save AI Reply (Google Sheets)
     ↓
Send Instagram Reply (Graph API)
     ↓
Send Gmail Notification (lead details to owner)
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| **n8n** | Workflow automation (self-hosted) |
| **Groq AI** | LLM — llama-3.1-8b-instant |
| **Google Sheets** | Conversation memory (History tab) |
| **Instagram Graph API** | DM receiving and sending |
| **Gmail** | Lead notification to owner |
| **Hostinger VPS** | 24/7 n8n hosting |

---

## 💬 Conversation Flow

```
Step 1 → Pure greeting       → Welcome message with all services
Step 2 → Service mentioned   → Give price range + ask business type
Step 3 → Business type given → Acknowledge + ask budget
Step 4 → Budget mentioned    → Ask WhatsApp number
Step 5 → Phone given         → Ask email address
Step 6 → Email given         → Send closing message with owner contact
```

---

## 🌐 Language Support

| Language | Detection Method |
|----------|-----------------|
| English | No Tamil words detected |
| Tanglish | Tamil words: venum, pannunga, evlo, iruku |
| Tamil | Tamil Unicode range U+0B80–U+0BFF |

---

## 💰 Services & Pricing Configured

### Branding & Design
- Logo (Basic) → Rs.2,500–5,000
- Logo + Brand Guide → Rs.8,000–20,000
- Full Brand Identity → Rs.15,000–50,000
- Social Media Posts (monthly/12) → Rs.3,500–8,000
- Brochure/Catalogue → Rs.3,000–10,000
- Banner Design → Rs.400–1,000
- Poster Design → Rs.400–1,200
- Flyer Design → Rs.500–1,500

### Digital Marketing
- Meta Ads Management → Rs.8,000–25,000/month
- Social Media Marketing → Rs.10,000–30,000/month
- Lead Generation → Rs.10,000–30,000/month
- SEO Services → Rs.3,000–10,000/month

### Website & UI/UX
- Simple Static Website → Rs.10,000–15,000
- Landing Page → Rs.8,000–20,000
- Business Website (dynamic) → Rs.20,000–60,000
- E-commerce → Rs.35,000–1,20,000

### AI & Automation
- Chatbot Setup → Rs.10,000–30,000
- n8n Automation → Rs.8,000–25,000

### VR Design
- VR Experience → Rs.30,000–1,50,000

---

## 📁 Repository Structure

```
├── README.md                  # This file
├── workflow.json              # Complete n8n workflow (import this)
├── build_messages.js          # Build Messages with History node code
├── system_prompt.txt          # Full AI system prompt
├── REPORT.md                  # Complete project report
└── .env.example               # Environment variables template
```

---

## 🚀 Setup Guide

### Prerequisites
- n8n instance (self-hosted or cloud)
- Groq API key (free at console.groq.com)
- Google Sheets API credentials
- Meta Developer App with Instagram permissions
- Gmail account

### Step 1 — Import Workflow
1. Open n8n
2. Click **+** → **Import from file**
3. Select `workflow.json`

### Step 2 — Add Credentials
Add these credentials in n8n:
- Google Sheets account
- Groq API key (Header Auth: `Authorization: Bearer YOUR_KEY`)
- Gmail account
- Instagram Graph API token

### Step 3 — Setup Google Sheets
Create a sheet with these columns in **History** tab:

| SenderId | Role | Message | Timestamp |

### Step 4 — Configure Instagram Webhook
Set webhook URL in Meta Developer Console:
```
https://YOUR-N8N-DOMAIN/webhook/instagram-webhook
```

### Step 5 — Activate Workflow
Toggle workflow to **Active** in n8n

---

## ⚙️ Groq API Configuration

```json
{
  "model": "llama-3.1-8b-instant",
  "messages": "{{ JSON.stringify($json.messages) }}",
  "max_tokens": 150,
  "temperature": 0.5
}
```

---

## 📧 Gmail Lead Notification Format

```
Subject: New Lead — Sureka Designz

Instagram ID: [sender_id]
Service:      [detected service]
Business:     [detected business type]
Phone:        [collected phone number]
Email:        [collected email address]
Time:         [timestamp]
```

---

## 🧠 Prompt Engineering Approach

This project uses **Prompt Engineering + JavaScript detection** instead of Fine Tuning:

| Technique | Applied |
|-----------|---------|
| Role Definition | Business context and personality |
| Priority Instructions | Budget detection first |
| Few-Shot Examples | Correct Tanglish grammar |
| Negative Constraints | Never repeat questions |
| Structured Flow | 6 step conversation path |
| Context Injection | smartContext summary every turn |
| Dual History | Messages array + system prompt text |

---

## 🐛 Key Issues Solved

| Issue | Solution |
|-------|---------|
| Bot repeating welcome message | Added SenderId filter to Read History |
| AI ignoring history | Injected historyContext in system prompt |
| Wrong Tanglish grammar | Added grammar rules with examples |
| Budget not detected (20K) | Added regex `/\d+\s*k/i` |
| Language mixing | Added JS Unicode range detection |
| No contact details on close | Added phone + email collection steps |

---

## 📊 Performance

- **Response Time:** 5–10 seconds
- **Uptime:** 24/7
- **Languages:** English, Tamil, Tanglish
- **Budget Formats Detected:** 10+
- **Lead Collection:** Phone + Email

---

## 🙏 Credits

- **Trainer:** Manoj Kanur — [GitHub](https://github.com/manojkanur/Gen_AI_Complete_Templates)
- **Client:** Sureka Designz — [@surekadesignz](https://instagram.com/surekadesignz)
- **Built with:** n8n, Groq AI, Google Sheets

---

## 📄 License

MIT License — free to use and modify for your own business!

---

> ⭐ If this helped you, please star this repository!
