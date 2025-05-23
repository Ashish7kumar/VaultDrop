import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import multerS3 from "multer-s3"

import S3ClientObject from "../config/aws.config";
import {BUCKET_NAME } from "../config/server.config";
import NotFound from "../errors/NotFound";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
if (!BUCKET_NAME) {
  
    throw new NotFound('Bucket not found');
  }
  
  const upload = multer({
    storage: multerS3({
      s3: S3ClientObject,
      acl: undefined, 
      bucket: BUCKET_NAME,
      key: function (req, file, cb) {
        cb(null, `${uuidv4()}+${file.originalname}`);
      }
    }),
    limits: { fileSize: 1 * 1024 * 1024*100 } 
  });
  



export default upload;