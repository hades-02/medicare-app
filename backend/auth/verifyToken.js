import jwt from "jsonwebtoken";

import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const authenticate = async (req, res, next) => {
  // get token from headers
  const authToken = req.headers.authorization;

  // check if token exists
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  }

  try {
    const token = authToken.split(" ")[1];
    // decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const role = decoded.role;

    if (role === "patient") {
      req.userId = decoded.id;
    }
    if (role === "doctor") {
      req.doctorId = decoded.id;
    }
    req.role = role;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId || undefined;
  const doctorId = req.doctorId || undefined;

  let user;

  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(doctorId);

  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }

  if (!roles.includes(user.role)) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized",
    });
  }
  next();
};
