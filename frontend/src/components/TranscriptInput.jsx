import { useState } from "react";
import { postTranscript } from "../api";


const TranscriptInput = ({ setActionItems, setHistory }) => {

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await postTranscript(content);
      setActionItems(prev => [...prev, ...res.data.actionItems]);

      // Update history immediately
      setHistory(prev => {
        const newHistory = [res.data.transcript, ...prev]; // add new on top
        return newHistory.slice(0, 5); // keep only last 5
      });

      setContent("");
    } catch (err) {
      console.error(err);
      alert("Failed to process transcript");
    }
    setLoading(false);
  };


  return (
    <div>
      <textarea
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste meeting transcript here..."
        className="w-full border p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-2 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer"
      >
        {loading ? "Processing..." : "Extract Action Items"}
      </button>
    </div>
  );
}

export default TranscriptInput