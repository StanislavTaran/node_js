const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid').v4;
const { verifyMail } = require('../utils/email/verifyMail');

const signupUser = async (req, res) => {
  const data = req.body;
  try {
    const { password } = data;
    const hashPassword = await bcrypt.hash(password, +process.env.BCRYPT_SALT);

    const createdUser = await userModel.createUser({
      ...data,
      password: hashPassword,
      verificationToken: uuidv4(),
    });

    await verifyMail(createdUser);
    res.status(201).json({
      succes: true,
      message: 'User succesfully created!',
      user: {
        avatarUrl: createdUser.avatarUrl,
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

const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const currentUser = await userModel.getUsers({ verificationToken });
    if (!currentUser.length) {
      res.status(404).json({ succes: false, message: `User not found!` });
      return;
    }

    await userModel.verifyEmail(currentUser[0]._id);
    res.status(200).json({ succes: true, message: 'Email succesfully verified!' });
  } catch (error) {
    res.status(400).json({ succes: false, error });
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

    await userModel.updateUser(currentUser[0]._id, { token: acces_token });

    res.json({
      acces_token: `Bearer ${acces_token}`,
      user: {
        email: currentUser[0].email,
        subscription: currentUser[0].subscription,
        avatarUrl: currentUser[0].avatarUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ succes: false, error });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { id } = req.currentUser;
    const user = userModel.getUserById(id);
    if (!user) {
      res.status(401).json({ succes: false, message: 'Not authorized' });
      return;
    }

    await userModel.updateUser(id, { token: '' });
    res.status(204);
  } catch (error) {
    res.status(500).json({ succes: false, error });
  } finally {
    res.end();
  }
};

module.exports = {
  loginUser,
  signupUser,
  verifyEmail,
  logoutUser,
};
