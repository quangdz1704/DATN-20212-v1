const AuthService = require('./auth.services');

exports.register = async (req, res) => {
    try {
        console.log("show my body ", req.body);

        const User = await AuthService.register(req.body);
        console.log(User);
        if (User.success) {
            res.status(200).json({
                success: true,
                message: ['register_success'],
                content: User
            })
        } else {
            res.status(400).json({
                success: false,
                message: User.message
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: ['register_faile'],
            content: error,
        })
    }
}

exports.login = async (req, res) => {
    try {
        const User = await AuthService.login(req.body);
        console.log(User);
        if (User.success) {
            res.status(200).json({
                success: true,
                message: ['login_success'],
                content: User
            })
        } else {
            res.status(400).json({
                success: false,
                message: User.message
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: ['login_faile'],
            content: error,
        })
    }
}


exports.logout = async (req, res) => {
    try {
        var logout = await AuthService.logout(req.user._id, req.body.token);
        console.log('logout-success', logout);
        res.status(200).json({
            success: true,
            messages: ['logout_success'],
        });
    } catch (error) {
        console.log('err', error);
        res.status(400).json({
            success: false,
            message: ['logout_faile'],
            content: error,
        });
    }
};

exports.changeInformation = async (req, res) => {

    //  try {
    let avatar;
    if (req.file) {
        let path = req.file.destination + '/' + req.file.filename;
        console.log("path", path)
        avatar = path.substr(1, path.length)
    }
    console.log("re", req.body)
    const profile = await AuthService.changeInformation(req.user._id, req.body, avatar);

    res.status(200).json({
        success: true,
        messages: ['change_user_information_success'],
        content: profile
    });
    // } catch (error) {

    //     res.status(400).json({
    //         success: false,
    //         messages: Array.isArray(error) ? error : ['change_user_information_faile'],
    //         content: error
    //     });
    // }
};


exports.changeAvatar = async (req, res) => {

    try {
        let avatar;
        if (req.file) {
            let path = req.file.destination + '/' + req.file.filename;
            avatar = path.substr(1, path.length)
        }
        console.log("avta", avatar)
        const profile = await AuthService.changeAvatar(req.user._id, req.body.content, avatar);

        res.status(200).json({
            success: true,
            messages: ['change_avatar_success'],
            content: profile
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: Array.isArray(error) ? error : ['change_avatar_faile'],
            content: error
        });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await AuthService.getProfile(req.params.id);

        res.status(200).json({
            success: true,
            messages: ['show_profile_success'],
            content: profile
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: Array.isArray(error) ? error : ['show_profile_faile'],
            content: error
        });
    }
};
exports.getUser = async (req, res) => {
    try {
        const profile = await AuthService.getUser(req.user._id);

        res.status(200).json({
            success: true,
            messages: ['get_user_success'],
            content: profile
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: Array.isArray(error) ? error : ['get_user_faile'],
            content: error
        });
    }
};

// exports.getNotifications = async (req, res) => {
//     try {
//         const notification = await AuthService.getNotifications(req.user._id);

//         res.status(200).json({
//             success: true,
//             messages: ['get_notifications_success'],
//             content: notification
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             messages: Array.isArray(error) ? error : ['get_notifiactions_faile'],
//             content: error
//         });
//     }
// };
