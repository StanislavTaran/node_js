const path = require("path");
const contactsModel = require(path.join(ROOT_PATH, "models", "contacts.model"));

const getAllContacts = async (req, res) => {
  const allContacts = contactsModel.getAllContacts();
  res.status(200).json(allContacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const foundContact = contactsModel.getContactById(id);
  res.status(200).json(foundContact);
};

module.exports = {
  getAllContacts,
};
