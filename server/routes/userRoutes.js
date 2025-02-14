const express = require('express');
const {renderRegisterForm, registerUser, renderLoginForm,loginUser, getUserProfile, logout } = require('../../controllers/userController');
const authMiddleware = require('../../middleware/sessionAuthMiddleware');

const router = express.Router();


router.get('/register', renderRegisterForm)
router.post('/register', registerUser);
router.get('/login', renderLoginForm)
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);
router.get('/logout', authMiddleware, logout);

module.exports = router;


