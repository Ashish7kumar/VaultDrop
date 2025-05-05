import { Router } from "express";
import uploadController from "../controller/upload.controller";

import upload from "../middleware/upload";
const apiRouter=Router();

apiRouter.post('/upload/:timeLimit',upload.single('file'),uploadController);

export default apiRouter;