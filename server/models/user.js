const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String
    },
    surName: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        require: true,
    },
    username: {
        type: String,
    },
    avatar: {
        type: String,
        default: "/upload/avatars/user.png"
    },
    token: [{
        type: String
    }],
    birthday: {
        type: Date
    },
    active: {
        type: Boolean,
    },
    role: {
        // có 2 role Admin, Customer
        type: String,
        default: "CUSTOMER",
        enum: [
            "CUSTOMER",
            "ADMIN",
        ],
    },
}, {timestamps: true})

module.exports = mongoose.model('users', UserSchema);