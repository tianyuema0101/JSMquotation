const IpAddress = require('./../models/ipAddressModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const User = require('./../models/userModel');

exports.getIpAddress = catchAsync(async (req, res, next) => {
    const ipAddress = await IpAddress.findById(req.params.id);

    if (!ipAddress) {
      return next(new AppError('No ipAddress found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        ipAddress
      }
    });
});
  
exports.createIpAddress = catchAsync(async (req, res, next) => {
    const newIpAddress = await IpAddress.create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        ipAddress: newIpAddress
      }
    });
});

exports.updateIpAddress = catchAsync(async (req, res, next) => {
    const ipAddress = await IpAddress.findByIdAndUpdate(req.params.id, req.body);
  
    if (!ipAddress) {
      return next(new AppError('No ipAddress found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        ipAddress
      }
    });
  });
  
exports.deleteIpAddress = catchAsync(async (req, res, next) => {
    const ipAddress = await IpAddress.findByIdAndDelete(req.params.id);
  
    if (!ipAddress) {
      return next(new AppError('No ipAddress found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });
});
  

exports.getAllIpAddress = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(IpAddress.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const ipAddresss = await features.query;
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: ipAddresss.length,
      data: {
        ipAddresss
      }
    });
});

exports.ipPermision = catchAsync(async (req,res,next)=>{
    const currentIp = req.body.ip;
    console.log(req.body);
    const ipAddress = await IpAddress.find({ip: currentIp});
    console.log(ipAddress);
    if(ipAddress.length<=0){
        res.status(200).json({
            status:false
        })
    }
    else{
        res.status(200).json({
            status:true
        })
    }   
  }

)

exports.register = catchAsync(async (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const currentIp = req.body.ip;
    const currentLocation = req.body.location;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    if(user.role != 'admin'){
        return next(new AppError('Incorrect Role', 401));
    }

    const newIpAddress = await IpAddress.create({location:currentLocation, ip:currentIp});
  
    res.status(201).json({
      status: 'success',
      data: {
        ipAddress: newIpAddress
      }
    });
  }

)