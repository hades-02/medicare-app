import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  age: { type: Number },
  bloodType: { type: String },
  weight: { type: Number, min: [1, "Weight cannot be 0 or less"] },
  history: { type: String },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  role: {
    type: String,
    enum: ["patient"],
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  diabetic: { type: String, enum: ["Yes", "No"] },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("User", UserSchema);
