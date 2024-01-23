const express = require('express');

const reviewRouter = require('./reviewRoutes');
const authController = require('../controllers/authController');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

router.use('/:doctorId/reviews', reviewRouter);

//router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(doctorController.getAllDoctors)
  .post(doctorController.createDoctor);

router
  .route('/:id')
  .get(doctorController.getDoctor)
  .patch(doctorController.updateDoctor)
  .delete(doctorController.deleteDoctor);

router.use(authController.protect);
router.use(authController.restrictTo('doctor'));

router
  .route('/profile/me')
  .get(doctorController.getMe, doctorController.getDoctor)
  .patch(doctorController.updateMe)
  .delete(doctorController.deleteMe);

router.patch('/profile/updatePassword', authController.updatePassword);

module.exports = router;
