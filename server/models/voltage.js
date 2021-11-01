const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoltageSchema = new Schema({
    time: {
        type: String
    },
    voltage:{
        type: Number
    },
}, {timestamps: true})

module.exports = mongoose.model('voltage', VoltageSchema);