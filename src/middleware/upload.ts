import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import multerS3 from "multer-s3"
import S3ClientObject from "../config/aws.config";
import {BUCKET_NAME } from "../config/server.config";
import NotFound from "../errors/NotFound";
if (!BUCKET_NAME) {
  
    throw new NotFound('Bucket not found');
  }
  
const upload=multer({
    storage: multerS3({
        s3: S3ClientObject,
        acl: undefined,
        bucket: BUCKET_NAME,
        key: function (req, file, cb) {
           
            cb(null, `${uuidv4()}`); 
        },


    })
})

export default upload;