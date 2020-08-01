const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const { validateUpdateUserMiddleware } = require('../middlewares/users.validaton');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { avatarUploader } = require('../middlewares/avatarUploader.middleware');

const usersRouter = Router();

usersRouter.get('/', authMiddleware, usersController.getUsers);
usersRouter.get('/current', authMiddleware, usersController.getCurrentUser);
usersRouter.get('/:id', authMiddleware, usersController.getUserById);
usersRouter.delete('/:id', authMiddleware, usersController.deleteUserById);
usersRouter.patch('/avatars', authMiddleware, avatarUploader, usersController.updateUserAvatar);
usersRouter.patch(
  '/:id',
  authMiddleware,
  validateUpdateUserMiddleware,
  usersController.updateUserById,
);

module.exports = usersRouter;
