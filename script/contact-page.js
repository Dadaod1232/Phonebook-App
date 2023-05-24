/* let contactDataBase = JSON.parse(localStorage.getItem("contactsData")) || [];
// console.log("My Student Database", contactDataBase);

const headingOne = document.getElementById("#nameholder");
const headingTwo = document.getElementById("#phoneholder");

function contactPage(contact) {
  headingOne.textContent = `${contact.firstName} ${contact.lastName}`;
  headingTwo.textContent = `${contact.phone}`;
}

renderContacts(contactDataBase);
*/

//************************** */

// Retrieve contact data from local storage
const storedContact = JSON.parse(localStorage.getItem("selectedContact"));

// Render the contact details
const contactNameElement = document.querySelector("#contact-name");
const contactPhoneElement = document.querySelector("#contact-phone");

if (storedContact) {
  contactNameElement.textContent =
    storedContact.firstName + " " + storedContact.lastName;
  contactPhoneElement.textContent = storedContact.phone;
} else {
  // Handle case when no contact data is available
  contactNameElement.textContent = "No contact data found";
  contactPhoneElement.textContent = "";
}

// Clear the stored contact data from local storage
localStorage.removeItem("selectedContact");
