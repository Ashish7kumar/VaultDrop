import { Request,Response,NextFunction } from "express"
import { MulterError } from "multer"
import BaseError from "../errors/BaseError"
export default function errorHandler(err:Error |BaseError,req:Request,res:Response,next:NextFunction){
    if(err instanceof MulterError )
    {
       if(err.name=="LIMIT_FILE_SIZE")
       {
        res.status(413).json({
            status:"Success"
        })
       }
    }
if(err instanceof BaseError){
res.status(err.statusCode).json(
{
 Error:err.name,
 ErrorMessage:err.message
})
}
else{
    res.status(500).json({
        Error:'Internal Server Error',
        ErrorMessage:'Something Went Wrong'
    })
}
console.log('Error'+err);
next();
}