const Monument = require('./../models/monumentModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getMonument = catchAsync(async (req, res, next) => {
    const monument = await Monument.findById(req.params.id);

    if (!monument) {
      return next(new AppError('No monument found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        monument
      }
    });
});
  
exports.createMonument = catchAsync(async (req, res, next) => {
    const newMonument = await Monument.create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        monument: newMonument
      }
    });
});

//unfinished
exports.createManyMonument = catchAsync(async (req, res, next) => {
    const newMonument = await Monument.create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        monument: newMonument
      }
    });
});


exports.updateMonument = catchAsync(async (req, res, next) => {
    const monument = await Monument.findByIdAndUpdate(req.params.id, req.body);
  
    if (!monument) {
      return next(new AppError('No monument found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        monument
      }
    });
  });
  
exports.deleteMonument = catchAsync(async (req, res, next) => {
    const monument = await Monument.findByIdAndDelete(req.params.id);
  
    if (!monument) {
      return next(new AppError('No monument found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });
});
  

exports.getAllMonument = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Monument.find().sort({"color":1,"englishName":1}), req.query)
      .filter()
      .limitFields();
    const monuments = await features.query;
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: monuments.length,
      data: {
        monuments
      }
    });
});