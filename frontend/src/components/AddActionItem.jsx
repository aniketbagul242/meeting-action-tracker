import { useState } from "react";
import { postActionItem } from "../api";

//const ActionItemList = ({ items, setItems }) =>

 const AddActionItem = ({ setItems }) => {
  const [task, setTask] = useState("");
  const [owner, setOwner] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [open, setOpen] = useState(false);

  const handleAdd = async () => {
    if (!task.trim()) return alert("Task cannot be empty");

    try {
      const res = await postActionItem({ task, owner: owner || "", dueDate: dueDate || null });
      setItems(prev => [...prev, res.data]);
      setTask(""); setOwner(""); setDueDate("");
      setOpen(false);
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to add task");
    }
  };

  return (
    <div className="w-full">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer font-medium"
      >
        {open ? "Close Add Task" : "Add New Task"}
      </button>

      {/* Collapsible form */}
      <div
        className={`overflow-hidden transition-all duration-300 mt-3 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <div className="bg-gray-50 p-4 rounded shadow-inner flex flex-col gap-3">
          <input
            type="text"
            placeholder="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Centered Add Task button */}
          <div className="flex justify-center">
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer font-medium"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddActionItem