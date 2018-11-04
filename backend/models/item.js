const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name:{
        type: String,
        required: [true,'name is required']
    },
    quantity: {
        type:Number
    },
    createdTillNow: {
        type: Number
    },
    predicted:{
        type: Number,
        default: 123
    }
});

const Item = mongoose.model('item',ItemSchema);

module.exports = Item;