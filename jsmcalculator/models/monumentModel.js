const mongoose = require('mongoose');

const monumentSchema = new mongoose.Schema({
    englishName:{
        type: String,
        trim:true,
        required: [true, 'Please input a monument English name'],
    },

    chineseName:{
        type: String,
        trim:true,
        required: [true, 'Please input a monument Chinese name'],
    },
    color:{
        type:String,
        trim: true,
    },
    origin:{
        type:String,
        trim: true,
    },
    size:{
        type:String,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'A monument must have a price']
      },
    modifiedDate:{
        type: Date,
        default: Date.now
    }
})

monumentSchema.pre('save', function(next) {
    this.modifiedDate = Date.now();
    next();
  });


const Monument = mongoose.model('Monument', monumentSchema);

module.exports = Monument;

