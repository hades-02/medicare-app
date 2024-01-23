const mongoose = require('mongoose');

const Doctor = require('./doctorModel');

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'Review must belong to a doctor.']
    },
    patient: {
      type: mongoose.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Review must belong to a patient.']
    },
    review: {
      type: String,
      required: [true, 'Review can not be empty!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 0
    }
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'patient',
    select: 'name photo'
  });

  next();
});

// calculate average rating using statics and get average rating
reviewSchema.statics.calcAverageRating = async function(doctorId) {
  const stats = await this.aggregate([
    {
      $match: { doctor: doctorId }
    },
    {
      $group: {
        _id: '$doctor',
        numOfRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Doctor.findByIdAndUpdate(doctorId, {
      totalRating: stats[0].numOfRating,
      averageRating: stats[0].avgRating
    });
  } else {
    await Doctor.findByIdAndUpdate(doctorId, {
      totalRating: 0,
      averageRating: 4.0
    });
  }
};

reviewSchema.post('save', function() {
  this.constructor.calcAverageRating(this.doctor);
});

// findByIdAndUpdate
// findByIdAndDelete

reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  await this.r.constructor.calcAverageRatings(this.r.doctor);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
