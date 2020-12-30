const Casting = require('./../models/castingModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getCasting = catchAsync(async (req, res, next) => {
    const casting = await Casting.findById(req.params.id);

    if (!casting) {
      return next(new AppError('No casting found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        casting
      }
    });
});
  
  exports.createCasting = catchAsync(async (req, res, next) => {
    const newCasting = await Casting.create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        casting: newCasting
      }
    });
});


exports.updateCasting = catchAsync(async (req, res, next) => {
    const casting = await Casting.findByIdAndUpdate(req.params.id, req.body);
  
    if (!casting) {
      return next(new AppError('No casting found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        casting
      }
    });
  });
  
  exports.deleteCasting = catchAsync(async (req, res, next) => {
    const casting = await Casting.findByIdAndDelete(req.params.id);
  
    if (!casting) {
      return next(new AppError('No casting found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
  
  exports.getAllCasting = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Casting.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const casting = await features.query;
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: casting.length,
      data: {
        casting
      }
    });
  });