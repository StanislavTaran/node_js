const { Router } = require('express');
const contactsController = require('../controllers/contacts.controller');
const {
  validateCreateContactMiddleware,
  validateUpdateContactMiddleware,
} = require('../middlewares/contacts.validation');

const contactsRouter = Router();

contactsRouter.get('/', contactsController.getAllContacts);

contactsRouter.get('/:id', contactsController.getContactById);

contactsRouter.post('/', validateCreateContactMiddleware, contactsController.addContact);

contactsRouter.delete('/:id', contactsController.deleteContact);

contactsRouter.patch('/:id', validateUpdateContactMiddleware, contactsController.updateContact);

module.exports = contactsRouter;
