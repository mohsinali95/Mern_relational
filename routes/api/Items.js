const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//Item Model
const Item = require('../../models/Item');
//@route GET api Items
// @desc Get All Items 
// @ access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});
//@route post api Items
// @desc post An Items 
// @ access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    newItem.save().then(item => res.json(item));
});
//@route edit api/items/:id
// @desc edit A item
// @ access Public
router.put('/:id', function (req, res) {
    console.log("req.params id", req.params.id)
    console.log("req.params", req.body)
    Item.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
    })
})
//@route delete api/items/:id
// @desc delete A item
// @ access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id).
        then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
})
module.exports = router;