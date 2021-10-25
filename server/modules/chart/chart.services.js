const Power = require("../../models/power");

exports.getPower = async () => {
    let power = await Power.find();
    if (power === null) throw ["power_not_found"];

    return {
        data: power,
        success: true
    };
};