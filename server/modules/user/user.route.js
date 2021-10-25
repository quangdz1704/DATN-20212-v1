const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const { auth, uploadFile } = require('../../middleware/index')

router.post('/', auth, userController.createUser);
router.get("/", userController.getUser);
router.patch("/:id", auth, userController.editUser);
router.get("/:id", auth, userController.getUserById);
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;