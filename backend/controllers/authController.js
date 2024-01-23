const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const AppError = require('../util/appError');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const catchAsync = require('../util/catchAsync');

const getUserModel = role => {
  if (role === 'patient') {
    return Patient;
  }
  if (role === 'doctor') {
    return Doctor;
  }
  return null;
};

const signToken = (id, role) => {
  return jwt.sign(
    {
      id,
      role
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const createSendToken = (user, message, statusCode, res) => {
  const token = signToken(user._id, user.role);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    message,
    token,
    data: user
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // 1) Verify role of the new user
  const Model = getUserModel(req.body.role);
  if (!Model) {
    return next(new AppError('Role invalid or not specified.', 400));
  }

  // 2) Create a new user
  const newUser = await Model.create(req.body);

  // 3) If everything ok, send token to client
  createSendToken(newUser, 'Signup successful.', 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Verify role of the user
  const Model = getUserModel(req.body.role);
  if (!Model) {
    return next(new AppError('Role invalid or not specified.', 400));
  }

  // 3) Check if user exists && password is correct
  const user = await Model.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 4) If everything ok, send token to client
  createSendToken(user, 'Login successful.', 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  // 3) Check if user still exists
  const Model = getUserModel(decoded.role);
  const currentUser = await Model.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.userId = currentUser.id;
  req.role = currentUser.role;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const Model = getUserModel(req.role);
  const user = await Model.findById(req.userId).select('+password');

  // 2) Check if Posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 'Password successfully updated.', 200, res);
});
