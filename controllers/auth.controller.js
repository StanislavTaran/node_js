const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupUser = async (req, res) => {
  const data = req.body;
  try {
    const { password } = data;
    const hashPassword = await bcrypt.hash(password, +process.env.BCRYPT_SALT);
    const createdUser = await userModel.createUser({ ...data, password: hashPassword });

    res.status(201).json({
      succes: true,
      message: 'User succesfully created!',
      user: {
        email: createdUser.email,
        subscription: createdUser.subscription,
      },
    });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(409).send({ succes: false, message: 'Email in use', error });
    }
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
    res.json({
      acces_token: `Bearer ${acces_token}`,
      user: {
        email: currentUser[0].email,
        subscription: currentUser[0].subscription,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  } finally {
    res.end();
  }
};

module.exports = {
  loginUser,
  signupUser,
};
