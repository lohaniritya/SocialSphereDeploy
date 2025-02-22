import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
import path from "path"

const __dirname = path.resolve();

//middlewares

app.use(cors({
    origin: ["http://localhost:5175"],
    credentials: true
})) 

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/posts", postRouter)

app.use(express.static(path.join(__dirname, "client/dist")))
app.get("*", (_,res)=>{
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
})

// http://localhost:8000/api/v1/users/register

export { app }