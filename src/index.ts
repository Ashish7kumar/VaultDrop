import express from "express";
import dotenv from "dotenv"
import { PORT } from "./config/server.config";
import apiRouter from "./routes";
import errorHandler from "./utils/errorHandler";
const app=express();


app.use('/',apiRouter);
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log("Server connected:"+
        PORT
    )
})