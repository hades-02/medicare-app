const Review = require('../models/reviewModel');

const factory = require('./handlerFactory');

exports.setDoctorUserIds = (req, res, next) => {
  if (!req.body.doctor) req.body.doctor = req.params.doctorId;
  if (!req.body.patient) req.body.patient = req.userId;

  next();
};

exports.getReview = factory.getOne(Review);
exports.getAllReviews = factory.getAll(Review);

exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
