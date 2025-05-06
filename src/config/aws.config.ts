import { S3Client, S3, SessionCredentialsFilterSensitiveLog } from "@aws-sdk/client-s3";
import { BUCKET_NAME,ACCESS_KEY,SECRET_KEY,REGION } from "./server.config";
if (!REGION || !ACCESS_KEY || !SECRET_KEY) {
  throw new Error("AWS config environment variables are missing!");
}

const S3ClientObject = new S3Client({
  region: REGION,
  credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY
  }
});


  export default S3ClientObject;