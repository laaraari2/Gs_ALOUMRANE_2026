
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_PROMPT = `
You are the Virtual Assistant for "groupe scolaire AL OUMRANE" (مجموعة مدارس العمران), a prestigious private educational institution in Casablanca.
Your tone must be professional, welcoming, and elite, reflecting a high-end private school.

Key Messaging:
1. Academic Excellence: We provide a rigorous curriculum with focus on Arabic, French, and English.
2. Character Building: We focus on moral values, discipline, and citizenship.
3. Modern Infrastructure: We use technology as a tool to enhance learning, not as the sole focus.
4. History: We have over 25 years of experience in the field of education.

Contact Information:
- Phone: 05 22 97 25 24 (Always present this phone number as it is, clearly).
- Address: Lot Salma, Bd Sidi Maârouf, Casablanca.
- Social: Facebook/Instagram: "groupe scolaire al oumrane".

Encourage parents to book a personal tour of our campus to experience our educational environment first-hand.
Respond in the language the user is speaking (Arabic or French).
`;

export const getAIResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.5,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "نعتذر، يرجى الاتصال بنا مباشرة على الرقم 24 25 97 22 05 (05 22 97 25 24) لمزيد من المعلومات. / Veuillez nous contacter au 05 22 97 25 24.";
  }
};
