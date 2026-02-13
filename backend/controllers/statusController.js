import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv"
dotenv.config()


export const getStatus = async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1;

  let llmStatus = false;

  try {
    await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "user", content: "Hello" }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
        }
      }
    );

    llmStatus = true;
  } catch (error) {
    console.log("OpenRouter Status Error:", error.response?.data || error.message);
    llmStatus = false;
  }

  res.json({
    server: "running",
    database: dbStatus ? "connected" : "disconnected",
    llm: llmStatus ? "connected" : "disconnected"
  });
};
