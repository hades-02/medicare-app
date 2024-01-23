const mongoose = require('mongoose');
const validator = require('validator');

const appointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'Appointment must belong to a doctor.']
    },
    patient: {
      type: mongoose.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Appointment must belong to a patient.']
    },
    startTime: {
      type: String,
      validate: [validator.isTime, 'Start time is not valid.'],
      required: [true, 'Please provide the start time of appointment.']
    },
    endTime: {
      type: String,
      validate: [validator.isTime, 'End time is not valid.'],
      required: [true, 'Please provide the end time of appointment.']
    },
    date: {
      type: Date,
      required: [true, 'Please provide the date of appointment.']
    },
    status: {
      type: String,
      enum: ['upcoming', 'completed', 'cancelled'],
      default: 'upcoming'
    },
    isPaid: {
      type: Boolean,
      default: true
    },
    prescription: { type: String }
  },
  { timestamps: true }
);

appointmentSchema.pre(/^find/, function(next) {
  this.populate([
    {
      path: 'patient',
      model: 'Patient',
      select:
        '_id name email phone photo gender diabetic age weight bloodType history'
    },
    {
      path: 'doctor',
      model: 'Doctor',
      select:
        '_id name email phone photo specialization averageRating ticketPrice location'
    }
  ]);

  next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
