import { BUCKET_NAME } from "../config/server.config";
import { GetObjectCommand } from "@aws-sdk/client-s3";
export default async function generatePresignedUrl(key:string) {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    });
    return command;
}