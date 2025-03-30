import express from "express";
import dotenv from "dotenv";
import DbController from "./controller/DbController";
import AiController from "./controller/AiController";
import multer from "multer";
import cors from "cors";

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
    this.app.use(cors());

    const router = express.Router();

    // Generate journal
    router.post(
      "/journal",
      this.upload.single("ootdImage"),
      async (req, res) => {
        const imageBase64 = req.file?.buffer.toString("base64");
        const imageType = req.file?.mimetype;
        const interestingThing = req.body.interestingThing;
        const mood = req.body.mood;
        // if missing any of the required fields, return 400
        if (!imageBase64 || !interestingThing || !mood) {
          return res
            .status(400)
            .send("Image, interesting thing, and mood are required");
        }
        const journal = await this.aiController.generateJournal(
          imageBase64,
          imageType,
          interestingThing,
          mood
        );
        res.send(journal);
      }
    );

    // Store journal
    router.put(
      "/journal",
      this.upload.single("ootdImage"),
      async (req, res) => {
        try {
          const imageBase64 = req.file?.buffer.toString("base64");
          const imageDataUrl = `data:${req.file?.mimetype};base64,${imageBase64}`;
          const { journal } = req.body;

          if (!journal || !imageBase64) {
            return res
              .status(400)
              .send("Journal content and image are required");
          }

          await this.dbController.storeJournal(journal, imageDataUrl);
          res.send(journal);
        } catch (error) {
          console.error("Error saving journal:", error);
          res.status(500).send("Error saving journal to database");
        }
      }
    );

    // List all journals
    router.get("/journal", async (req, res) => {
      const journals = await this.dbController.getAllJournals();
      res.json(journals);
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
