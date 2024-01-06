import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());

const serverPort = process.env.PORT;

app.listen(serverPort, () => {
  console.log(`App is running on ${serverPort}.`);
});
