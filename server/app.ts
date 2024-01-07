import "dotenv/config";
import express from "express";
import cors from "cors";

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

// Get the charities data from route.
app.get("/charities", (_req, res) => {
  res.json([{ name: "Save Africa" }, { name: "Help the children" }]);
});

// Run the server port.
app.listen(serverPort, () => {
  console.log(`App is running on ${serverPort}.`);
});
