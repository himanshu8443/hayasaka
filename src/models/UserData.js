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
                name: {
                    type: String,
                    required: true
                },
                songs: {
                    type: Array,
                    default: []
                }
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