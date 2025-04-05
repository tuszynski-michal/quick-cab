const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const rideRouter = require("./routes/ride");
const { getRideStatus, updateRideStatus } = require("./databases/db-ride");


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // frontend - add to the config
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Websocket
io.on("connection", (socket) => {
    console.log("User conneted: ", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
    });

    socket.on("updateStatus", (newStatus) => {
        rideStatus.status = newStatus;
        io.emit("statusChanged", getRideStatus());
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`🚕 Serwer run on port:  ${PORT}`);
});