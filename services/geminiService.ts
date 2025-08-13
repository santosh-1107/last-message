
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API functionality will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateDeliveryEmail = async (
    senderName: string,
    messageContent: string
): Promise<string> => {
    if (!API_KEY) {
        return Promise.resolve(`
## Simulated Email (API Key not configured) ##

**Subject: A Message from ${senderName}**

Hello,

This is a message from Ethereal Echoes, a digital vault service. ${senderName} entrusted us to deliver a message to you.

---
**Message from ${senderName}:**

${messageContent}
---

With warm regards,
The Ethereal Echoes Team
        `);
    }

    const prompt = `
You are a compassionate assistant for "Ethereal Echoes," a service that delivers final messages. 
Your task is to craft a gentle and respectful email to a recipient. 
The email should:
1. Briefly and gently introduce the service and its purpose.
2. Clearly state the message is from ${senderName}.
3. Present the original message from the sender, clearly delineated.
4. Conclude with a warm, empathetic closing.

The tone must be calm, respectful, and clear, avoiding overly sentimental or corporate language.

Here is the original message to include:
"${messageContent}"
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.5,
                topP: 0.95,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating delivery email with Gemini:", error);
        return "We're sorry, but there was an error preparing the message preview. Please try again later.";
    }
};
