import express from "express";
import router from "./Router";
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
    this.app.use("/", router);

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const app = new App();
app.start();
