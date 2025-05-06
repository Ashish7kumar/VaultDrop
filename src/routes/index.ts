import { Router } from "express";
import uploadController from "../controller/upload.controller";
import { fileSendingRateLimiter } from "../middleware/rateLimiter";
import upload from "../middleware/upload";
const apiRouter=Router();

apiRouter.post('/upload/:timeLimit',fileSendingRateLimiter,upload.single('file'),uploadController);

export default apiRouter;