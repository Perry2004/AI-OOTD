import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const geminiApiKey:string = "";


const genAI = new GoogleGenerativeAI(geminiApiKey);


// Reusable gemini AI
export async function generateAIContent(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    return await result.response.text();
}
