import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default:'Khong co'
    },
  },
  { timestamps: true }
);
export const CategoriesModel = mongoose.model("Category", schema);