import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    role: { type: String, default: "user" },
    createdAt: { type: Date, default: () => Date.now() },
    bloodGroup: { type: String },
    dob: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
