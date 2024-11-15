import mongoose, { Schema } from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  campId: { type: Schema.Types.ObjectId, ref: "Camp" },
  appointmentDate: { type: Date, required: true },
  approved: { type: Boolean, default: false },
  amount: { type: Number, required: true },
});

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;
