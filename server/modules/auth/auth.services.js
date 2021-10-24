const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('./validate');
const User = require("../../models/user");
const fs = require("fs");


/**
 *  API Register
 * @param {} data
 * @body data : phoneNumber, name, password, birth
 *
 * Did validate, check username, email, create new user
 *
 */

exports.register = async (data) => {
    let check = {
        email: data.email,
        password: data.password, // default password: electric123
    }
    const checkValidate = await registerValidation(check);
    if (checkValidate.error) {
        return {
            error: "Validate Error",
            message: checkValidate.error
        }
    }
    const user = await User.findOne({ email: data.email });
    if (user) {
        return {
            message: "Email is exist. Please use other email",
            success: false,
        }
    }


    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    // create new user

    // let splitter = data.birthday.split("-");
    // let dateISO = new Date(splitter[2], splitter[1] - 1, splitter[0])

    let newUser = await User.create({
        // code: text,
        firstName: data.firstName,
        surName: data.surName,
        password: hashPassword,
        // birthday: dateISO,
        email: data.email,
        phone: data.phone,
        role: data.role, // default CUSTOMER
        active: false,
    })

    return {
        newUser,
        success: true
    };
}

exports.login = async (data) => {

    // check validate data
    const checkValidate = loginValidation(data);
    if (checkValidate.error) {
        return {
            status: 400,
            message: "validation error",
            error: checkValidate.error
        }
    }

    //check username, password

    const user = await User.findOne({ email: data.email });
    if (!user) {
        return {
            status: 404,
            message: "Email or password is wrong"
        }
    }
    const checkPassword = await bcrypt.compare(data.password, user.password);
    if (checkPassword) {
        const token = await jwt.sign({
            _id: user._id,
        },
            process.env.TOKEN_SECRET
        );

        user.token.push(token);
        user.save()

        let payload = {
            _id: user._id,
            active: user.active,
            firstName: user.firstName,
            surName: user.surName,
            token: token,
            avatar: user.avatar,
            phone: user.phone,
            role: user.role
        };
        return {
            payload: payload,
            success: true,
        }
    }
    else {
        return {
            status: 400,
            message: "password is wrong"
        }
    }

}

exports.logout = async (id, token) => {
    var user = await User.findById(id);
    var position = await user.token.indexOf(token);
    user.token.splice(position, 1);
    user.save();
    return user;
}

exports.changeInformation = async (
    id,
    data,
    avatar = undefined
) => {
    const { firstName, surName, birthday, gender } = data;
    let user = await User.findById(id).select("-password")

    let deleteAvatar = "." + user.avatar;
    if (avatar) {
        if (
            deleteAvatar !== "./upload/avatars/user.png" &&
            fs.existsSync(deleteAvatar)
        )
            fs.unlinkSync(deleteAvatar);
        user.avatar = avatar;
    }
    user.firstName = firstName;
    user.surName = surName;
    // let splitter = birthday.split("-");
    // let dateISO = new Date(splitter[2], splitter[1] - 1, splitter[0])
    // user.birthday = dateISO;
    // user.gender = gender ? gender : user.gender;

    await user.save();

    return user;
};

exports.changeAvatar = async (
    id,
    content,
    avatar = undefined
) => {

    let user = await User.findById(id).populate([
        { path: "listfriends", select: "id active firstName surName avatar createdAt" },
    ]);
    let deleteAvatar = "." + user.avatar;
    let post, newPost;
    if (avatar) {
        // if (
        //     deleteAvatar !== "./upload/avatars/user.png" &&
        //     fs.existsSync(deleteAvatar)
        // )
        // fs.unlinkSync(deleteAvatar);
        user.avatar = avatar;
        
    }
    await user.save();

    return { user, post: newPost };
};

exports.getProfile = async (id) => {
    let user = await User.findById(id)
        .select("-password -active")
        // console.log(123, user);
    if (user === null) throw ["user_not_found"];

    return user;
};

exports.getUser = async (id) => {
    let user = await User.findById(id)
        .select("id active firstName surName avatar createdAt")
    if (user === null) throw ["user_not_found"];
    return user;
};