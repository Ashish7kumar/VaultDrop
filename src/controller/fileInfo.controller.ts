import redisClient from "../config/redisDb.config";
import { Request, Response } from "express";

async function getFileData(req: Request, res: Response) {
  const fileData = await redisClient.get(req.params.id);

  if (fileData) {
    const parsedData = JSON.parse(fileData);
    res.status(200).json({
      success: true,
      userName: parsedData.user,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No such file in Database",
    });
  }
}

export default getFileData;
