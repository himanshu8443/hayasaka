import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        favourites: {
            type: Array,
            default: []
        },
        songHistory: {
            type: Array,
            default: []
        },
        playlists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "playlist"
            }
        ],
        language: {
            type: Array,
            default: []
        },
    },
    { timestamps: true }
);

export default mongoose.models.userData || mongoose.model("userData", fileSchema, "userData");