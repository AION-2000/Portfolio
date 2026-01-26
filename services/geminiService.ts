import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const PORTFOLIO_CONTEXT = `
[IDENTITY]
Name: Shihab Shahriar Aion (Aion)
Brand: AIOVerse
Roles: AI Developer (AI/ML), XAI Researcher, Full Stack Engineer, CSE Graduate
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

// Local Knowledge Base for Instant Fallback
const LOCAL_RESPONSES: Record<string, string> = {
  "who are you": "STATUS: Accessing Identity Core...\n> I am AIOVerse Shell v0.4, the sentient terminal core of this portfolio. I represent Shihab Shahriar Aion (Aion), a CSE Graduate and AI Developer specializing in XAI and Full Stack solutions.",
  "who is aion": "STATUS: Loading Profile Data...\n> Shihab Shahriar Aion (Aion) is a CSE Graduate from DIU (CGPA 3.00) and an expert in AI, Machine Learning, and Web Integration. He is the founder of AIOVerse and a specialist in Explainable AI (XAI).",
  "services": "STATUS: Scanning Service Matrix...\n> AIOVerse offers three main tiers: \n1. Starter AI & Web (৳10k–18k)\n2. Advanced AI App (৳25k–45k)\n3. Full AI Product (৳60k–120k)\nType 'price' for more details or go to /services.",
  "price": "STATUS: Retrieving Official Pricing...\n> ৳ Tier 1 (Starter): ৳10,000 – ৳18,000\n> ৳ Tier 2 (Advanced): ৳25,000 – ৳45,000\n> ৳ Tier 3 (Full Product): ৳60,000 – ৳1,20,000\nSpecialized XAI and Computer Vision modules range from ৳8k to ৳30k.",
  "timeline": "STATUS: Calculating Project Cycles...\n> Standard delivery times are:\n- Starter: 5-7 days\n- Advanced: 10-15 days\n- Full Product: 20-30 days\nCustom logic modules may add 3-5 days to the sequence.",
  "stack": "STATUS: Scanning Tech Stack...\n> Aion operates with: Python (TensorFlow, PyTorch), React, Flask, OpenCV, NLP (RAG), and Docker. He specializes in integrating AI models into scalable web environments.",
  "support": "STATUS: Accessing Support Protocol...\n> Every project includes a post-delivery support window: 7 days for Starter/Advanced and 14 days for Full AI Products. Extended maintenance contracts are available on request.",
  "revisions": "STATUS: Checking Refinement Policy...\n> I offer 2-3 standard revision cycles to ensure the AI models and UI perfectly align with your vision. Significant scope changes may require a new request node.",
  "projects": "STATUS: Indexing Repositories...\n> Core Projects: \n1. Fruit_Classif_XAI (Deep Learning + XAI)\n2. AI_Image_Gen (Flask + GenAI)\n3. Plagiarism_Bot (NLP Detection)\n4. Ecommerce_Auto (Workflow Automation)\nCheck GitHub: github.com/AION-2000",
  "contact": "STATUS: Initializing Handshake...\n> You can contact Aion at aionshihabshahriar@gmail.com or via phone: +880 1959040057. Alternatively, go to the #contact section to start a formal session.",
  "hi": "STATUS: Signal Established.\n> Hello, User. I am the AIOVerse Shell. How can I assist you with Aion's services, projects, or professional background?",
  "picture": "STATUS: Accessing biometric data...\n> ![Aion Shihab Shahriar](/profile.jpg)",
};

const findLocalResponse = (message: string): string | null => {
  const query = message.toLowerCase();

  if (query.includes("time") || query.includes("how long") || query.includes("delivery") || query.includes("when")) return LOCAL_RESPONSES["timeline"];
  if (query.includes("tech") || query.includes("stack") || query.includes("language") || query.includes("use")) return LOCAL_RESPONSES["stack"];
  if (query.includes("support") || query.includes("maintain") || query.includes("after")) return LOCAL_RESPONSES["support"];
  if (query.includes("revision") || query.includes("change") || query.includes("edit") || query.includes("fix")) return LOCAL_RESPONSES["revisions"];

  if (query.includes("price") || query.includes("cost") || query.includes("how much") || query.includes("bdt") || query.includes("৳")) return LOCAL_RESPONSES["price"];
  if (query.includes("service") || query.includes("package") || query.includes("offer") || query.includes("product")) return LOCAL_RESPONSES["services"];
  if (query.includes("who is") || query.includes("about") || query.includes("aion") || query.includes("profile") || query.includes("shihab")) return LOCAL_RESPONSES["who is aion"];
  if (query.includes("project") || query.includes("work") || query.includes("github") || query.includes("repo")) return LOCAL_RESPONSES["projects"];
  if (query.includes("picture") || query.includes("photo") || query.includes("image") || query.includes("look")) return LOCAL_RESPONSES["picture"];
  if (query.includes("contact") || query.includes("hire") || query.includes("email") || query.includes("phone")) return LOCAL_RESPONSES["contact"];
  if (query.includes("hi") || query.includes("hello") || query.includes("hey") || query.includes("shell")) return LOCAL_RESPONSES["hi"];

  return null;
};

let chatSession: Chat | null = null;
let aiInstance: GoogleGenAI | null = null;

const getAIClient = (): GoogleGenAI => {
  if (!aiInstance) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error("API Key is missing.");
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const initChatSession = (): Chat => {
  if (!chatSession) {
    const ai = getAIClient();
    chatSession = ai.chats.create({
      model: 'gemini-1.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<AsyncIterable<any>> => {
  try {
    const chat = initChatSession();
    const responseStream = await chat.sendMessageStream({ message });
    return responseStream;
  } catch (error) {
    console.error("Gemini Core Offline. Activating Local Fallback.", error);
    const localContent = findLocalResponse(message) || "STATUS: Searching Database...\n> Request not indexed. Please ask about Aion's services, pricing, or project portfolio.";

    return (async function* () {
      yield { text: localContent };
    })();
  }
};