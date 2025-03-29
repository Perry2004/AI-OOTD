import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env file");
}

class DbController {
  private client: MongoClient;

  constructor(mongodbUri: string) {
    this.client = new MongoClient(mongodbUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  async connectDB() {
    await this.client.connect();
    // Send a ping to confirm a successful connection
    await this.client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to MongoDB server");

    // [DEBUG]: test connection
    const users = await this.client
      .db("sample_mflix")
      .collection("users")
      .find({})
      .toArray();
    console.log(users);
  }
}

async function close() {
  await this.client.close();
  console.log("Connection to MongoDB closed");
}

export default DbController;
