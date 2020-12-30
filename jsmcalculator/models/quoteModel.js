const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new mongoose.Schema({
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
    cemetery:{
        type:String,
        trim:true,
    } ,
    section:{
        type:String,
        trim:true,
    },
    discount:{
        type: Number
    },
    monumentStyle:{
        type:String,
        trim:true,
    },
    monument:[
        {monumentId:{type: Schema.Types.ObjectId, 
        ref: 'Monument'},
        monumentNumber: Number}
        ],
    installation:{
        type: Schema.Types.ObjectId, 
        ref: 'Installation',
    },
    additionalInstallation:[
        {type: Schema.Types.ObjectId, 
        ref: 'Installation'}
    ],
    inscription:[{
        inscriptionId:{type: Schema.Types.ObjectId, 
            ref: 'Inscription'},
        inscriptionNumber: Number
    }],

    foundation:{
        type: Schema.Types.ObjectId, 
        ref: 'Foundation'
    },

    additionalFoundation:[
        {type: Schema.Types.ObjectId, 
        ref: 'Foundation'}
    ],
    accessories:[{
        accessoriesId:{type: Schema.Types.ObjectId, 
        ref: 'Accessories'},
        accessoriesNumber: Number
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
    },
    totalPrice:{
        type:Number,
        default:0,
    },
    row:{
        type: String,
        trim:true 
    },
    grave_no:{
        type: String,
        trim:true 
    },
    casting:[{
        castingId:{type: Schema.Types.ObjectId, 
        ref: 'Casting'},
        castingNumber: Number
    }]
});

quoteSchema.pre('save', function(next) {
    this.modifiedDate = Date.now();
    next();
});


const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;