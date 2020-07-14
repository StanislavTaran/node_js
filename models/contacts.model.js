const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    subscription: {
      type: String,
      default: 'free',
      trim: true,
    },
    token: {
      type: String,
      trim: true,
    },
  },
  { versionKey: false },
);

class Contact {
  constructor() {
    this.contact = mongoose.model('Contact', contactSchema);
  }

  getListContacts = async () => {
    return (await this.contact.aggregate([{ $unset: ['password'] }])) || null;
  };

  getContactById = async contactId => {
    if (ObjectId.isValid(contactId)) {
      return await this.contact
        .findById(contactId)
        .then(doc => doc)
        .catch(err => {
          throw err;
        });
    }
    throw { message: 'Invalid contact id' };
  };

  removeContact = async contactId => {
    if (ObjectId.isValid(contactId)) {
      return await this.contact
        .findByIdAndDelete(contactId)
        .then(res => res)
        .catch(err => {
          console.log(err);
          throw err;
        });
    }
    throw { message: 'Invalid contact id' };
  };

  addContact = async contact => {
    return await this.contact
      .create(contact)
      .then(docs => docs)
      .catch(error => {
        throw error;
      });
  };

  updateContact = async (contactId, newData) => {
    return await this.contact
      .findByIdAndUpdate(contactId, newData, {
        new: true,
      })
      .then(docs => docs)
      .catch(error => {
        throw error;
      });
  };
}

module.exports = new Contact();
