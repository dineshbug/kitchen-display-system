const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    _id:{
        type:Number
    },
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
        type: Number
    }
});

const Item = mongoose.model('item',ItemSchema);

module.exports = Item;
