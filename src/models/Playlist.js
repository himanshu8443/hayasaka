import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    songs: {
        type: Array,
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
  },
  { timestamps: true }
);

export default mongoose.models.playlist || mongoose.model("playlist", fileSchema, "playlist");