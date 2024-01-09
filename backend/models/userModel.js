import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name."],
    },
    email: {
      type: String,
      required: [true, "Please provide your email address."],
      unique: [true, "User with this email address already exists."],
      lowercase: true,
      validate: [validator.isEmail, "Email address is not valid."],
    },
    phone: {
      type: Number,
      validate: {
        validator: function (num) {
          if (validator.isMobilePhone(num.toString(), "en-IN")) {
            return true;
          }
          return false;
        },
        message: "Phone number is not valid.",
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Please select a gender."],
    },
    role: {
      type: String,
      default: "patient",
      enum: ["patient"],
    },
    photo: { type: String },

    // User address
    street: {
      type: String,
      required: [true, "Please provide a area or street."],
    },
    city: { type: String, required: [true, "Please provide your city."] },
    state: { type: String, required: [true, "Please provide your state."] },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
    },

    // Fields for patients only
    history: { type: String },
    diabetic: { type: String, enum: ["Yes", "No"] },
    age: { type: Number, min: [1, "Age is not valid."] },
    weight: { type: Number, min: [1, "Weight is not valid."] },
    bloodType: {
      type: String,
      enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    },

    // Password related properties
    password: {
      type: String,
      minlength: 8,
      required: [true, "Please provide a password."],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide confirmed password."],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Confirmed password does not match with password.",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model("User", UserSchema);
