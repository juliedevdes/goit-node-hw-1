const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const { builtinModules } = require("module");
const { writeFile } = require("fs");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath));
}

async function getContactById(contactId) {
  const contactsArray = await listContacts();
  const contact = contactsArray.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }

  return contact;
}

async function addContact(name, email, phone) {
  const newContact = { name, email, phone, id: v4() };
  const contactsArray = await listContacts();
  contactsArray.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));

  return newContact;
}

async function removeContact(contactId) {
  return contactId;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
