import rateLimit from "express-rate-limit";
export const secretKeyRateLimiter=rateLimit({
    windowMs:1*60*1000,
    max:4,
    message:'Too many attempts plese try after 60 seconds'

})
export const fileSendingRateLimiter=rateLimit({
    windowMs:1*60*1000,
    max:7,
    message:'Too many request from your side,plese send file after 60 seconds'
})
