const { Router } = require('express');
const contactsController = require('../controllers/contacts.controller');
const {
  validateCreateContactMiddleware,
  validateUpdateContactMiddleware,
} = require('../middlewares/contacts.validation');

const authMiddleware = require('../middlewares/auth.middleware');
const contactsRouter = Router();

contactsRouter.get('/', authMiddleware.authMiddleware, contactsController.getAllContacts);

contactsRouter.get('/:id', authMiddleware.authMiddleware, contactsController.getContactById);

contactsRouter.post(
  '/',
  authMiddleware.authMiddleware,
  validateCreateContactMiddleware,
  contactsController.addContact,
);

contactsRouter.delete('/:id', authMiddleware.authMiddleware, contactsController.deleteContact);

contactsRouter.patch(
  '/:id',
  authMiddleware.authMiddleware,
  validateUpdateContactMiddleware,
  contactsController.updateContact,
);

module.exports = contactsRouter;
