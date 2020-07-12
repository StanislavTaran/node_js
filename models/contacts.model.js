const mongoose = require("mongoose");

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
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { versionKey: false }
);

class Contact {
  constructor() {
    this.contact = mongoose.model("Contact", contactSchema);
  }
}

const getListContacts = async (query = {}) => {
  await this.contact
    .find(query)
    .then((res) => {
      return JSON.parse(res);
    })
    .catch((error) => {
      throw error;
    });

  return contacts;
};

const getContactById = async (contactId) => {
  const allContacts = await getListContacts();
  const foundContact = allContacts.find((contact) => contact.id === +contactId);

  return foundContact;
};

const removeContact = async (contactId) => {
  const allContacts = await getListContacts();
  const foundContact = await allContacts.find(
    (contact) => contact.id === +contactId
  );

  if (foundContact) {
    const newListContacts = await allContacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs
      .writeFile(contactsPath, JSON.stringify(newListContacts))
      .then(() => {
        console.log(`\x1B[34m File with ID - ${contactId} - removed! \x1b[0m`);
      })
      .catch((error) => {
        throw error;
      });
  } else console.log(`\x1B[31m Contact not found! \x1b[0m`);
  return foundContact;
};

const addContact = async (name, email, phone) => {
  const allContacts = await getListContacts();
  const newId = [...allContacts].pop().id + 1;
  const createdContact = new Contact({ name, email, phone }, newId);
  allContacts.push(createdContact);
  await fs
    .writeFile(contactsPath, JSON.stringify(allContacts))
    .then(() => {
      console.log(`\x1B[32m Added contact ${name}! \x1b[0m`, createdContact);
    })
    .catch((error) => {
      throw error;
    });
  return createdContact;
};

const updateContact = async (id, value) => {
  const contacts = (await getListContacts()) || [];
  const contact = (await getContactById(id)) || null;

  if (contact) {
    const newContact = { ...contact, ...value };
    const newContacts = contacts.map((contact) =>
      contact.id !== newContact.id ? contact : newContact
    );

    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContact;
  }
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
