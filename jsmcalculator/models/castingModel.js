const mongoose = require('mongoose');

const castingSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required: [true, 'Please input a casting name'],
    },
    size:{
        type: String,
        trim:true,
    },
    price: {
        type: Number,
        required: [true, 'A casting must have a price']
      },
    modifiedDate:{
        type: Date,
        default: Date.now
    }
})

castingSchema.pre('save', function(next) {
    this.modifiedDate = Date.now();
    next();
  });


const Casting = mongoose.model('Casting', castingSchema);

module.exports = Casting;

