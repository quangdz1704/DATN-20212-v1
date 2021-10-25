

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