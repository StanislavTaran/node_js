const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundedUser = await userModel.getUserById();
    foundedUser
      ? res.status(200).json(foundedUser)
      : res.status(400).json({ succes: false, message: 'User not found!' });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.deleteUserById(id);
    deletedUser
      ? res.status(200).json({ message: `Contact succesful deleted!` })
      : res.status(400).json({ message: 'Contact not found!' });
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateUserById = async (req, res) => {
  const newUserFields = req.body;
  const { id } = req.params;

  if (!newUserFields) {
    return res.status(400).json({ message: 'missing fields' });
  }

  try {
    const result = await userModel.updateUser(id, newUserFields);

    !result ? res.status(404).json({ message: 'User not found' }) : res.status(200).json(result);
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(422).send({ succes: false, error });
    }

    return res.status(400).json(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
};
