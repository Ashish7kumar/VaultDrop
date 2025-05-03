import express from "express";
import dotenv from "dotenv"
import apiRouter from "./routes";
import errorHandler from "./utils/errorHandler";
const app=express();
dotenv.config();
app.use('/',apiRouter);
app.use(errorHandler)
app.listen(process.env.PORT,()=>{
    console.log("Server connected:"+
        process.env.PORT
    )
})