import mongoose, { Schema } from "mongoose";

const campSchema = new mongoose.Schema({
  orgType: { type: String },
  orgName: { type: String, required: true },
  orgEmailId: { type: String, required: true },
  orgMobile: { type: String, required: true },
  campName: { type: String, required: true },
  address: { type: Schema.Types.ObjectId, ref: "Address" },
  bloodBank: { type: Schema.Types.ObjectId, ref: "BloodBank" },
});
const Camp = mongoose.models.Camp || mongoose.model("Camp", campSchema);

export default Camp;
