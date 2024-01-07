import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

// Set up express.
const app = express();
app.use(express.json());

// Set up cors.
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "DELETE", "POST", "PUT"],
  })
);

// Get the server port from dotenv.
const serverPort = process.env.PORT;

const prismaClient = new PrismaClient();

// Get the charities data from route.
app.get("/api/charities", async (_req, res) => {
  try {
    const charities = await prismaClient.charity.findMany();

    res.json(charities);
  } catch (error) {
    console.error(error);
  }
});

// Run the server port.
app.listen(serverPort, () => {
  console.log(`App is running on ${serverPort}.`);
});
