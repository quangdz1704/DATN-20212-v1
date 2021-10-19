const multer = require("multer");
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

const auth = async (req, res, next) => {
    try {

        const token = req.header("auth-token");
        console.log('auth-token', token);
        if (!token) throw ["access_denied"];

        let verified;
        try {
            verified = await jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (error) {
            throw ["access_denied"];
        }

        req.user = verified;
        req.token = token;
        next();
    } catch (error) {
        console.log('eeeeeeeeeeee');
        res.status(400).json({
            success: false,
            message: "Invalid token!!",
        });
    }
}

const uploadFile = (arrayFile, type) => {
    const staticPath = [
        '/avatars',
        '/posts',
        '/comments'
    ]

    let getFile = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                if (type === "single" || type === "array") {
                    if (staticPath.includes(arrayFile[0].path)) {
                        cb(null, `./upload${arrayFile[0].path}`)
                    }
                } else if (type === "field") {
                    for (let i in arrayFile) {
                        if (staticPath.indexOf(arrData[i].path) !== -1) {
                            cb(null, `./upload${arrData[i].path}`);
                        }
                    }
                }
            },
            filename: (req, file, cb) => {

                let extend = file.originalname.split(".");
                let oldNameFile = extend.splice(0, extend.length - 1);
                oldNameFile = oldNameFile.join(".");
                let hash =
                    `${req.user._id}_${Date.now()}_` +
                    CryptoJS.MD5(oldNameFile).toString();
                cb(null, `${hash}.${extend[extend.length - 1]}`);

            }
        })
    })

    switch (type) {
        case 'single':
            name = arrayFile[0].name;
            return getFile.single(name);
        case 'array':
            name = arrayFile[0].name;
            return getFile.array(name, 20);

        default:
            break;
    }
}

module.exports = {
    auth,
    uploadFile
}