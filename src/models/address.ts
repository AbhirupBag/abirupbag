import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  pinCode: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

const Address =
  mongoose.models.Address || mongoose.model("Address", addressSchema);

export default Address;
