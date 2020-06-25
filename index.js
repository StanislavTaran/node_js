const yargs = require("yargs");
const contacts = require("./contacts");

// const testContacts = async () => {
//   await contacts.addContact("Valerchik", "Valerchik@mail.com", 0876655432);

//   await contacts.getContactById(11);

//   await contacts.removeContact(11);
// };

yargs
  .number("id")
  .string("name")
  .string("email")
  .string("phone")
  .string("action")
  .alias("action", "a")
  .alias("name", "n")
  .alias("email", "e")
  .alias("phone", "p").argv;

const invokeAction = ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      contacts.listContacts();
      break;

    case "get":
      contacts.getContactById(id);
      break;

    case "add":
      contacts.addContact(name, email, phone);
      break;

    case "remove":
      contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type! \x1b[0m");
  }
};

invokeAction(yargs.argv);
