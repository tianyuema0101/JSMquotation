const mongoose = require('mongoose');

const ipAddressSchema = new mongoose.Schema({
    location:{
        type: String,
        trim:true,
        required: [true, 'Please input location'],
    },
    ip:{
        type: String,
        trim:true,
        required: [true, 'Please input an IP address '],
    },
    modifiedDate:{
        type: Date,
        default: Date.now
    }
})

ipAddressSchema.pre('save', function(next) {
    this.modifiedDate = Date.now();
    next();
  });


const ipAddress = mongoose.model('IpAddress', ipAddressSchema);

module.exports = ipAddress;

