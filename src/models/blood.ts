import mongoose from "mongoose";

const bloodSchema = new mongoose.Schema({
  bloodGroup: { type: String, required: true },
  quantity: { type: Number, required: true },
  bloodBank: { type: mongoose.Schema.Types.ObjectId, ref: "BloodBank" },
});

const Blood = mongoose.models.Blood || mongoose.model("Blood", bloodSchema);

export default Blood;
