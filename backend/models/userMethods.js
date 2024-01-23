const bcrypt = require('bcryptjs');

const getCoordsForAddress = require('../util/location');

exports.setCoordinates = async function(next) {
  if (
    !this.isModified('street') &&
    !this.isModified('city') &&
    !this.isModified('state')
  )
    return next();

  try {
    const coordinates = await getCoordsForAddress(
      `${this.street},${this.city},${this.state}`
    );
    this.location.coordinates = [coordinates.lat, coordinates.lng];
  } catch (err) {
    return next(err);
  }
};

exports.setPassword = async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
};

exports.isPasswordCorrect = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

exports.setPasswordChangedAt = function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
};

exports.isPasswordChangedAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
