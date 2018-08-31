const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
//Item Model
const List = require('../../models/List');
const Item = require('../../models/Item');
//@route GET api Items
// @desc Get All Items 
// @ access Public
router.get('/:id', (req, res) => {
    List.find({Manufactured: req.params.id})
        .select("Manufactured ItemName ItemPrice _id")
        .populate('Manufactured').sort({ date: -1 })
        .exec()
        .then(items => res.json(items))
});
//@route post api Items
// @desc post An Items 
// @ access Public
router.post('/', (req, res) => {
    const newItem = new List({
        _id: mongoose.Types.ObjectId(),
        ItemName: req.body.ItemName,
        ItemPrice: req.body.ItemPrice,
        Manufactured: req.body.ManufacturedId
    });
    newItem.save().then((r) => {
        let id = r._id;
        console.log("id", id);
        List.findById(id)
            .select("Manufactured ItemName ItemPrice _id")
            .populate('Manufactured').sort({ date: -1 })
            .exec()
            .then(items => {
                res.json(items)
            })
    })
});
//@route edit api/items/:id
// @desc edit A item
// @ access Public
router.put('/edit/:id',(req, res)=> {
    List.findOneAndUpdate({"_id":req.params.id},{"$set":{"ItemName":req.body.ItemName,"ItemPrice": req.body.ItemPrice }}, (err, doc)=> {
        res.send(req.body)
    })
})
//@route delete api/items/:id
// @desc delete A item
// @ access Public
router.delete('/:id', (req, res) => {
    List.findByIdAndRemove(req.params.id)
        // .then(delItem =>{
        //     List.find({Manufactured: req.params.manId})
        //     .select("Manufactured ItemName ItemPrice _id")
        //     .populate('Manufactured')
        //     .exec()
        //     .then(items => res.json(items))
        // })
        .then(()=> res.send({success: true}))
        .catch(err => res.status(404).json({ success: false }));
})
module.exports = router;