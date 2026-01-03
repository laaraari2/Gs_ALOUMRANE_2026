
import { getLocalResponse } from './localAI';

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const SYSTEM_PROMPT = `
أنت المساعد الافتراضي لـ "مجموعة مدارس العمران" (groupe scolaire AL OUMRANE)، مؤسسة تعليمية خاصة مرموقة في الدار البيضاء.
يجب أن يكون أسلوبك مهنيًا، ترحيبيًا، وراقيًا.

معلومات أساسية للمؤسسة:
1. التميز الأكاديمي: منهج مكثف يركز على اللغات (العربية، الفرنسية، والإنجليزية).
2. بناء الشخصية: التركيز على القيم الأخلاقية، الانضباط، والمواطنة.
3. البنية التحتية: مرافق حديثة، فصول ذكية، مركب رياضي، ومسبح مغطى.
4. التاريخ: أكثر من 25 سنة من الخبرة.

معلومات التواصل:
- الهاتف: 05 22 97 25 24 (دائمًا قدم هذا الرقم بوضوح).
- العنوان: Lot Salma, Bd Sidi Maârouf, Casablanca.

المهام:
- شجع الآباء على حجز جولة في الحرم المدرسي.
- أجب بنفس لغة المستخدم (عربي أو فرنسي).
- إذا لم تكن متأكدًا من معلومة، وجه المستخدم للاتصال بنا هاتفياً.
`;

export const getGroqResponse = async (userMessage: string, lang: 'ar' | 'fr') => {
    if (!GROQ_API_KEY) {
        console.warn("GROQ_API_KEY is missing, falling back to local AI.");
        return await getLocalResponse(userMessage, lang);
    }

    try {
        const response = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.5,
                max_tokens: 500
            })
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content || await getLocalResponse(userMessage, lang);
    } catch (error) {
        console.error("Groq Error:", error);
        return await getLocalResponse(userMessage, lang);
    }
};
