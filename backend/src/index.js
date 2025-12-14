import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import job from "./lib/cron.js";

import authRoutes from "./routes/authRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import { setIO } from "./routes/petRoutes.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PUT"],
    },
});

const PORT = process.env.PORT || 3000;

job.start();

// Middleware
app.use(express.json());
app.use(cors());

// Pass io instance to routes
setIO(io);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/animals", petRoutes);

// WebSocket connection handler
io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        console.log("Socket authentication failed: no token");
        return next(new Error("Authentication error"));
    }

    // Store token in socket for later use if needed
    socket.token = token;
    next();
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });

    // Optional: Handle ping/pong to keep connection alive
    socket.on("ping", () => {
        socket.emit("pong");
    });
});

httpServer.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
    connectDB();
});

export default app;