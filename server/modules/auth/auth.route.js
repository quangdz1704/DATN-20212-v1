const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { auth, uploadFile } = require('../../middleware/index')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get("/logout", auth, authController.logout);
router.patch("/profile/:id/change-information", auth, uploadFile([{ name: 'avatar', path: '/avatars' }], 'single'), authController.changeInformation)
router.get("/get-profile/:id", authController.getProfile);
router.patch("/profile/change-avatar", auth, uploadFile([{ name: 'avatar', path: '/avatars' }], 'single'), authController.changeAvatar)
router.get("/get-user", auth, authController.getUser);
module.exports = router;