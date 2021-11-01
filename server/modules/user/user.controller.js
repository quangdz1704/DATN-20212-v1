const userService = require('./user.services');

exports.createUser = async (req, res) => {
    try {
        console.log("show my body ----\n\n\n", req.body);

        const User = await userService.createUser(req.body);
        console.log(User);
        // if (User.success) {
            res.status(200).json({
                success: true,
                message: ['register_success'],
                content: User
            })
        // } else {
        //     res.status(400).json({
        //         success: false,
        //         message: User.message
        //     })
        // }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: ['register_faile'],
            content: error,
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const User = await userService.getUsers(req.query);
        // console.log(User);
        res.status(200).json({
            success: true,
            message: ['get_user_success'],
            content: User
        })
    } catch (error) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: ['get_user_faile'],
            content: error,
        })
    }
}

exports.editUser = async (req, res) => {
    try {
        const User = await userService.editUser(req.params.id, req.body);
        console.log(User);
        res.status(200).json({
            success: true,
            message: ['edit_user_success'],
            content: User
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: ['edit_user_faile'],
            content: error,
        })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const User = await userService.getUserById(req.params.id);
        console.log(User);
        res.status(200).json({
            success: true,
            message: ['get_user_by_id_success'],
            content: User
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: ['get_user_by_id_faile'],
            content: error,
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const User = await userService.deleteUser(req.params.id);
        console.log(User);
        res.status(200).json({
            success: true,
            message: ['delete_user_success'],
            content: User
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: ['delete_user_faile'],
            content: error,
        })
    }
}
