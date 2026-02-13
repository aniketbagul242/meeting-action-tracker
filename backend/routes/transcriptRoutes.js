import express from "express";
import { getTranscriptHistory, processTranscript } from "../controllers/transcriptController.js";

const transcriptRouter = express.Router();

transcriptRouter.post("/", processTranscript);
transcriptRouter.get("/history", getTranscriptHistory);

export default transcriptRouter;
