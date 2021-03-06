const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const { builtinModules } = require("module");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath));
}

async function getContactById(contactId) {
  const contactsArray = await listContacts();
  const contact = contactsArray.find(
    (contact) => contact.id === JSON.stringify(contactId)
  );
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
  const contactsArray = await listContacts();

  const index = contactsArray.findIndex(
    (contact) => contact.id === JSON.stringify(contactId)
  );

  if (index === -1) {
    return null;
  }

  const deletedContact = contactsArray.splice(index, 1)[0];
  const clerearedContacts = contactsArray;

  await fs.writeFile(contactsPath, JSON.stringify(clerearedContacts, null, 2));

  return deletedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
