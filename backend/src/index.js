import express from "express";
import "dotenv/config.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/authRoutes.js";
import petRoutes from "./routes/petRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/Animals", petRoutes);

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
    connectDB();
})