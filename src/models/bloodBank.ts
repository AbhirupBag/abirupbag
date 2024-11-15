import mongoose, { Schema } from "mongoose";

const bloodBankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  storageType: { type: String },
  contactNumber: { type: String },
  address: { type: Schema.Types.ObjectId, ref: "Address" },
});

const BloodBank =
  mongoose.models.BloodBank || mongoose.model("BloodBank", bloodBankSchema);

export default BloodBank;
