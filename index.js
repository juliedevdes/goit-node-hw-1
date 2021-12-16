//const argv = require("yargs").argv;
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
      console.log(await removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const newContact = {
  name: "Simon Moron",
  email: "moron@email.com",
  phone: "(233) 738-2360",
};

invokeAction({
  action: "add",
  ...newContact,
});

//invokeAction({ action: "list" });
