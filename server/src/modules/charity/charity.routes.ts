import { getCharities, getCharityById } from "./charity.controllers";
import { Router } from "express";

// Sets up the charity router.
const charityRouter = Router();

// Defines the charity routes.
charityRouter.get("/", getCharities);
charityRouter.get("/:id", getCharityById);

export default charityRouter;
