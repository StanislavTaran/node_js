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

const signupUser = async (req, res) => {
  const data = req.body;
  try {
    const { password } = data;
    const hashPassword = await bcrypt.hash(password, +process.env.BCRYPT_SALT);
    await userModel.createUser({ ...data, password: hashPassword });

    res.status(201).json({ succes: true, message: 'User succesfully created!' });
  } catch (error) {
    res.status(500).json(error);
  } finally {
    res.end();
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const currentUser = await userModel.getUsers({ email });
    if (!currentUser.length) {
      res.status(400).json({ succes: false, message: `User with email ${email} not found!` });
      return;
    }
    const isEqualPassword = await bcrypt.compare(password, currentUser[0].password);

    if (!isEqualPassword) {
      res.status(400).json({ succes: false, message: `Incorrect password!` });
      return;
    }
    const acces_token = await jwt.sign({ id: currentUser[0]._id }, process.env.PRIVATE_JWT_KEY, {
      expiresIn: '1d',
    });
    res.json({ acces_token: `Bearer ${acces_token}` });
  } catch (error) {
    res.status(500).json(error);
  } finally {
    res.end();
  }
};

module.exports = {
  getUsers,
  signupUser,
  loginUser,
};
