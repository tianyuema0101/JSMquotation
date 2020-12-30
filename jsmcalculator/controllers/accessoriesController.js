const Accessories = require('./../models/accessoriesModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAccessories = catchAsync(async (req, res, next) => {
    const accessories = await Accessories.findById(req.params.id).sort({"name":1});

    if (!accessories) {
      return next(new AppError('No accessories found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        accessories
      }
    });
});
  
exports.createAccessories = catchAsync(async (req, res, next) => {
    const newAccessories = await Accessories.create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        accessories: newAccessories
      }
    });
});


exports.updateAccessories = catchAsync(async (req, res, next) => {
    const accessories = await Accessories.findByIdAndUpdate(req.params.id, req.body);
  
    if (!accessories) {
      return next(new AppError('No accessories found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        accessories
      }
    });
  });
  
exports.deleteAccessories = catchAsync(async (req, res, next) => {
    const accessories = await Accessories.findByIdAndDelete(req.params.id);
  
    if (!accessories) {
      return next(new AppError('No accessories found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });


});

exports.getAllAccessories = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Accessories.find().sort({"accessoriesType":1, "name":1}), req.query)
      .filter()
      .limitFields();
    const accessories = await features.query;
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: accessories.length,
      data: {
        accessories
      }
    });
});
  
