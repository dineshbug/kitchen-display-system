const express = require('express');
const router = express.Router();
const Item = require('./../models/item');

//get list of n item 
router.get('/items', function(req,res,next){
    Item.find().then(function(Item){
        res.send(Item)
    })
})

// add
router.post('/insertItems', function(req,res,next){

    Item.findOneAndUpdate({name: req.body.name},req.body,{upsert: true, new: true}).then(function(){
        Item.findOne({name: req.body.name}).then(function(item){
            res.send(item);
        }).catch(next)
    })
})

// update
router.post('/updateItem', function(req,res,next){
    Item.findByIdAndUpdate({_id: req.body._id},req.body).then(function(){
        Item.findOne({_id: req.body._id}).then(function(item){
            res.send(item);
        }).catch(next)
        
    })
})

module.exports = router;