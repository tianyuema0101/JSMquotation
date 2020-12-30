const mongoose = require('mongoose');

const additionalInscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required: [true, 'Please input a inscription name'],
    },
    type:{
        type:String,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'A inscription must have a price']
      },
    modifiedDate:{
        type: Date,
        default: Date.now
    },
})

additionalInscriptionSchema.pre('save', function(next) {
    this.modifiedDate = Date.now();
    next();
  });


const AdditionalInscriptionSchema = mongoose.model('AdditionalInscriptionSchema', additionalInscriptionSchema);

module.exports = AdditionalInscriptionSchema;

