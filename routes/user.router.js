const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const usersRouter = Router();

usersRouter.get('/', authMiddleware.authMiddleware, usersController.getUsers);
usersRouter.get('/:id', authMiddleware.authMiddleware, usersController.getUserById);
usersRouter.delete('/:id', authMiddleware.authMiddleware, usersController.deleteUserById);
usersRouter.patch('/:id', authMiddleware.authMiddleware, usersController.updateUserById);
