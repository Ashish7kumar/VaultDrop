import { Job } from "bullmq";
import emailQueue from "../Queue/Email.queue";
async function sendEmailJob(
    receiverEmail:string,
secretKey:string
)
{
const job=await emailQueue.add(
   "email",{
    receiverEmail,secretKey
   } , { attempts:  2,backoff: {
    type: 'exponential',
    delay: 3000
  }}
);
return job;
}
export default sendEmailJob;