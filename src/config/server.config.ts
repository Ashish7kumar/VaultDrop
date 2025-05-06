
import dotenv from "dotenv"
dotenv.config();
export const BUCKET_NAME=process.env.BUCKET_NAME;
export const PORT=process.env.PORT;
export const ACCESS_KEY=process.env.ACCESS_KEY;
export const SECRET_KEY=process.env.SECRET_KEY;
export const REGION=process.env.REGION;
export const EMAIL_USER=process.env.EMAIL_USER;
export const EMAIL_PASSWORD=process.env.EMAIL_PASSWORD
export const EMAIL_SERVICE_PROVIDER=process.env.EMAIL_SERVICE_PROVIDER