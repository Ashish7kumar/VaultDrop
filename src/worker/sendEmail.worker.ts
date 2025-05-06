import { Worker } from "bullmq";
import redisClient from "../config/redis.config";
import sendEmail from "../utils/sendingEmail";
const emailWorker=new Worker("emailQueue",
    async (job)=>{
        const {receiverEmail,secretKey}=job.data;
        try{
           await sendEmail(receiverEmail,secretKey);
        }
         catch(e)
         {
            console.log(e);
         }
    },{connection:redisClient}
)