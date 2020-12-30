const Quote = require('./../models/quoteModel');
const MaterialDiscount = require('./../models/materialDiscountModel')
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const { promisify } = require('util');
const jwt = require('jsonwebtoken');

exports.getAllQuote = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) Check if user still exists
  if (decoded.role == 'admin') {
    const quote = await Quote.find().sort({"modifiedDate": -1})
      .select('-additionalInstallation -additionalFoundation -monument -monumentSize -inscription -installation -foundation -accessories -discount')
      .populate('staff');

    // SEND RESPONSE

    res.status(200).json({
      status: 'success',
      results: quote.length,
      data: {
        quote
      }
    });
  }
  else {
    const quote = await Quote.find({ staff: decoded.id })
      .select('-additionalInstallation -additionalFoundation -monument -monumentSize -inscription -installation -foundation -accessories -discount')
      .populate('staff');
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: quote.length,
      data: {
        quote
      }
    });
  }

  // const features = new APIFeatures(Quote.find().populate('monument')
  //                                              .populate('installation')
  //                                              .populate('additionalInstallation')
  //                                              .populate('inscription')
  //                                              .populate('foundation')
  //                                              .populate('additionalFoundation')
  //                                              .populate('accessories'), req.query)
  //   .filter()
  //   .sort()
  //   .limitFields()
  //   .paginate();
  // const quote = await features.query;


});

exports.createQuote = catchAsync(async (req, res, next) => {
  const totalDiscount = await MaterialDiscount.findById("5fd988833f005c069b66f844");
  console.log("discount", totalDiscount.materialDiscount);
  const newQuote = await Quote.create(req.body);
  let totalPrice =  0;
  
  const result = await Quote.findById(newQuote._id).populate('installation')
    .populate('monument.monumentId')
    .populate('additionalInstallation')
    .populate('inscription.inscriptionId')
    .populate('foundation')
    .populate('additionalFoundation')
    .populate('accessories.accessoriesId')
    .populate('casting.castingId')
    .populate('staff');

  if (result.monument) {
    result.monument.forEach(element => {
      totalPrice = totalPrice + element.monumentId.price * element.monumentNumber * totalDiscount.materialDiscount / 100;;
      console.log('monument', totalPrice)
    })
  }
  if (result.discount) {
    totalPrice = totalPrice * (100 - result.discount) / 100;
    console.log('discout', totalPrice)
  }
  if (result.installation) {
    totalPrice = totalPrice + result.installation.price;
    console.log('installation', totalPrice)
  }
  if (result.additionalInstallation) {
    result.additionalInstallation.forEach(installation => {
      totalPrice = totalPrice + installation.price;
      console.log(totalPrice)
    })
  }
  if (result.foundation) {
    totalPrice = totalPrice + result.foundation.price;
  }
  if (result.additionalFoundation) {
    result.additionalFoundation.forEach(foundation => {
      totalPrice = totalPrice + foundation.price;
      console.log(totalPrice)
    })
  }
  if (result.accessories) {
    result.accessories.forEach(accessory => {
      totalPrice = totalPrice + accessory.accessoriesId.price * accessory.accessoriesNumber;
      console.log(totalPrice)
    })
  }
  if(result.casting){
    result.casting.forEach(casting=>{
      totalPrice = totalPrice + casting.castingId.price * casting.castingNumber;
      console.log(totalPrice)
    })
  }
  if (result.inscription) {
    result.inscription.forEach(inscrp => {
      if(inscrp.inscriptionId._id == "5fdc292a3f005c069b66f865"){
        totalPrice = totalPrice + 495 + inscrp.inscriptionId.price * (inscrp.inscriptionNumber - 200)
      }else{
      totalPrice = totalPrice + inscrp.inscriptionId.price * inscrp.inscriptionNumber;}
      console.log(totalPrice)
    })
  }
  if (result.extraFee) {
    totalPrice = totalPrice + result.extraFee;
    console.log(totalPrice)
  }
  if (result.permitFee) {
    totalPrice = totalPrice + result.permitFee;
    console.log('lkalala',totalPrice)
  }
    
  console.log("beforeUpdate", totalPrice);

  await Quote.findByIdAndUpdate(newQuote._id, {
    'totalPrice': totalPrice
  });
  
  res.status(201).json({
    status: 'success',
    data: {
      quoteId: newQuote._id
    }
  })
  
  
});

exports.getQuote = catchAsync(async (req, res, next) => {
  const result = await Quote.findById(req.params.id).populate('installation')
    .populate('monument.monumentId')
    .populate('additionalInstallation')
    .populate('inscription.inscriptionId')
    .populate('foundation')
    .populate('additionalFoundation')
    .populate('accessories.accessoriesId')
    .populate('casting.castingId')
    .populate('staff');

  res.status(200).json({
    status: 'success',
    data: {
      totalPrice: result.totalPrice.toFixed(2),
      quote: result
    }
  });
});

exports.updateQuote = catchAsync(async (req, res, next) => {
  const quote = await Quote.findByIdAndUpdate(req.params.id, req.body);

  if (!quote) {
    return next(new AppError('No monument found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      quote
    }
  });
});

exports.checkPhone = catchAsync(async (req, res, next) => {
  const quote = await Quote.findOne({ phone: req.params.id }).populate('staff');
  console.log(quote)
  if (!quote) {
    res.status(200).json({
      status: "new"
    })
  }
  else {
    res.status(200).json({
      status: "old",
      data: quote.staff
    })
  }
});
