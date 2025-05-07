import { Request, Response } from "express";
import bcrypt from "bcrypt"
import BadRequest from "../errors/BadRequest";
import redisClient from "../config/redis.config";
import NotFound from "../errors/NotFound";
import { decrypt } from "../utils/encryptionDecryption";
async function validateSecretKey(req: Request, res: Response) {
  if (!req.body || !req.body.secretKey) {
    throw new BadRequest("Secret is not provided");
  }

  const fileData = await redisClient.get(req.params.id);
  if (!fileData) {
    throw new NotFound("no such file");
  }
  const parsedData = JSON.parse(fileData);
  const keyStoredInDb = parsedData.secretKey;
  const isSame=await bcrypt.compare(req.body.secretKey,keyStoredInDb);
  const download_url=await decrypt(parsedData.url,parsedData.iv);
  if (isSame) {
    res.status(200).json({
      success: true,
      download_url: download_url,
    });
  }
}
export default validateSecretKey;
