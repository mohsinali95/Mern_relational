const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const ListSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ItemName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    ItemPrice: {
        type: String,
        required: true
    },
    Manufactured: [{ type: mongoose.Schema.Types.ObjectId, ref: 'item', required: true }]
});
module.exports = List = mongoose.model('List', ListSchema);