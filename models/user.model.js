const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  subscription: {
    type: String,
    enum: ['free', 'pro', 'premium'],
    default: 'free',
  },
  token: String,
});

class User {
  constructor() {
    this.user = mongoose.model('user', userSchema);
  }

  getUsers = async (query = {}) => {
    return await this.user
      .find(query)
      .then(docs => docs)
      .catch(error => {
        throw error;
      });
  };

  getUserById = async id => {
    if (ObjectId.isValid(contactId)) {
      return await this.user
        .findById(id)
        .then(doc => doc)
        .catch(error => {
          throw error;
        });
    }
    throw { message: 'Invalid user id' };
  };

  createUser = async data => {
    return await this.user
      .create(data)
      .then(doc => doc)
      .catch(error => {
        throw error;
      });
  };

  deleteUserById = async id => {
    if (ObjectId.isValid(contactId)) {
      return await this.user
        .findByIdAndDelete(id)
        .then(res => res)
        .catch(error => {
          throw error;
        });
    }
    throw { message: 'Invalid user id' };
  };

  updateUser = async (id, data) => {
    if (ObjectId.isValid(contactId)) {
      this.user
        .findByIdAndUpdate(id, data, { new: true })
        .then(doc => doc)
        .catch(error => {
          throw error;
        });
    }
    throw { message: 'Invalid user id' };
  };
}

module.exports = new User();