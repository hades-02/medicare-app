import bcrypt from "bcryptjs";

import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;

  const { street, city, state } = req.body;

  const address = street + ", " + city + ", " + state;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return res.status(422).json({
      message: error.message || "Please enter a valid address",
    });
  }
  req.body.location = coordinates;

  try {
    if (req.body.password) {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "No user found" });
  }
};

export const getAllUser = async (req, res) => {
  const id = req.params.id;

  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { password, ...rest } = user._doc;

    res
      .status(200)
      .json({ success: true, message: "Got profile info", data: { ...rest } });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get profile",
    });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    // step-1 : retrieve appointments from booking for specific user
    const bookings = await Booking.find({ user: req.user });

    // step-2 : extract doctor ids from appointment bookings
    const doctorIds = bookings.map((el) => el.doctor.id);

    // step-3 : retrieve doctors using doctor ids
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );

    res
      .status(200)
      .json({ success: true, message: "Got Appointments", data: doctors });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, cannot get appointments",
    });
  }
};
