import mongoose from "mongoose";

const actionItemSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            required: true
        },

        owner: {
            type: String,
            default: ""
        },
        dueDate: { type: Date },

        status: {
            type: String,
            enum: ["open", "done"],
            default: "open",
        },

        transcriptId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transcript",
        },
    },
    { timestamps: true }
);

const ActionItem = mongoose.model("ActionItem", actionItemSchema);
export default ActionItem;
