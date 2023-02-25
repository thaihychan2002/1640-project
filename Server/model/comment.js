import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        
    },
    { timestamps: true }
);
export const DepartmentModel = mongoose.model("Department", schema);
