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

router.patch('/updateMe', patientController.updateMe);
router.delete('/deleteMe', patientController.deleteMe);
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/myProfile', patientController.getMe, patientController.getPatient);

module.exports = router;
