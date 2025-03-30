import dotenv from "dotenv";
import { Collection, MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env file");
}

class DbController {
  private client: MongoClient;
  private collection: Collection;

  constructor(mongodbUri: string) {
    this.client = new MongoClient(mongodbUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    this.collection = this.client.db("ai-journals").collection("journals");
  }

  async connectDB() {
    await this.client.connect();
    // Send a ping to confirm a successful connection
    await this.client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to MongoDB server");
  }

  async storeJournal(journal: string, imageDataUrl: string) {
    try {
      const result = await this.collection.insertOne({
        journal: journal,
        imageDataUrl: imageDataUrl,
        time: new Date(),
      });
      console.log("Journal stored with id:", result.insertedId);
    } catch (error) {
      console.error("Error storing journal:", error);
      throw error;
    }
  }

  async getAllJournals() {
    try {
      const journals = await this.collection.find({}).toArray();
      return journals;
    } catch (error) {
      console.error("Error fetching journals:", error);
      throw error;
    }
  }

  async debugExecute(callback: (collection: any) => Promise<any>) {
    const collection = this.client.db("sample_mflix").collection("users");
    try {
      const result = await callback(collection);
      return result;
    } catch (error) {
      console.error("Error executing debug command:", error);
      throw error;
    }
  }
}

async function close() {
  await this.client.close();
  console.log("Connection to MongoDB closed");
}

export default DbController;
