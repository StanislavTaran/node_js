const { Router } = require('express');
const contactsController = require('../controllers/contacts.controller');
const {
  validateCreateContactMiddleware,
  validateUpdateContactMiddleware,
} = require('../middlewares/contacts.validation');

const { authMiddleware } = require('../middlewares/auth.middleware');
const contactsRouter = Router();

contactsRouter.get('/', authMiddleware, contactsController.getAllContacts);

contactsRouter.get('/:id', authMiddleware, contactsController.getContactById);

contactsRouter.post(
  '/',
  authMiddleware,
  validateCreateContactMiddleware,
  contactsController.addContact,
);

contactsRouter.delete('/:id', authMiddleware, contactsController.deleteContact);

contactsRouter.patch(
  '/:id',
  authMiddleware,
  validateUpdateContactMiddleware,
  contactsController.updateContact,
);

module.exports = contactsRouter;
