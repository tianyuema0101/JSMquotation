const mongoose = require('mongoose');

const materialDiscountSchema = new mongoose.Schema(
  {
    materialDiscount: {
      type: Number,
      required: [true, 'A material must have a price']
    },
    editedDate:{
        type: Date,
        default: Date.now
    }
  }
);

materialDiscountSchema.pre('save', function(next) {
    this.editedDate = Date.now();
    next();
  });


const MaterialDiscount = mongoose.model('MaterialDiscount', materialDiscountSchema);

module.exports = MaterialDiscount;