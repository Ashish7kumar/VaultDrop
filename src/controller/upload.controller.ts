import { Request,Response } from "express";
import NotFound from "../errors/NotFound";
import NotImplemented from "../errors/NotImplemented";
import BadRequest from "../errors/BadRequest";

export default async function uploadController(req:Request,res:Response) {
   if(!req.file)
   {
      throw new BadRequest('File not recived');
   }
   console.log(req.file)
   res.status(200).json({
    Success:"True",
       })
}