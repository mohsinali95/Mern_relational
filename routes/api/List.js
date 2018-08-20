const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
//Item Model
const List = require('../../models/List');
const Item = require('../../models/Item');
//@route GET api Items
// @desc Get All Items 
// @ access Public
router.get('/', (req, res) => {
    List.find()
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
        console.log("R", r)
        let id = r._id;
        console.log("id", id);
        List.findById(id)
            .select("Manufactured ItemName ItemPrice _id")
            .populate('Manufactured').sort({ date: -1 })
            .exec()
            .then(items => {
                console.log("Items", items);
                res.json(items)
            })
    })
});
//@route edit api/items/:id
// @desc edit A item
// @ access Public
router.put('/:id', function (req, res) {
    console.log("req.params id", req.params.id)
    console.log("req.params", req.body)
    List.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
    })
})
//@route delete api/items/:id
// @desc delete A item
// @ access Public
router.delete('/:id', (req, res) => {
    List.findById(req.params.id).
        then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
})
module.exports = router;