import cors from "cors"
import cookieParser from 'cookie-parser';
import express from "express";

const app =express()

app.use (cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true,
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extented:true,
    limit:true
}))
app.use(express.static("public"))
app.use(cookieParser())
export {app}



