

const ChartService = require('./chart.services');

exports.getPower = async (req, res) => {
    try {
        const Power = await ChartService.getPower();
        console.log("=========",Power.success);
        if (Power.success) {
            res.status(200).json({
                success: true,
                message: ['get_power_success'],
                content: Power
            })
        } else {
            res.status(400).json({
                success: false,
                message: Power.message
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: ['get_power_faile'],
            content: error,
        })
    }
}

exports.getCurrent = async (req, res) => {
    try {
        const Current = await ChartService.getCurrent();
        console.log("=========",Current.success);
        if (Current.success) {
            res.status(200).json({
                success: true,
                message: ['get_current_success'],
                content: Current
            })
        } else {
            res.status(400).json({
                success: false,
                message: Current.message
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: ['get_current_faile'],
            content: error,
        })
    }
}
exports.getVoltage = async (req, res) => {
    try {
        const Voltage = await ChartService.getVoltage();
        console.log("=========",Voltage.success);
        if (Voltage.success) {
            res.status(200).json({
                success: true,
                message: ['get_voltage_success'],
                content: Voltage
            })
        } else {
            res.status(400).json({
                success: false,
                message: Voltage.message
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: ['get_voltage_faile'],
            content: error,
        })
    }
}