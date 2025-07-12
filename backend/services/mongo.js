import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// Ensure this value is loaded from .env in server.js only
const MONGODB_URL = process.env.MONGO_URL;

async function mongoConnect() {
  await mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("mongoDB is connected");
    })
    .catch((error) => {
      console.log(error);
    });
}

export default mongoConnect;
