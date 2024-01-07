import {
  createCharity,
  deleteCharityById,
  getCharities,
  getCharityById,
  updateCharityById,
} from "./charity.controllers";
import { Router } from "express";

// Sets up the charity router.
const charityRouter = Router();

// Defines the charity routes.
charityRouter.delete("/:id/delete", deleteCharityById);
charityRouter.get("/", getCharities);
charityRouter.get("/:id", getCharityById);
charityRouter.post("/create", createCharity);
charityRouter.put("/:id/update", updateCharityById);

export default charityRouter;
