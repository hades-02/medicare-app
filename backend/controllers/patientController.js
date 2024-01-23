const factory = require('./handlerFactory');
const Patient = require('../models/patientModel');

exports.getMe = factory.getMe;
exports.updateMe = factory.updateMe(Patient);
exports.deleteMe = factory.deleteMe(Patient);

exports.getPatient = factory.getOne(Patient);
exports.getAllPatients = factory.getAll(Patient);
exports.createPatient = factory.createOne(Patient);
exports.updatePatient = factory.updateOne(Patient);
exports.deletePatient = factory.deleteOne(Patient);
