import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Appointment must belong to a doctor."],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Appointment must belong to a user."],
    },
    startTime: {
      type: String,
      validate: [validator.isTime, "Start time is not valid."],
      required: [true, "Please provide the start time of appointment."],
    },
    endTime: {
      type: String,
      validate: [validator.isTime, "End time is not valid."],
      required: [true, "Please provide the end time of appointment."],
    },
    date: {
      type: Date,
      required: [true, "Please provide the date of appointment."],
    },
    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled"],
      default: "upcoming",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    prescription: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
