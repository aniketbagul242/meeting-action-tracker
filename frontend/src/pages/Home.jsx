import { useState, useEffect } from "react";

import { getActionItems, getTranscriptHistory } from "../api";
import TranscriptInput from "../components/TranscriptInput";
import ActionItemList from "../components/ActionItemList";
//import TranscriptHistory from "../components/TranscriptHistory";
import AddActionItem from "../components/AddActionItem";

 const Home = () => {

  const [actionItems, setActionItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("all"); // all / open / done

  // Fetch initial data
  useEffect(() => {
    getActionItems().then(res => setActionItems(res.data));
    getTranscriptHistory().then(res => setHistory(res.data));
  }, []);

  const filteredItems = filter === "all"
    ? actionItems
    : actionItems.filter(i => i.status === filter);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col lg:flex-row max-w-7xl mx-auto gap-8">

      {/* Left Workspace */}
      <div className="lg:w-3/4 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Meeting Action Items Tracker
        </h1>

        <div className="bg-white p-4 rounded shadow-md">
          <TranscriptInput setActionItems={setActionItems} setHistory={setHistory} />
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <AddActionItem setItems={setActionItems} />
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-2">
          <button
            className={`px-4 py-2 rounded-full ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => setFilter("all")}
          >All</button>
          <button
            className={`px-4 py-2 rounded-full ${filter === "open" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => setFilter("open")}
          >Open</button>
          <button
            className={`px-4 py-2 rounded-full ${filter === "done" ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => setFilter("done")}
          >Done</button>
        </div>

        <div className="flex flex-col gap-4">
          <ActionItemList items={filteredItems} setItems={setActionItems} />
        </div>
      </div>

      {/* Right Sidebar / History */}
      <div className="lg:w-1/4 bg-white p-4 rounded shadow-md border-l border-gray-200 max-h-screen overflow-y-auto">
        <h2 className="font-bold mb-4 text-lg">Last 5 Transcripts</h2>
        <ul className="flex flex-col gap-3">
          {history.map((t) => (
            <li
              key={t._id}
              className="bg-gray-50 p-3 rounded break-words cursor-pointer hover:bg-gray-100 transition-all duration-150 shadow-sm"
              title={t.content}
            >
              {t.content.length > 100 ? t.content.substring(0, 100) + "..." : t.content}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Home;