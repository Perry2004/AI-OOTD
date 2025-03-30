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

  public async generateJournal(imageBase64, imageType, interestingThing, mood) {
    const promptTemplate = `
    Today I have done: ${interestingThing}. 
    Today I feel ${mood}. Here's my OOTD. 
    Generate a 50-70 words daily journal as a return. 
    Act like myself writing it. No introduction needed.
    Use lots of emojis and ascii art.
    Use the image as a reference.
    Be as creative as you can. 
    `;

    const parts = [
      { text: promptTemplate },
      {
        inlineData: {
          mimeType: imageType,
          data: imageBase64,
        },
      },
    ];

    const result = await this.model.generateContent(parts);
    return result.response.text();
  }
}
