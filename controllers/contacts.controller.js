const contactsModel = require("../models/contacts.model");

const getAllContacts = async (req, res) => {
  const allContacts = await contactsModel.getListContacts();
  res.status(200).json(allContacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const foundContact = await contactsModel.getContactById(+id);
  foundContact
    ? res.status(200).json(foundContact)
    : res.status(404).json({ message: "Contact not found!" });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await contactsModel.removeContact(+id);
  deletedContact
    ? res.status(200).json({ message: `Contact succesful deleted!` })
    : res.status(404).json({ message: "Contact not found!" });
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const addedContact = await contactsModel.addContact(name, email, phone);
  addedContact
    ? res.status(201).json({ message: `Contact succesful added!` })
    : res.status(500).json({ message: "Error" });
};

// todo the/catch обработать ошибки
const updateContact = async (req, res) => {
  const newContactFields = req.body;
  const { id } = req.params;
  const result = await contactsModel.updateContact(id, newContactFields);

  !result
    ? res.status(404).json({ message: "Contact not found" })
    : res.status(200).json(result);
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
};
