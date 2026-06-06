# Project Report — Sureka Designz Instagram AI DM Automation

**Version:** 4.0 | **Status:** Production Live | **Date:** June 2025

---

## Project Summary

Built a production-live Instagram AI DM Sales Agent for Sureka Designz using n8n + Groq AI + Google Sheets memory. The bot handles full lead qualification — from greeting to collecting phone and email — in English, Tamil, and Tanglish.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| n8n | Workflow automation (self-hosted on Hostinger VPS) |
| Groq AI — llama-3.1-8b-instant | AI language model |
| Google Sheets | Conversation memory (History tab) |
| Instagram Graph API v21.0 | DM trigger and reply |
| Gmail | Lead notification to owner |

---

## Conversation Flow (6 Steps)

1. Pure greeting → Welcome message
2. Service mentioned → Price range + ask business type
3. Business type given → Ask budget
4. Budget mentioned → Ask WhatsApp number
5. Phone given → Ask email
6. Email given → Closing message with owner contact

---

## Key Features

- **Multi-language:** English, Tamil, Tanglish auto detection
- **JS Detection:** Budget, phone, email detected via JavaScript regex
- **Smart Context:** History injected twice (messages array + system prompt text)
- **Below Budget:** Polite handling — collect phone instead of rejecting
- **Lead Notification:** Gmail with full lead details to owner inbox

---

## Issues Solved (14 total)

1. Build Messages node wrong return statement
2. Invalid JSON in Groq body
3. Groq model deprecated
4. Welcome message repeating every reply
5. Filter value undefined (senderId vs sender_id)
6. History save nodes deleted
7. AI ignoring conversation history
8. AI repeating business type question
9. Budget not detected in 20K format
10. Wrong Tanglish grammar (Enaku vs Unga)
11. English user getting Tanglish reply
12. Slow 10 second response time
13. Below budget leads being lost
14. No contact details collected before closing

---

## Model Configuration

```json
{
  "model": "llama-3.1-8b-instant",
  "max_tokens": 150,
  "temperature": 0.5
}
```

---

## Prompt Engineering Techniques

- Role definition with business context
- Priority instructions (budget detection first)
- Few-shot Tanglish grammar examples
- Negative constraints (NEVER repeat questions)
- Structured 6-step conversation flow
- Smart context injection every turn
- Dual history — messages array + system prompt text

---

## Performance

- Response time: 5–10 seconds
- Languages: English, Tamil, Tanglish
- Budget formats detected: 10+
- Uptime: 24/7

---

## Credits

- Trainer: Manoj Kanur — github.com/manojkanur
- Client: Sureka Designz — @surekadesignz
- Contact: 9080732938
