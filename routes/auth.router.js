const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const authValidator = require('../middlewares/auth.validation');
const authRouter = Router();

authRouter.post('/signup', authValidator.validateSignUpMiddleware, authController.signupUser);
authRouter.post('/login', authValidator.validateLogInMiddleware, authController.loginUser);

module.exports = authRouter;
