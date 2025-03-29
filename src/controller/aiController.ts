import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";


const geminiApiKey = process.env.GEMINI_API;
const genAI = new GoogleGenerativeAI(geminiApiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export async function runGemini(prompt) {
    const chatSession = model.startChat({
        generationConfig,
// safetySettings: Adjust safety settings
// See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
        ],
    });

    if (typeof prompt !== "string") {
        throw new Error("Invalid prompt: Expected a string");
    }

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
};