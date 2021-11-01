const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PowerSchema = new Schema({
    time: {
        type: String
    },
    heater:{
        type: Number
    },
    powerSocket:{
        type: Number
    },
    roomAirConditionor:{
        type: Number
    },
    workingAirConditionor:{
        type: Number
    },
    lightning:{
        type: Number
    },
    topFloor:{
        type: Number
    }
}, {timestamps: true})

module.exports = mongoose.model('power', PowerSchema);