const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const usersRouter = Router();

usersRouter.get('/', authMiddleware, usersController.getUsers);
usersRouter.get('/current', authMiddleware, usersController.getCurrentUser);
usersRouter.get('/:id', authMiddleware, usersController.getUserById);
usersRouter.delete('/:id', authMiddleware, usersController.deleteUserById);
usersRouter.patch('/:id', authMiddleware, usersController.updateUserById);

module.exports = usersRouter;
