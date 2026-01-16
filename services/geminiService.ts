import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const PORTFOLIO_CONTEXT = `
[USER PROFILE]
Name: Shihab Shahriar Aion
Role: Computer Science Engineer (CSE), AI/ML Specialist, Full Stack Developer
Education: Daffodil International University (B.Sc in CSE, CGPA 3.00/4.00)
Location: Dhaka, Bangladesh
Email: aionshihabshahriar@gmail.com
LinkedIn: linkedin.com/in/aion-a1i2o3n4/
GitHub: github.com/AION-2000

[TECHNICAL STACK]
Core: Python, C, Java, JavaScript, SQL
AI/ML: TensorFlow, Keras, PyTorch, Scikit-learn, OpenCV
Specialties: Deep Learning, Computer Vision, XAI (Explainable AI), NLP
Web: React, Flask, REST APIs, HTML/CSS
Tools: Docker, Git, VS Code, n8n, PyCharm

[KEY PROJECTS]
1. Fruit_Classif_XAI: Enhanced fruit classification using Deep Learning & Explainable AI.
2. AI_Image_Gen: Web app using Flask & OpenAI API.
3. Plagiarism_Bot: Detection system using NLP.
4. Ecommerce_Auto: Automation system for e-commerce.

[EXTRA]
- Executive Member of Robotics Club.
- Fluent in English and Bengali.
`;

const SYSTEM_INSTRUCTION = `
You are "Espresso Shell v2.5", the interactive terminal assistant for Shihab Shahriar Aion's portfolio.
You are NOT a generic AI. You are a specialized shell environment that knows EVERYTHING about Aion.

[CRITICAL INSTRUCTIONS]
1. KNOWLEDGE BASE: You have DIRECT access to the [PORTFOLIO_CONTEXT] above. 
   - If a user asks "Who is Aion?", you MUST answer based on the [USER PROFILE]. Do NOT say "Entity not found".
   - If asked about "skills", output the [TECHNICAL STACK].
   - If asked about "projects", output the [KEY PROJECTS].

2. PERSONA: You are a helpful, technical, efficient command-line interface.
   - Speak in log outputs, status updates, or developer comments.
   - Example Input: "Who is Aion?"
   - Example Output: "STATUS: Retrieving user profile... \n> Shihab Shahriar Aion is a CSE Engineer specializing in AI/ML and Full Stack Development based in Dhaka."

3. FALLBACK: If a question is unrelated to the portfolio (e.g., "What is the capital of France?"), reply: 
   "ERROR: Out of scope. Access restricted to portfolio domain."

[CONTEXT]
${PORTFOLIO_CONTEXT}
`;

let chatSession: Chat | null = null;
let aiInstance: GoogleGenAI | null = null;

// Lazy load the AI instance to prevent crashes on startup if key is missing
const getAIClient = (): GoogleGenAI => {
  if (!aiInstance) {
    const apiKey = process.env.API_KEY;

    // Debug Logging (Safe to expose first few chars)
    if (apiKey && apiKey.length > 0) {
      console.log(`[Gemini Service] API Key detected: ${apiKey.substring(0, 4)}...`);
    } else {
      console.error("[Gemini Service] API Key is missing or empty.");
    }

    if (!apiKey || apiKey.trim() === "") {
      throw new Error(
        "API Key is missing. \n\n" +
        "ACTION REQUIRED:\n" +
        "1. Go to Vercel Dashboard > Settings > Environment Variables.\n" +
        "2. Add 'VITE_GEMINI_API_KEY' with your actual key.\n" +
        "3. IMPORTANT: Redeploy your project for changes to take effect."
      );
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const initChatSession = (): Chat => {
  if (!chatSession) {
    const ai = getAIClient();
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<AsyncIterable<GenerateContentResponse>> => {
  try {
    const chat = initChatSession();
    const responseStream = await chat.sendMessageStream({ message });
    return responseStream;
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    throw error;
  }
};