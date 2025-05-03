import express from "express";
import dotenv from "dotenv"
import apiRouter from "./routes";
const app=express();
dotenv.config();
app.use('/',apiRouter);
app.listen(process.env.PORT,()=>{
    console.log("Server connected:"+
        process.env.PORT
    )
})