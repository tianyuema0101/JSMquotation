const mongoose = require('mongoose');

const foundationSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required: [true, 'Please input a foundation name'],
    },
    description:{
        type:String,
        trim: true,
    },
    type:{
        type: String,
        trim:true,
        required: [true, 'A foundation must have a type'],
        enum: ['Melbourne Metro Cemeteries', 'Additional Charge', 'Other'],
        default: 'Melbourne Metro Cemeteries' 
    },
    price: {
        type: Number,
        required: [true, 'A foundation must have a price']
      },
    modifiedDate:{
        type: Date,
        default: Date.now
    }
})

foundationSchema.pre('save', function(next) {
    this.modifiedDate = Date.now();
    next();
  });


const Foundation = mongoose.model('Foundation', foundationSchema);

module.exports = Foundation;

