import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Transcript = mongoose.model("Transcript", transcriptSchema);
export default Transcript;
