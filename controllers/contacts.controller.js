const contactsModel = require('../models/contacts.model');

const getAllContacts = async (req, res) => {
  try {
    const allContacts = await contactsModel.getListContacts();
    allContacts
      ? res.status(200).json(allContacts)
      : res.status(400).json({ message: 'Contacts not found!' });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const foundContact = await contactsModel.getContactById(id);
    foundContact
      ? res.status(200).json(foundContact)
      : res.status(400).json({ message: 'Contact not found!' });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await contactsModel.removeContact(id);
    deletedContact
      ? res.status(200).json({ message: `Contact succesful deleted!` })
      : res.status(400).json({ message: 'Contact not found!' });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addContact = async (req, res) => {
  const contact = req.body;
  try {
    const addedContact = await contactsModel.addContact(contact);
    addedContact
      ? res.status(201).json(addedContact)
      : res.status(500).json({ message: 'Something went wrong, please try later.' });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(422).send({ succes: false, error });
    }

    return res.status(400).json(error);
  }
};

const updateContact = async (req, res) => {
  const newContactFields = req.body;
  const { id } = req.params;

  if (!newContactFields) {
    return res.status(400).json({ message: 'missing fields' });
  }

  try {
    const result = await contactsModel.updateContact(id, newContactFields);

    !result ? res.status(404).json({ message: 'Contact not found' }) : res.status(200).json(result);
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(422).send({ succes: false, error });
    }

    return res.status(400).json(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
};
