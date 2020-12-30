const mongoose = require('mongoose');

const installationSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required: [true, 'Please input a installation name'],
    },
    monumentType:{
        type: String,
        trim:true,
        required: [true, 'A installation must have a type'],
        enum: ['Lawn', 'Single', 'Double', 'Additional Charge', 'Other'],
        default: 'Lawn' 
    },
    price: {
        type: Number,
        required: [true, 'A installation must have a price']
      },
    modifiedDate:{
        type: Date,
        default: Date.now
    }
})

installationSchema.pre('save', function(next) {
    this.modifiedDate = Date.now();
    next();
  });


const Installation = mongoose.model('Installation', installationSchema);

module.exports = Installation;

