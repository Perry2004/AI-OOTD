import express from "express";
import dotenv from "dotenv";
import DbController from "./controller/DbController";
import AiController from "./controller/AiController";
import multer from "multer";

class App {
  private dbController: DbController;
  private aiController: AiController;
  private app: express.Application;
  private port: number;
  private upload;

  constructor() {
    dotenv.config();
    const MONGODB_URI = process.env.MONGODB_URI;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!MONGODB_URI || !GEMINI_API_KEY) {
      throw new Error("MISSING ENV VARIABLES: MONGODB_URI or GEMINI_API_KEY");
    }

    this.dbController = new DbController(MONGODB_URI);
    this.aiController = new AiController(GEMINI_API_KEY);
    this.app = express();
    this.port = parseInt(process.env.PORT || "3000", 10);
    this.upload = multer({ storage: multer.memoryStorage() });
  }

  public async start() {
    await this.dbController.connectDB();

    this.app.use(express.static("frontend/dist"));
    this.app.use(express.json());

    const router = express.Router();
    router.post(
      "/journal",
      this.upload.single("ootdImage"),
      async (req, res) => {
        const imageBase64 = req.file?.buffer.toString("base64");
        const imageDataUrl = `data:${req.file?.mimetype};base64,${imageBase64}`;
        const imageType = req.file?.mimetype;
        const interestingThing = req.body.interestingThing;
        const mood = req.body.mood;
        const journal = await this.aiController.generateJournal(
          imageBase64,
          imageType,
          interestingThing,
          mood
        );
        // [TODO] store to db

        res.send(journal);
      }
    );

    router.put("/journal", (req, res) => {
      // [TODO]: save journal to db
      res.send("Saving to db...");
    });

    router.get("/journal", (req, res) => {
      // [TODO]: get all journals
      res.send("Getting all journals...");
    });

    router.post("/DEBUG/db", async (req, res) => {
      const body = req.body;
      const result = await this.dbController.debugExecute((collection) => {
        // return collection.find(body).toArray();
        return collection.insertOne(body);
      });
      console.log(`Response from DB: ${JSON.stringify(result)}`);
      res.json(result);
    });

    router.post("/DEBUG/ai", async (req, res) => {
      const body = req.body;
      console.log(`Request to AI: ${JSON.stringify(body)}`);
      const result = await this.aiController.generateContent(body);
      console.log(`Response from AI: ${result}`);
      res.json(result);
    });

    this.app.use("/", router);

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const app = new App();
app.start();
