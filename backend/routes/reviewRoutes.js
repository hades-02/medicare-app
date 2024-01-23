const express = require('express');

const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

// /doctors/doctorId/reviews
// /reviews

router.get('/:id', reviewController.getReview);
router.get('/', reviewController.getAllReviews);

router.use(authController.protect);
router.use(authController.restrictTo('patient'));

router.post(
  '/',
  reviewController.setDoctorUserIds,
  reviewController.createReview
);

router
  .route('/:id')
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
