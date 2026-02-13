import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import transcriptRouter from "./routes/transcriptRoutes.js";
import actionRouter from "./routes/actionRoutes.js";
import statusRouter from "./routes/statusRoutes.js";


dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/transcripts",transcriptRouter );
app.use("/api/actions",actionRouter );
app.use("/api/status", statusRouter);

app.get("/", (req, res) => {
  res.send("Meeting Action Tracker API running");
});

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
