import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import NotFound from "../errors/NotFound";
import NotImplemented from "../errors/NotImplemented";
import BadRequest from "../errors/BadRequest";
import S3ClientObject from "../config/aws.config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import generatePresignedUrl from "../utils/generatePresignedUrl";
import MulterS3File from "../types/S3file.type";
import redisClient from "../config/redis.config";
import sendEmailJob from "../jobs/email.job";
import { encrypt } from "../utils/encryptionDecryption";
import {
  BUCKET_NAME,
  SECRET_KEY,
  FRONTEND_LINK,
} from "../config/server.config";
export default async function uploadController(req: Request, res: Response) {
  const file = req.file as MulterS3File;
  if (!file || !file.key) {
    throw new BadRequest("File not recived");
  }
  if (file.size)
    if (!req.body.receiverEmail) {
      throw new BadRequest("Reciver Email not provided");
    }

  if (Number(req.params.timeLimit) - 0 > 3600 * 24) {
    throw new BadRequest("Cant be higher than 1 day");
  }

  const maxTime = Number(req.params.timeLimit);

  const command = await generatePresignedUrl(file.key);
  const url = await getSignedUrl(S3ClientObject, command, {
    expiresIn: maxTime,
  });
  const secretKey = Math.floor(10000000 + Math.random() * 90000000).toString();
  const code = uuidv4().replace(/-/g, "");
  const encryptedResult=await encrypt(url);
  await redisClient.set(
    code,
    JSON.stringify({
      user: req.body.user ? req.body.user : null,
      url: encryptedResult.encryptedData,
      iv:encryptedResult.iv,
      secretKey: await bcrypt.hash(secretKey,10),
    })
  );
 
  await sendEmailJob(req.body.receiverEmail, secretKey);

  res.status(200).json({
    Success: true,
    fileName: file.originalname,
    secretKey: secretKey,
    link: FRONTEND_LINK + code,
  });
}
