import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey: string = "";

const genAI = new GoogleGenerativeAI(geminiApiKey);

export default class AiController {
  private model: GenerativeModel;
  constructor(apiKey: string) {
    this.model = new GoogleGenerativeAI(apiKey).getGenerativeModel({
      model: "gemini-2.0-flash",
    });
  }

  public async generateContent(promptObj) {
    const result = await this.model.generateContent(promptObj["prompt"]);
    return result.response.text();
  }
}
