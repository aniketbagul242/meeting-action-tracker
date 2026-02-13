import { useState } from "react";
import { deleteActionItem, updateActionItem } from "../api";


const ActionItemList = ({ items, setItems }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ task: "", owner: "", dueDate: "" });

  // Mark task as done
  const markDone = async (id) => {
    await updateActionItem(id, { status: "done" });
    setItems(items.map(i => i._id === id ? { ...i, status: "done" } : i));
  };

  // Delete a task
  const removeItem = async (id) => {
    await deleteActionItem(id);
    setItems(items.filter(i => i._id !== id));
  };

  // Start editing a task
  const startEdit = (item) => {
    setEditingId(item._id);
    setEditData({
      task: item.task,
      owner: item.owner || "",
      dueDate: item.dueDate ? new Date(item.dueDate).toISOString().split("T")[0] : "",
    });
  };

  // Save edited task
  const saveEdit = async (id) => {
    await updateActionItem(id, editData);
    setItems(items.map(i => i._id === id ? { ...i, ...editData } : i));
    setEditingId(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map(item => (
        <div key={item._id} className="flex justify-between bg-white p-4 rounded shadow-sm">
          {/* Left side: task details or edit inputs */}
          <div className="flex-1">
            {editingId === item._id ? (
              <div className="flex flex-col gap-2">
                <input
                  value={editData.task}
                  onChange={e => setEditData({ ...editData, task: e.target.value })}
                  className="border p-2 rounded w-full"
                />
                <input
                  value={editData.owner}
                  onChange={e => setEditData({ ...editData, owner: e.target.value })}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="date"
                  value={editData.dueDate}
                  onChange={e => setEditData({ ...editData, dueDate: e.target.value })}
                  className="border p-2 rounded w-full"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => saveEdit(item._id)}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p><strong>Task:</strong> {item.task}</p>
                <p><strong>Owner:</strong> {item.owner || "N/A"}</p>
                <p><strong>Due:</strong> {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "N/A"}</p>
                <p>
                  <strong>Status:</strong>
                  <span className={`ml-2 px-2 py-1 rounded-full text-white ${item.status === 'done' ? 'bg-green-500' : 'bg-gray-400'}`}>
                    {item.status}
                  </span>
                </p>
              </>
            )}
          </div>

          {/* Right side: action buttons */}
          <div className="flex flex-col gap-2 ml-4">
            {item.status !== "done" && editingId !== item._id && (
              <button
                onClick={() => markDone(item._id)}
                className="bg-green-500 p-2 text-white rounded hover:bg-green-600 transition-colors cursor-pointer"
              >
                Done
              </button>
            )}
            {editingId !== item._id && (
              <button
                onClick={() => startEdit(item)}
                className="bg-yellow-500 p-2 text-white rounded hover:bg-yellow-600 transition-colors cursor-pointer"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => removeItem(item._id)}
              className="bg-red-500 p-2 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActionItemList;
