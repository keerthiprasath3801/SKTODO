import express from "express";
import AuthRoute from "./routes/auth.js";
import TodoRoute from "./routes/todo.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

const app=express();
const PORT =3000;

dotenv.config();

const corsOption= {
  origin: ["https://sktodosapp.netlify.app","http://localhost:5173"], // Allow the specific frontend domain
  credentials: true, // Allow cookies and authentication headers
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type","Authorization"],
};

app.use(cors(corsOption))
app.use(bodyParser.json())
app.use(cookieParser());
app.use("/api/user",AuthRoute)
app.use("/api/todos",TodoRoute)

app.get("/",(req,res,next) => {
    res.send("helloworld");
})

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const  message= err.message || "Internal server error"
    res.status(statusCode).json({error: message})
})
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})
