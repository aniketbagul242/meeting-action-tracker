
import axios from "axios";

export const extractActionItems = async (transcriptText) => {
  const prompt = `
Extract action items from this meeting transcript.

Return ONLY valid JSON.
No explanation.

Format:
[
  {
    "task": "string",
    "owner": "string or empty",
    "dueDate": "YYYY-MM-DD or empty"
  }
]

Transcript:
${transcriptText}
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: "You extract structured task data." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const content = response.data.choices[0].message.content;

    const jsonMatch = content.match(/\[[\s\S]*\]/);

    if (!jsonMatch) {
      throw new Error("Invalid JSON from model");
    }

    return JSON.parse(jsonMatch[0]);

  } catch (error) {
    console.error("LLM Error:", error.response?.data || error.message);
    throw new Error("Failed to extract action items");
  }
};
