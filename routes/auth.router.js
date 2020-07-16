const { Router } = require('express');
const userController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.validation');
const authRouter = Router();

authRouter.post('/signup', authMiddleware.validateSignUpMiddleware, userController.signupUser);
authRouter.post('/login', authMiddleware.validateLogInMiddleware, userController.loginUser);

module.exports = authRouter;
