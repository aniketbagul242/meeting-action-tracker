import ActionItem from "../models/ActionItem.js";


// Get all action items
export const getAllActions = async (req, res) => {
  try {
    const actions = await ActionItem.find().sort({ createdAt: -1 });
    res.json(actions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch action items" });
  }
};

// Create a new action item
export const createAction = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // 

    const { task, owner, dueDate } = req.body;

    if (!task || task.trim() === "") {
      console.log("Validation failed: Task missing");
      return res.status(400).json({ message: "Task is required" });
    }

    const action = await ActionItem.create({
      task,
      owner: owner || "",
      dueDate: dueDate || null,
      status: "open",
    });

    console.log("Action created:", action); 
    res.status(201).json(action);
  } catch (error) {
    console.error("CREATE ACTION ERROR:", error);
    res.status(500).json({ message: "Failed to create action item" });
  }
};



// Update an action item
export const updateAction = async (req, res) => {
  try {
    const { task, owner, dueDate, status } = req.body;

    const updated = await ActionItem.findByIdAndUpdate(
      req.params.id,
      {
        ...(task && { task }),
        ...(owner !== undefined && { owner }),
        ...(dueDate !== undefined && { dueDate }),
        ...(status && { status }),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Action item not found" });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update action item" });
  }
};

// Delete an action item
export const deleteAction = async (req, res) => {
  try {
    const deleted = await ActionItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Action item not found" });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete action item" });
  }
};
