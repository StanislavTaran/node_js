const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const authValidator = require('../middlewares/auth.validation');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { avatarUploader } = require('../middlewares/defaultAvatarGenerator.middleware');

const authRouter = Router();

authRouter.post(
  '/signup',
  authValidator.validateSignUpMiddleware,
  avatarUploader,
  authController.signupUser,
);
authRouter.get('/verify/:verificationToken', authController.verifyEmail);
authRouter.post('/login', authValidator.validateLogInMiddleware, authController.loginUser);
authRouter.post('/logout', authMiddleware, authController.logoutUser);

module.exports = authRouter;
