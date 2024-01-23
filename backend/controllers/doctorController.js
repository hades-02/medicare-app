const factory = require('./handlerFactory');
const Doctor = require('../models/doctorModel');

exports.getMe = factory.getMe;
exports.updateMe = factory.updateMe(Doctor);
exports.deleteMe = factory.deleteMe(Doctor);

exports.getDoctor = factory.getOne(Doctor);
exports.getAllDoctors = factory.getAll(Doctor);
exports.createDoctor = factory.createOne(Doctor);
exports.updateDoctor = factory.updateOne(Doctor);
exports.deleteDoctor = factory.deleteOne(Doctor);
