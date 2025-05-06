import { Router } from "express";
import uploadController from "../controller/upload.controller";
import { fileSendingRateLimiter,secretKeyRateLimiter } from "../middleware/rateLimiter";
import upload from "../middleware/upload";
const apiRouter=Router();
import getFileData from "../controller/fileInfo.controller";
import validateSecretKey from "../controller/validateSecretKey.controller";
import { validate } from "uuid";
apiRouter.post('/upload/:timeLimit',fileSendingRateLimiter,upload.single('file'),uploadController);
apiRouter.get('/:id',getFileData);
apiRouter.post('/:id',secretKeyRateLimiter,validateSecretKey)
export default apiRouter;