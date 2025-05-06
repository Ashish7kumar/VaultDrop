import { Router } from "express";
import uploadController from "../controller/upload.controller";
import { fileSendingRateLimiter } from "../middleware/rateLimiter";
import upload from "../middleware/upload";
const apiRouter=Router();
import getFileData from "../controller/userInfo.controller";
import validateSecretKey from "../controller/validateSecretKey.controller";
import { validate } from "uuid";
apiRouter.post('/upload/:timeLimit',fileSendingRateLimiter,upload.single('file'),uploadController);
apiRouter.get('/:id',getFileData);
apiRouter.post('/:id',validateSecretKey)
export default apiRouter;