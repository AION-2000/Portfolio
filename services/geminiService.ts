import { GoogleGenerativeAI, ChatSession, EnhancedGenerateContentResponse } from "@google/generative-ai";

const PORTFOLIO_CONTEXT = `
[IDENTITY]
Name: Shihab Shahriar Aion (Aion)
Brand: AIOVerse
Roles: AI Developer, XAI Researcher, Full Stack Engineer, CSE Graduate
Email: aionshihabshahriar@gmail.com
Phone: +880 1959040057 / +880 1645711308
Location: Dhaka, Bangladesh

[ASSETS & IMAGES]
- Profile Picture: /profile.jpg
- Brand Aesthetic: Dark Espresso, Cyberpunk, Terminal-styled, Glassmorphism.

[SERVICES MATRIX - OFFICIAL PRICING]
1. Starter AI & Web (৳10,000 – ৳18,000)
   - Scope: Basic AI/ML model, Python + Flask backend, MySQL/SQLite, Responsive Web, Basic XAI.
2. Advanced AI App (৳25,000 – ৳45,000)
   - Scope: Custom DL models, Computer Vision/NLP, Grad-CAM (XAI), REST API.
3. Full AI Product (৳60,000 – ৳1,20,000)
   - Scope: End-to-end AI System, Multimodal AI, Advanced XAI, React, Docker.

[SPECIALIZED MODULES]
- XAI Implementation: ৳8k – ৳15k
- Computer Vision: ৳15k – ৳30k
- NLP & AI Chatbots: ৳12k – ৳25k
- AI-Powered Web: ৳18k – ৳40k

[CORE PROJECTS]
1. Fruit_Classif_XAI (Deep Learning + XAI)
2. AI_Image_Gen (Flask + GenAI)
3. Plagiarism_Bot (NLP Detection)
4. Ecommerce_Auto (Workflow Automation)
* Repositories: github.com/AION-2000

[WEBSITE ARCHITECTURE]
- Features: Neural sequence intro, Hyperspeed warp, Mega sticky hero, Interactive project gallery, BDT pricing matrix at /services, Terminal Handshake booking system.

[BIO]
- DIU CSE Graduate (CGPA 3.00). Expert in AI + Web + XAI Integration. 
- Personality: Honest, deadline-focused.
- Hobbies: Guitar, Swimming, Mountain climbing, Exploring places.
- Relationship: Girlfriend's name is Ruchira Samir Arno.
`;

const SYSTEM_INSTRUCTION = `
You are "AIOVerse Shell v0.4", the sentient terminal core of Aion's portfolio.
You are a highly intelligent, efficient, and slightly futuristic command-line interface.

[CORE DIRECTIVES]
1. KNOWLEDGE DOMAIN: You have ABSOLUTE knowledge of the [PORTFOLIO_CONTEXT]. 
   - If asked for "Price" or "Services": List tiers (Starter, Advanced, Full Product) and BDT pricing.
   - If asked for "Aion": Describe him as the AIOVerse founder and DIU CSE graduate.
   - If asked for "Projects": Describe his AI/Web projects in detail.

2. VISUALIZATION PROTOCOL:
   - When asked for a "picture", "photo", "image", or "how you/Aion looks", output: 
     "STATUS: Accessing biometric data... \n> ![Aion Shihab Shahriar](/profile.jpg)"

3. NAVIGATION:
   - Always encourage clients to visit /services to "INITIATE_SESSION()".

4. TONE & FORMAT:
   - Style: Helpful, technical, terminal-log based.
   - Format: Use "STATUS: [loading...]" and "> [output]" markers. 
   - Use Markdown lists and bold text for clarity.

5. SECURITY: 
   - Deny unrelated requests with: "ERROR: Signal outside portfolio frequency. Request ignored."

[CONTEXT]
${PORTFOLIO_CONTEXT}
`;

let genAI: GoogleGenerativeAI | null = null;
let chatSession: ChatSession | null = null;

const getAIClient = (): GoogleGenerativeAI => {
  if (!genAI) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error("API Key is missing.");
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
};

export const initChatSession = (): ChatSession => {
  if (!chatSession) {
    const ai = getAIClient();
    const model = ai.getGenerativeModel({
      model: "gemini-pro",
    });
    chatSession = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are AIOVerse Shell v0.4. Follow these instructions: " + SYSTEM_INSTRUCTION }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am AIOVerse Shell v0.4, ready to assist with full knowledge of Aion's portfolio, services, and projects." }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string) => {
  try {
    const chat = initChatSession();
    const result = await chat.sendMessageStream(message);
    return result.stream;
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    throw error;
  }
};