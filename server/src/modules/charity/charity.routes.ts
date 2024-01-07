import {
  createCharity,
  getCharities,
  getCharityById,
} from "./charity.controllers";
import { Router } from "express";

// Sets up the charity router.
const charityRouter = Router();

// Defines the charity routes.
charityRouter.get("/", getCharities);
charityRouter.get("/:id", getCharityById);
charityRouter.post("/create", createCharity);

export default charityRouter;
