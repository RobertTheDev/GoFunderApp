import "dotenv/config";
import express from "express";
import cors from "cors";
import appRouter from "../../routes";

// This handler runs the express server when called.

export default function startServer() {
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

  // Sets up the app router.
  app.use("/api", appRouter);

  // Run the server port.
  app.listen(serverPort, () => {
    console.log(`App is running on ${serverPort}.`);
  });
}
