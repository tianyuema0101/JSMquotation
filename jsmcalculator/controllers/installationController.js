const Installation = require('./../models/installationModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getInstallation = catchAsync(async (req, res, next) => {
    const installation = await Installation.findById(req.params.id);

    if (!installation) {
      return next(new AppError('No installation found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        installation
      }
    });
});
  
  exports.createInstallation = catchAsync(async (req, res, next) => {
    const newInstallation = await Installation.create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        installation: newInstallation
      }
    });
});


exports.updateInstallation = catchAsync(async (req, res, next) => {
    const installation = await Installation.findByIdAndUpdate(req.params.id, req.body);
  
    if (!installation) {
      return next(new AppError('No installation found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        installation
      }
    });
  });
  
  exports.deleteInstallation = catchAsync(async (req, res, next) => {
    const installation = await Installation.findByIdAndDelete(req.params.id);
  
    if (!installation) {
      return next(new AppError('No installation found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
  
  exports.getAllInstallation = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Installation.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const installation = await features.query;
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: installation.length,
      data: {
        installation
      }
    });
  });