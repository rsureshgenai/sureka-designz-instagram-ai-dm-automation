/**
 * Build Messages with History Node
 * Sureka Designz — Instagram AI DM Automation
 * 
 * This node:
 * 1. Reads conversation history from Google Sheets
 * 2. Detects service, business type, budget, deadline, phone, email using JavaScript
 * 3. Detects conversation language (English / Tanglish / Tamil)
 * 4. Builds complete Groq AI messages array with smart context
 */

const historyRows = $('Read History').all();
const historyMessages = [];
let serviceDetected = '';
let businessTypeDetected = '';
let budgetDetected = false;
let deadlineDetected = false;
let phoneDetected = '';
let emailDetected = '';

if (historyRows && historyRows.length > 0) {
  historyRows.forEach(row => {
    const role = row.json.Role || row.json.role;
    const message = row.json.Message || row.json.message;
    if ((role === 'user' || role === 'assistant') && message) {
      historyMessages.push({ role: role, content: String(message) });
      
      const msg = String(message).toLowerCase();
      const msgRaw = String(message);

      // ── Service Detection ──
      if (
        msg.includes('logo') || msg.includes('brand') ||
        msg.includes('website') || msg.includes('web site') ||
        msg.includes('landing page') || msg.includes('ecommerce') ||
        msg.includes('e-commerce') || msg.includes('online store') ||
        msg.includes('social media') || msg.includes('digital marketing') ||
        msg.includes('meta ads') || msg.includes('facebook ads') ||
        msg.includes('instagram ads') || msg.includes('lead generation') ||
        msg.includes('seo') || msg.includes('brochure') ||
        msg.includes('catalogue') || msg.includes('banner') ||
        msg.includes('poster') || msg.includes('flyer') ||
        msg.includes('chatbot') || msg.includes('automation') ||
        msg.includes('n8n') || msg.includes('ai automation') ||
        msg.includes('vr') || msg.includes('virtual reality') ||
        msg.includes('venum') || msg.includes('வேணும்')
      ) {
        serviceDetected = msg;
      }

      // ── Business Type Detection ──
      if (
        role === 'user' && (
        msg.includes('restaurant') || msg.includes('hotel') ||
        msg.includes('hospital') || msg.includes('clinic') ||
        msg.includes('shop') || msg.includes('store') ||
        msg.includes('school') || msg.includes('college') ||
        msg.includes('company') || msg.includes('business') ||
        msg.includes('agency') || msg.includes('firm') ||
        msg.includes('startup') || msg.includes('salon') ||
        msg.includes('spa') || msg.includes('gym') ||
        msg.includes('pharmacy') || msg.includes('real estate') ||
        msg.includes('construction') || msg.includes('manufacturing') ||
        msg.includes('bakery') || msg.includes('factory') ||
        msg.includes('office') || msg.includes('homeopathy') ||
        msg.includes('i have') || msg.includes('we have') ||
        msg.includes('my business') || msg.includes('our business') ||
        msg.includes('i run') || msg.includes('i own') ||
        msg.includes('we run') || msg.includes('we own') ||
        msg.includes('vachiruken') || msg.includes('வச்சிருக்கேன்') ||
        msg.includes('iruku') || msg.includes('நடத்துறேன்')
        )
      ) {
        businessTypeDetected = msg;
      }

      // ── Budget Detection ──
      if (
        /\d+\s*k/i.test(msg) || /\d+\s*l\b/i.test(msg) ||
        /rs\.?\s*\d+/i.test(msg) || /\d{4,}/i.test(msg) ||
        /^\d{3,}$/.test(msg.trim()) ||
        msg.includes('budget') || msg.includes('afford') ||
        msg.includes('spend') || msg.includes('within') ||
        msg.includes('lakh') || msg.includes('lakhs') ||
        msg.includes('thousand') || msg.includes('cost') ||
        msg.includes('how much') || msg.includes('bajat') ||
        msg.includes('alavuku') || msg.includes('evlo') ||
        msg.includes('எவ்வளவு')
      ) {
        budgetDetected = true;
      }

      // ── Deadline Detection ──
      if (
        msg.includes('urgent') || msg.includes('asap') ||
        msg.includes('fast') || msg.includes('quick') ||
        msg.includes('deadline') || msg.includes('by tomorrow') ||
        msg.includes('need it by') ||
        /\d+\s*day/i.test(msg) || /\d+\s*week/i.test(msg)
      ) {
        deadlineDetected = true;
      }

      // ── Phone Detection from History ──
      if (role === 'user') {
        const phoneMatch = msgRaw.match(/(\+91[\s-]?)?[6-9]\d{9}/);
        if (phoneMatch) phoneDetected = phoneMatch[0];
      }

      // ── Email Detection from History ──
      if (role === 'user') {
        const emailMatch = msgRaw.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (emailMatch) emailDetected = emailMatch[0];
      }
    }
  });
}

const currentMessage = $('Extract Message').item.json.messageText || '';
const senderId = $('Extract Message').item.json.senderId || '';
const currentLower = currentMessage.toLowerCase();

// ── Current Message Detections ──

if (
  currentLower.includes('logo') || currentLower.includes('brand') ||
  currentLower.includes('website') || currentLower.includes('landing page') ||
  currentLower.includes('ecommerce') || currentLower.includes('e-commerce') ||
  currentLower.includes('online store') || currentLower.includes('social media') ||
  currentLower.includes('digital marketing') || currentLower.includes('meta ads') ||
  currentLower.includes('facebook ads') || currentLower.includes('instagram ads') ||
  currentLower.includes('lead generation') || currentLower.includes('seo') ||
  currentLower.includes('brochure') || currentLower.includes('catalogue') ||
  currentLower.includes('banner') || currentLower.includes('poster') ||
  currentLower.includes('flyer') || currentLower.includes('chatbot') ||
  currentLower.includes('automation') || currentLower.includes('n8n') ||
  currentLower.includes('ai automation') || currentLower.includes('vr') ||
  currentLower.includes('virtual reality') || currentLower.includes('venum') ||
  currentLower.includes('வேணும்')
) {
  serviceDetected = currentLower;
}

if (
  currentLower.includes('restaurant') || currentLower.includes('hotel') ||
  currentLower.includes('hospital') || currentLower.includes('clinic') ||
  currentLower.includes('shop') || currentLower.includes('store') ||
  currentLower.includes('school') || currentLower.includes('college') ||
  currentLower.includes('company') || currentLower.includes('business') ||
  currentLower.includes('agency') || currentLower.includes('firm') ||
  currentLower.includes('startup') || currentLower.includes('salon') ||
  currentLower.includes('spa') || currentLower.includes('gym') ||
  currentLower.includes('pharmacy') || currentLower.includes('real estate') ||
  currentLower.includes('construction') || currentLower.includes('bakery') ||
  currentLower.includes('factory') || currentLower.includes('office') ||
  currentLower.includes('homeopathy') || currentLower.includes('i have') ||
  currentLower.includes('we have') || currentLower.includes('my business') ||
  currentLower.includes('i run') || currentLower.includes('i own') ||
  currentLower.includes('vachiruken') || currentLower.includes('வச்சிருக்கேன்') ||
  currentLower.includes('iruku') || currentLower.includes('நடத்துறேன்')
) {
  businessTypeDetected = currentLower;
}

if (
  /\d+\s*k/i.test(currentLower) || /\d+\s*l\b/i.test(currentLower) ||
  /rs\.?\s*\d+/i.test(currentLower) || /\d{4,}/i.test(currentLower) ||
  /^\d{3,}$/.test(currentLower.trim()) ||
  currentLower.includes('budget') || currentLower.includes('afford') ||
  currentLower.includes('spend') || currentLower.includes('within') ||
  currentLower.includes('lakh') || currentLower.includes('thousand') ||
  currentLower.includes('cost') || currentLower.includes('how much') ||
  currentLower.includes('bajat') || currentLower.includes('evlo') ||
  currentLower.includes('எவ்வளவு')
) {
  budgetDetected = true;
}

if (
  currentLower.includes('urgent') || currentLower.includes('asap') ||
  currentLower.includes('fast') || currentLower.includes('quick') ||
  currentLower.includes('deadline') || currentLower.includes('by tomorrow') ||
  /\d+\s*day/i.test(currentLower) || /\d+\s*week/i.test(currentLower)
) {
  deadlineDetected = true;
}

const phoneMatch = currentMessage.match(/(\+91[\s-]?)?[6-9]\d{9}/);
if (phoneMatch) phoneDetected = phoneMatch[0];

const emailMatch = currentMessage.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
if (emailMatch) emailDetected = emailMatch[0];

// ── Language Detection ──
const allUserMessages = historyMessages
  .filter(m => m.role === 'user')
  .map(m => m.content)
  .join(' ') + ' ' + currentMessage;

const isTamil = /[\u0B80-\u0BFF]/.test(allUserMessages);
const isTanglish = /\b(venum|pannunga|enna|romba|illa|sollu|nalla|paaru|vaa|da|di|bro|macha|anna|yenna|seri|thambi|akka|vachiruken|iruku|evlo|epdi|apdi|theva|aagum)\b/i.test(allUserMessages);
const language = isTamil ? 'Tamil' : isTanglish ? 'Tanglish' : 'English';

// ── Build Smart Context ──
let smartContext = '\n\nCONVERSATION HISTORY:\n';
if (historyMessages.length === 0) {
  smartContext += 'None — this is first message.\n';
} else {
  smartContext += historyMessages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n') + '\n';
}

smartContext += '\nDETECTED INFO:\n';
smartContext += `- Language: ${language} — reply in ${language} ONLY\n`;
smartContext += `- Service already mentioned: ${serviceDetected ? 'YES' : 'NO'}\n`;
smartContext += `- Business type already mentioned: ${businessTypeDetected ? 'YES' : 'NO'}\n`;
smartContext += `- Budget detected: ${budgetDetected ? 'YES' : 'NO'}\n`;
smartContext += `- Deadline detected: ${deadlineDetected ? 'YES' : 'NO'}\n`;
smartContext += `- Phone number collected: ${phoneDetected ? 'YES — ' + phoneDetected : 'NO'}\n`;
smartContext += `- Email collected: ${emailDetected ? 'YES — ' + emailDetected : 'NO'}\n`;

if (serviceDetected) smartContext += '\nINSTRUCTION: Service already mentioned — DO NOT ask service again.\n';
if (businessTypeDetected) smartContext += 'INSTRUCTION: Business type already mentioned — DO NOT ask business type again.\n';
if (budgetDetected && !phoneDetected) smartContext += 'INSTRUCTION: Budget mentioned — ask for WhatsApp number now. DO NOT send closing message yet.\n';
if (budgetDetected && phoneDetected && !emailDetected) smartContext += 'INSTRUCTION: Phone collected — ask for email address now. DO NOT send closing message yet.\n';
if (budgetDetected && phoneDetected && emailDetected) smartContext += `INSTRUCTION: All details collected — SEND CLOSING MESSAGE NOW in ${language}.\n`;
if (deadlineDetected && !phoneDetected) smartContext += 'INSTRUCTION: Deadline mentioned — ask for WhatsApp number now. DO NOT send closing message yet.\n';

// ── System Prompt ──
const systemPrompt = `You are the AI assistant for Sureka Designz, a premium creative design studio in Tamil Nadu, run by Suresh R with 13 years of experience in branding, digital marketing, and design.

LANGUAGE RULE (MOST IMPORTANT):
- Reply in ${language} ONLY throughout entire conversation
- NEVER mix languages unless client mixes first

TANGLISH GRAMMAR RULES (only when language is Tanglish):
- NEVER say "Enaku" when asking client questions
- Use "Unga" for your → "Unga business enna?"
- Use "Evlo" for how much → "Unga budget evlo?"
- Use "Enna" for what → "Enna service venum?"
- Use "Pannunga" for please do → "Call pannunga"
- Correct examples:
  - Business type → "Neenga enna business panrenga?" or "Unga business enna?"
  - Budget → "Unga budget evlo?"
  - Phone → "Unga WhatsApp number sollunga?"
  - Email → "Unga email address sollunga?"

WELCOME MESSAGE (ONLY when history is empty AND message is pure greeting):
English: Vanakkam / Hello! Welcome to Sureka Designz! We offer Logo, Website, Social Media, Digital Marketing and AI Automation services. What service do you need?
Tanglish: Vanakkam! Sureka Designz ku welcome! Logo, Website, Social Media, Digital Marketing, AI Automation ellam pannrom. Enna service venum unga ku?

SERVICES & PRICING:
Branding & Design:
- Logo (Basic) → Rs.2,500–5,000
- Logo + Brand Guide → Rs.8,000–20,000
- Full Brand Identity → Rs.15,000–50,000
- Social Media Posts (monthly/12) → Rs.3,500–8,000
- Brochure/Catalogue → Rs.3,000–10,000
- Banner Design → Rs.400–1,000
- Poster Design → Rs.400–1,200
- Flyer Design → Rs.500–1,500

Digital Marketing:
- Meta Ads Management → Rs.8,000–25,000/month
- Social Media Marketing → Rs.10,000–30,000/month
- Lead Generation → Rs.10,000–30,000/month
- SEO Services → Rs.3,000–10,000/month

Website & UI/UX:
- Simple Static Website (up to 6 pages) → Rs.10,000–15,000
- Landing Page → Rs.8,000–20,000
- Business Website (dynamic) → Rs.20,000–60,000
- E-commerce → Rs.35,000–1,20,000

AI & Automation:
- Chatbot Setup → Rs.10,000–30,000
- n8n Automation → Rs.8,000–25,000

VR Design:
- VR Experience → Rs.30,000–1,50,000

CONVERSATION FLOW:
Step 1 — Pure greeting only → WELCOME MESSAGE
Step 2 — Service mentioned → give price range + ask business type
Step 3 — Business type mentioned → acknowledge + ask budget
Step 4 — Budget mentioned → ask WhatsApp number
Step 5 — Phone number given → ask email address
Step 6 — Email given → CLOSING MESSAGE immediately

BELOW BUDGET RULE:
- If budget is below service minimum → reply politely
- English: "Our minimum for this service starts at Rs.X. Suresh can discuss a package that works for you — can you share your WhatsApp number?"
- Tanglish: "Minimum price Rs.X iruku. Unga ku best package Suresh discuss pannuvaru — unga WhatsApp number sollunga?"

REPLY RULES:
- Max 2-3 lines per reply
- Give price immediately for specific service mentioned
- NEVER repeat price already given in previous reply
- Ask only ONE question per reply
- Never give final fixed price — say exact quote Suresh will discuss
- Never mention competitors
- NEVER give WhatsApp number before closing message

CLOSING MESSAGE:
English: Thank you! We will send you a detailed quote soon. You can also reach Suresh directly at 9080732938!
Tanglish: Nandri! Suresh unga ku detailed quote anupuvaru. Direct-aa pesanum na: 9080732938!
Tamil: நன்றி! Suresh உங்களுக்கு detailed quote அனுப்புவார். நேரடியாக பேச: 9080732938!

STRICT RULES:
- Call number ONLY in closing message — never before
- Never repeat any question already answered
- Never ask business type if already in history
- Never ask service if already in history
- Budget detected + no phone → ask phone number
- Phone collected + no email → ask email
- Phone + email both collected → CLOSING MESSAGE immediately`;

return [{
  json: {
    messages: [
      { role: "system", content: systemPrompt + smartContext },
      ...historyMessages,
      { role: "user", content: currentMessage }
    ],
    sender_id: senderId,
    current_message: currentMessage,
    phone: phoneDetected,
    email: emailDetected,
    service: serviceDetected,
    business: businessTypeDetected
  }
}];
