const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
      default: "free",
      trim: true,
    },
  },
  { versionKey: false }
);

class Contact {
  constructor() {
    this.contact = mongoose.model("Contact", contactSchema);
  }

  getListContacts = async (query = {}) => {
    return await this.contact.aggregate([{ $unset: ["password"] }]);
  };

  getContactById = async (contactId) => {
    return ObjectId.isValid(contactId)
      ? await this.contact.findById(contactId)
      : null;
  };

  removeContact = async (contactId) => {
    return ObjectId.isValid(contactId)
      ? await this.contact.findByIdAndDelete(contactId)
      : null;
  };

  addContact = async (contact) => {
    return await this.contact.create(contact);
  };

  updateContact = async (contactId, newData) => {
    return await this.contact.findByIdAndUpdate(contactId, newData, {
      new: true,
    });
  };
}

module.exports = new Contact();
