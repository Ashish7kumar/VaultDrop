import { Request,Response } from "express";
import NotFound from "../errors/NotFound";
import NotImplemented from "../errors/NotImplemented";
import BadRequest from "../errors/BadRequest";
import S3ClientObject from "../config/aws.config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { BUCKET_NAME } from "../config/server.config";
import generatePresignedUrl from "../utils/generatePresignedUrl";
import MulterS3File from "../types/S3file.type";
export default async function uploadController(req:Request,res:Response) {
   const file=req.file as MulterS3File;
   if(!file || !file.key)
   {
      throw new BadRequest('File not recived');
   }
   if(Number(req.params.time) -0  >3600*24)
   {
     throw new BadRequest('Cant be higher than 1 day');
   }
   const maxTime= Number(req.params.time)
   
const command=await generatePresignedUrl(file.key);
   const url = await getSignedUrl(S3ClientObject, command, { expiresIn:  maxTime}); 
 
 
  
    
   
   res.status(200).json({
      Success:true,
     fileName:file.originalname,
     link:url
       })
}