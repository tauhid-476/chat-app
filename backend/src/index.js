import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from './lib/db.js';
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import {app, server} from "./lib/socket.js"

import path from "path"

dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
    })
}

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})