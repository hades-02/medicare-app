const express = require('express');

const authController = require('../controllers/authController');
const patientController = require('../controllers/patientController');

const router = express.Router();

//router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(patientController.getAllPatients)
  .post(patientController.createPatient);

router
  .route('/:id')
  .get(patientController.getPatient)
  .patch(patientController.updatePatient)
  .delete(patientController.deletePatient);

router.use(authController.protect);
router.use(authController.restrictTo('patient'));

router
  .route('/profile/me')
  .get(patientController.getMe, patientController.getPatient)
  .patch(patientController.updateMe)
  .delete(patientController.deleteMe);

router.patch('/profile/updatePassword', authController.updatePassword);

module.exports = router;
