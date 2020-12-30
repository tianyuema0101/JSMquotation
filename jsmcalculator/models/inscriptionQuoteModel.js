const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inscriptionQuoteSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required: [true, 'Please input a customer name'],
    },
    phone:{
        type:String,
        trim:true,
        required: [true, 'Please input a phone'],
    },
    email:{
        type:String,
        trim:true,
    },
    cemetary:{
        type:String,
        trim:true,
    } ,
    section:{
        type:String,
        trim:true,
    },
    row:{
        type: String,
        trim:true 
    },
    grave_no:{
        type: String,
        trim:true 
    },
    discount:{
        type: Number
    },
    inscription:[{
        inscriptionId:{type: Schema.Types.ObjectId, 
            ref: 'Inscription'},
        inscriptionNumber: Number
    }],
    modifiedDate:{
        type: Date,
        default: Date.now
    },
    staff:{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    status:{
        type: String,
        enum: ['Pending', 'Success', 'Fail'],
        default: 'Pending',
    },
    note:{
        type: String,
        trim:true
    },
    reason:{
        type: String,
        trim:true 
    },
    extraFee:{
        type: Number
    },
    permitFee:{
        type: Number
    },
    advertisement:{
        type: String,
        trim:true 
    },
    funeralProvider:{
        type: String,
        trim:true 
    }
});

inscriptionQuoteSchema.pre('save', function(next) {
    this.modifiedDate = Date.now();
    next();
});


const InscriptionQuote = mongoose.model('InscriptionQuote', inscriptionQuoteSchema);

module.exports = InscriptionQuote;