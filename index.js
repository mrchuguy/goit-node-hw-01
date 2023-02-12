const contactsActions = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsActions.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactById = await contactsActions.getContactById(id);
      contactById !== undefined
        ? console.table(contactById)
        : console.log(`Contact with id ${id} not found!`);
      break;

    case "add":
      const addedContact = await contactsActions.addContact(name, email, phone);
      console.log("Added contact:");
      console.table(addedContact);
      break;

    case "remove":
      const removeContact = await contactsActions.removeContact(id);
      if (removeContact !== null) {
        console.log("Removed contact:");
        console.table(removeContact);
      } else {
        console.log(`Contact with id ${id} not found!`);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
