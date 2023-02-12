const fs = require("fs").promises,
  path = require("node:path"),
  { v4 } = require("uuid");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id == contactId);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const changedContacts = contacts.filter(({ id }) => id != contactId);
    if (changedContacts.length === contacts.length) {
      return null;
    } else {
      updateSourceFile(changedContacts);
      return contacts.filter(({ id }) => id == contactId);
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: v4(), name: name, email: email, phone: phone };
    const allContacts = await listContacts();
    const changedCollection = [...allContacts, newContact];
    updateSourceFile(changedCollection);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

async function updateSourceFile(instance) {
  try {
    fs.writeFile(contactsPath, JSON.stringify(instance, null, 2));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
