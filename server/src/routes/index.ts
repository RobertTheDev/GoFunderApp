import { Router } from "express";
import charityRouter from "../modules/charity/charity.routes";

// Sets up the apps routers with the modulised routers.
const appRouter = Router();

// Defines app routes.
appRouter.use("/charities", charityRouter);

export default appRouter;
