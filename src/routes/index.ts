import { Router } from "express";
import uploadController from "../controller/upload.controller";
import downloadController from "../controller/download.controller";
const apiRouter=Router();
apiRouter.post('/upload',uploadController);
apiRouter.post('/download',downloadController);
export default apiRouter;