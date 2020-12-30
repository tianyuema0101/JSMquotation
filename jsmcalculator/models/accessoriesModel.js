const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required: [true, 'Please input a accessories name'],
    },
    description:{
        type:String,
        trim: true,
    },
    accessoriesType:{
        type: String,
        trim:true,
        required: [true, 'A accessories must have a type'],
        enum: ['accessories', 'door', 'photo', 'other'],
        default: 'accessories'
    },
    size:{
        type: String,
        trim:true,
        default: 'accessories'
    },
    price: {
        type: Number,
        required: [true, 'A accessories must have a price']
      },
    modifiedDate:{
        type: Date,
        default: Date.now
    }
})

accessoriesSchema.pre('save', function(next) {
    this.modifiedDate = Date.now();
    next();
  });


const Accessories = mongoose.model('Accessories', accessoriesSchema);

module.exports = Accessories;

