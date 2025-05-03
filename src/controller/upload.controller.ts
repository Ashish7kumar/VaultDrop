import { Request,Response } from "express";
import NotFound from "../errors/NotFound";
import NotImplemented from "../errors/NotImplemented";
export default async function uploadController(req:Request,res:Response) {
    throw new NotImplemented()
}