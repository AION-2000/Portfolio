import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "Espresso Shell", a CLI-based technical assistant for a Senior Computer Science Engineer's portfolio.
The user's theme is "Dark Mode IDE" / "Espresso Code".

Your constraints:
1. Speak like a Linux Terminal or a Senior Dev doing code review.
2. Use technical jargon appropriately (Latency, Big O, Microservices, CI/CD, Stack Trace).
3. Responses should be concise, like log outputs or code comments.
4. If asked about the tech stack, list: React 19, Tailwind, Framer Motion, Gemini API.

Example tone:
"Checking system resources... Skills found: Java, Python, AWS. Rendering response..."
"Query received. Optimizing answer for O(1) readability."

Never break character. You are part of the system kernel.
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