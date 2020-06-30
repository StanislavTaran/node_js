const { Router } = require("express");
const contactsController = require("../controllers/contacts.controller");

const contactsRouter = Router();

contactsRouter.get("/", contactsController.getAllContacts);
contactsRouter.get("/:id", contactsController.getContactById);
contactsRouter.post("/", contactsController.addContact);
contactsRouter.delete("/:id", contactsController.deleteContact);
contactsRouter.patch("/:id", contactsController.updateContact);

module.exports = contactsRouter;
