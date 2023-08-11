const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        trim:true,
        maxLength: 50
    },
    amount: {
        type:Number,
        required:true,
        maxLength:20,
        trim: true
    },
    category: {
        type:String,
        default: "income"
    },
    date: {
        type:Date,
        required: true,
        trim: true
    },
    category : {
        type:String,
        required: true,
        trim: true
    },
    description: {
        type:String,
        trim: true,
        maxLength:20
    }

}, {timestamps: true})

module.exports = mongoose.model('Income', IncomeSchema);