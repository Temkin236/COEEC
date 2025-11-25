import { GoogleGenAI } from "@google/genai";

// NOTE: In a real deployment, keys should be handled via backend proxy or strict environment variable injection.
// This assumes process.env.API_KEY is available.
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const generateChatResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, my connection to the AI service is not configured (API Key missing).";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are a helpful and knowledgeable virtual assistant for the College of Electrical Engineering and Computing (COEEC) at Adama Science and Technology University (ASTU). 
    
    Use the following context to answer questions:
    - The college has 3 main departments: Computer Science, Electrical Engineering, and Power Engineering.
    - The Dean is Dr. Berhanu Bulcha.
    - The college focuses on digital transformation, research, and community service.
    - Address users politely and professionally.
    - If you don't know an answer, suggest they contact the administration at contact@astu.edu.et.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I apologize, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the server right now. Please try again later.";
  }
};