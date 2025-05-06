import { Request, Response } from "express";
import BadRequest from "../errors/BadRequest";
import redisClient from "../config/redisDb.config";
import NotFound from "../errors/NotFound";

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
  if (req.body.secretKey === keyStoredInDb) {
    res.status(200).json({
      success: true,
      download_url: parsedData.url,
    });
  }
}
export default validateSecretKey;
