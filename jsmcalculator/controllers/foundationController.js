const Foundation = require('./../models/foundationModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getFoundation = catchAsync(async (req, res, next) => {
    const foundation = await Foundation.findById(req.params.id);

    if (!foundation) {
      return next(new AppError('No foundation found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        foundation
      }
    });
});
  
exports.createFoundation = catchAsync(async (req, res, next) => {
    const newFoundation = await Foundation.create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        foundation: newFoundation
      }
    });
});


exports.updateFoundation = catchAsync(async (req, res, next) => {
    const foundation = await Foundation.findByIdAndUpdate(req.params.id, req.body);
  
    if (!foundation) {
      return next(new AppError('No foundation found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        foundation
      }
    });
  });
  
exports.deleteFoundation = catchAsync(async (req, res, next) => {
    const foundation = await Foundation.findByIdAndDelete(req.params.id);
  
    if (!foundation) {
      return next(new AppError('No foundation found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });
});
  

exports.getAllFoundation = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Foundation.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const foundation = await features.query;
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: foundation.length,
      data: {
        foundation
      }
    });
});