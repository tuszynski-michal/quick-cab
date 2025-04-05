import express from 'express';
import {createServer} from 'http';
import cors from "cors";
import {Server} from "socket.io";
import dotenv from 'dotenv';

import ridesRouter from "./routes/rides";
import {rides} from './mocks/ride-db'

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors({origin: process.env.CORS_ORIGIN}));
app.use(express.json());

// Routes
app.use("/rides", ridesRouter)

// Websocket
io.on("connection", (socket) => {
    console.log("User conneted: ", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
    });

    socket.on("updateStatus", () => {
        io.emit("statusChanged", rides);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`🚕 Server run on port:  ${PORT}`);
});