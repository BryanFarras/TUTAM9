const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller.user.js');

router.get('/', userController.getAllUsers);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/:id', userController.updateUserbyID);
router.delete('/:id', userController.deleteUserID);
router.get('/email/:email', userController.getUserbyEmail);

module.exports = router;