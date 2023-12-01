import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getCoordsForAddress } from "../util/location.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15d" }
  );
};

export const register = async (req, res) => {
  const {
    email,
    password,
    name,
    street,
    city,
    state,
    role,
    photo,
    gender,
    regNum,
  } = req.body;

  const address = street + ", " + city + ", " + state;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return res.status(422).json({
      message: error.message || "Please enter a valid address",
    });
  }

  try {
    let user = null;

    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    // check if user is already registered
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // check if user with the same registration number already exists
    if (role === "doctor") {
      user = await Doctor.findOne({ regNum });

      if (user) {
        return res.status(400).json({
          message: "User with this registration number already exists",
        });
      }
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashedPassword,
        street,
        city,
        state,
        location: coordinates,
        photo,
        gender,
        role,
      });
    }

    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashedPassword,
        street,
        city,
        state,
        location: coordinates,
        photo,
        gender,
        role,
        regNum,
      });
    }

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error, Try again",
    });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;

  try {
    let user = null;

    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }

    // check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    // generate token
    const token = generateToken(user);

    const { password, role, appointments, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
