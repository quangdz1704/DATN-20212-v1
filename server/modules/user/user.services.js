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

exports.createUser = async (data) => {
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
        name: data.name,
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

// // Tạo mới mảng Ví dụ
// exports.createUser = async ( data) => {
//     let newUser;
//     if (data && data.length !== 0) {
//         for (let i = 0; i < data.length; i++) {
//             newUser = await User.create({
//                 exampleName: data[i].exampleName,
//                 description: data[i].description
//             });
//         }
        
//     }

//     let example = await User.findById({ _id: newUser._id });;
//     return example;
// }

// Lấy ra tất cả các thông tin Ví dụ theo mô hình lấy dữ liệu số  1
exports.getUsers = async (data) => {
    let keySearch = {};
    if (data?.exampleName?.length > 0) {
        keySearch = {
            exampleName: {
                $regex: data.exampleName,
                $options: "i"
            }
        }
    }

    let page, perPage;
    page = data?.page ? Number(data.page) : 1;
    perPage = data?.perPage ? Number(data.perPage) : 20;

    let totalList = await User.countDocuments(keySearch);
    let examples = await User.find(keySearch)
        .skip((page - 1) * perPage)
        .limit(perPage);

    return { 
        data: examples, 
        totalList 
    }
}

// Lấy ra một phần thông tin Ví dụ (lấy ra exampleName) theo mô hình dữ liệu số  2
exports.getOnlyUserName = async (data) => {
    let keySearch;
    if (data?.exampleName?.length > 0) {
        keySearch = {
            exampleName: {
                $regex: data.exampleName,
                $options: "i"
            }
        }
    }

    let page, perPage;
    page = data?.page ? Number(data.page) : 1;
    perPage = data?.perPage ? Number(data.perPage) : 20;

    let totalList = await User.countDocuments(keySearch);
    let UserCollection = await User.find(keySearch, { exampleName: 1 })
        .skip((page - 1) * perPage)
        .limit(perPage);

    return { 
        data: UserCollection,
        totalList 
    }
}

// Lấy ra Ví dụ theo id
exports.getUserById = async ( id) => {
    let example = await User.findById({ _id: id });
    if (example) {
        return example;
    }
    return -1;
}

// Chỉnh sửa một Ví dụ
exports.editUser = async ( id, data) => {
    let oldUser = await User.findById(id);
    if (!oldUser) {
        return -1;
    }

    // Cach 2 de update
    await User.findByIdAndUpdate( id , { $set: data });
    let example = await User.findById({ _id: oldUser._id });

    return example;
}

// Xóa một Ví dụ
exports.deleteUser = async ( id) => {
    let example = User.findByIdAndDelete({ _id: id });
    return example;
}