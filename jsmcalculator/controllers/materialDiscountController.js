const MaterialDiscount = require('./../models/materialDiscountModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getMaterialDiscount = catchAsync(async (req, res, next) => {
    const materialDiscount = await MaterialDiscount.findById(req.params.id);

    if (!materialDiscount) {
        return next(new AppError('No materialDiscount found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            materialDiscount
        }
    });
});



exports.updateMaterialDiscount = catchAsync(async (req, res, next) => {
    const materialDiscount = await MaterialDiscount.findByIdAndUpdate(req.params.id, req.body);

    if (!materialDiscount) {
        return next(new AppError('No materialDiscount found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            materialDiscount
        }
    });
});

