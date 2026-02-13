import ActionItem from "../models/ActionItem.js";
import Transcript from "../models/Transcript.js";
import { extractActionItems } from "../services/llmService.js";




export const processTranscript = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Transcript cannot be empty" });
    }

    const transcript = await Transcript.create({ content });

    const extractedItems = await extractActionItems(content);

    const savedItems = await Promise.all(
      extractedItems.map((item) =>
        ActionItem.create({
          task: item.task,
          owner: item.owner || "",
          dueDate: item.dueDate ? new Date(item.dueDate) : null,
          transcriptId: transcript._id,
        })
      )
    );

    res.status(201).json({
      transcript,
      actionItems: savedItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTranscriptHistory = async (req, res) => {
  try {
    const transcripts = await Transcript.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(transcripts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
