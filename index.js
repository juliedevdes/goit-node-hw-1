const argv = require("yargs").argv;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./db/contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await listContacts());
      break;

    case "get":
      console.log(await getContactById(id));
      break;

    case "add":
      await addContact(name, email, phone)
        .then((newContact) => {
          console.log(
            `${newContact.name} successfully added to contacts.json :) `
          );
        })
        .catch((e) => {
          console.log(`Error occured: ${e.message}`);
        });
      break;

    case "remove":
      await removeContact(id)
        .then((contactToDelete) => {
          console.log(`${contactToDelete.name} was removed from contacts.json`);
        })
        .catch((e) => {
          console.log(`There is no contact with reqested id or ${e.message}`);
        });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
