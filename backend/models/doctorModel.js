const mongoose = require('mongoose');
const validator = require('validator');

const userMethod = require('./userMethods');

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name.']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address.'],
      unique: [true, 'Doctor with this email address already exists.'],
      lowercase: true,
      validate: [validator.isEmail, 'Email address is not valid.']
    },
    phone: {
      type: Number,
      validate: {
        validator: function(num) {
          if (validator.isMobilePhone(num.toString(), 'en-IN')) {
            return true;
          }
          return false;
        },
        message: 'Phone number is not valid.'
      }
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Please select a gender.']
    },
    role: {
      type: String,
      enum: ['doctor']
    },
    photo: { type: String },

    // Clinic location
    street: {
      type: String,
      required: [true, 'Please provide a area or street.']
    },
    city: { type: String, required: [true, 'Please provide your city.'] },
    state: { type: String, required: [true, 'Please provide your state.'] },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number]
    },

    // Fields for doctors only
    about: { type: String },
    bio: {
      type: String,
      maxLength: [50, 'Bio must not exceed 50 characters.'],
      required: [true, 'Please provide a bio.']
    },
    ticketPrice: {
      type: Number,
      min: [1, 'Ticket price is not valid.'],
      required: [true, 'Please provide your ticket price.']
    },
    regNum: {
      type: String,
      required: [true, 'Please provide your registration number.'],
      unique: [true, 'Doctor with this registration number already exists.']
    },
    specialization: {
      type: String,
      required: [true, 'Please provide your specialization.']
    },
    qualifications: [
      {
        startDate: Date,
        endDate: Date,
        degree: String,
        university: String
      }
    ],
    experiences: [
      {
        startDate: Date,
        endDate: Date,
        position: String,
        hospital: String
      }
    ],
    averageRating: {
      type: Number,
      default: 4.0,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10
    },
    totalRating: {
      type: Number,
      default: 0
    },
    isApproved: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    timeSlots: [
      {
        startTime: {
          type: String,
          validate: [validator.isTime, 'Start time is not valid.']
        },
        endTime: {
          type: String,
          validate: [validator.isTime, 'End time is not valid.']
        },
        date: Date,
        timePerPatient: Number
      }
    ],

    // Password related properties
    password: {
      type: String,
      minlength: 8,
      required: [true, 'Please provide a password.'],
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please provide confirmed password.'],
      validate: {
        validator: function(el) {
          return el === this.password;
        },
        message: 'Confirmed password does not match with password.'
      }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

doctorSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

doctorSchema.pre('save', userMethod.setCoordinates);

doctorSchema.pre('save', userMethod.setPassword);

doctorSchema.pre('save', userMethod.setPasswordChangedAt);

doctorSchema.methods.correctPassword = userMethod.isPasswordCorrect;

doctorSchema.methods.changedPasswordAfter = userMethod.isPasswordChangedAfter;

doctorSchema.methods.createPasswordResetToken =
  userMethod.createPasswordResetToken;

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
