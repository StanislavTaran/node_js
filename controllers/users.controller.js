const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

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
    const foundedUser = await userModel.getUserById(id);
    foundedUser
      ? res.status(200).json(foundedUser)
      : res.status(400).json({ succes: false, message: 'User not found!' });
  } catch (error) {
    res.status(500).json(error);
  }
};
const getCurrentUser = async (req, res) => {
  if (!req.currentUser) {
    res.status(401).json({ succes: false, message: 'Not authorized' });
    return;
  }

  const { email, subscription } = req.currentUser;
  res.status(200).json({ email, subscription });
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
  let newUserFields = req.body;
  const { id } = req.params;

  if (!newUserFields) {
    return res.status(400).json({ message: 'missing fields' });
  }

  if (newUserFields.password) {
    const hashPassword = await bcrypt.hash(newUserFields.password, +process.env.BCRYPT_SALT);

    newUserFields = { ...newUserFields, password: hashPassword };
  }

  try {
    const result = await userModel.updateUser(id, newUserFields);

    !result
      ? res.status(404).json({ message: 'User not found' })
      : res.status(200).json({ succes: true, message: 'Updated!', user: result });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(422).send({ succes: false, error });
    }

    return res.status(400).json(error);
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { id } = req.currentUser;
    const { path } = req.file;
    const avatarPath = `${process.env.HOME_URL}/${path.split('\\').slice(1).join('/')}`;
    await userModel.updateUser(id, { avatarUrl: avatarPath });
    res.status(200).json({ succes: true, avatarUrl: avatarPath });
  } catch (error) {
    res.status(400).json(error);
  } finally {
    res.end();
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  getCurrentUser,
  updateUserAvatar,
};
