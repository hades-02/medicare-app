const APIFeatures = require('../util/apiFeatures');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.userId;
  next();
};

exports.updateMe = Model =>
  catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updateMyPassword.',
          400
        )
      );
    }
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(
      req.body,
      'email',
      'role',
      'regNum',
      'averageRating',
      'totalRating',
      'isApproved',
      'active',
      'passwordChangedAt'
    );

    // 3) Update user document
    const updatedUser = await Model.findByIdAndUpdate(
      req.userId,
      filteredBody,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Updated successfully.',
      data: updatedUser
    });
  });

exports.deleteMe = Model =>
  catchAsync(async (req, res, next) => {
    await Model.findByIdAndUpdate(req.userId, { active: false });

    res.status(204).json({
      status: 'success',
      message: 'Deleted successfully.',
      data: null
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;

    if (!doc) {
      return next(
        new AppError(
          `No ${Model.collection.collectionName} found with this ID.`,
          404
        )
      );
    }

    res.status(200).json({
      status: 'success',
      message: `${Model.collection.collectionName} found.`,
      data: doc
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      message: `${Model.collection.collectionName} created successfully.`,
      data: newDoc
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(
        new AppError(
          `No ${Model.collection.collectionName} found with this ID.`,
          404
        )
      );
    }

    res.status(200).json({
      status: 'success',
      message: `${Model.collection.collectionName} updated successfully.`,
      data: doc
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(
          `No ${Model.collection.collectionName} found with this ID.`,
          404
        )
      );
    }

    res.status(204).json({
      status: 'success',
      message: `${Model.collection.collectionName} deleted successfully.`,
      data: null
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    // EXECUTE query
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await features.query;

    res.status(200).json({
      status: 'success',
      message: `${Model.collection.collectionName}s found.`,
      results: docs.length,
      data: docs
    });
  });
