import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

const serverPort = process.env.PORT;

app.listen(serverPort, () => {
  console.log(`App is running on ${serverPort}.`);
});
