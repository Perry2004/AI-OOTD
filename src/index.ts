import express from "express";
import dotenv from "dotenv";
import DbController from "./controller/DbController";

class App {
  private dbController: DbController;
  private app: express.Application;
  private port: number;

  constructor() {
    dotenv.config();
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    this.dbController = new DbController(MONGODB_URI);
    this.app = express();
    this.port = parseInt(process.env.PORT || "3000", 10);
  }

  public async start() {
    await this.dbController.connectDB();

    this.app.use(express.static("frontend/dist"));
    this.app.use(express.json());

    const router = express.Router();
    router.post("/journal", (req, res) => {
      // [TODO]: generate journal
      res.send("Generating journal...");
    });

    router.put("/journal", (req, res) => {
      // [TODO]: save journal to db
      res.send("Saving to db...");
    });

    router.get("/journal", (req, res) => {
      // [TODO]: get all journals
      res.send("Getting all journals...");
    });

    router.post("/DEBUG", (req, res) => {
      const body = req.body;
      console.log(body);
      this.dbController.executeQuery(body).then((result) => {
        console.log(result);
        res.json(result);
      });
    });

    this.app.use("/", router);

    // Start the server
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const app = new App();
app.start();
