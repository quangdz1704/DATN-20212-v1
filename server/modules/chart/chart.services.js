const Power = require("../../models/power");
const Current = require('../../models/current');
const Voltage = require('../../models/voltage');

exports.getPower = async () => {
    let power = await Power.aggregate([
        { $addFields: { date: { $toDate: "$time" } } }, 
        { $sort: { date: 1 } }
      ]);
    if (power === null) throw ["power_not_found"];

    return {
        data: power,
        success: true
    };
};

exports.getCurrent = async () => {
    // let current = await Current.find().sort('time asc');
    let current = await Current.aggregate([
        { $addFields: { date: { $toDate: "$time" } } }, 
        { $sort: { date: 1 } }
      ])
    if (current === null) throw ["current_not_found"];

    return {
        data: current,
        success: true
    };
};

exports.getVoltage = async () => {
    let voltage = await Voltage.aggregate([
        { $addFields: { date: { $toDate: "$time" } } }, 
        { $sort: { date: 1 } }
      ]);
    if (voltage === null) throw ["voltage_not_found"];

    return {
        data: voltage,
        success: true
    };
};