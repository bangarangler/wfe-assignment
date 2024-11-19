import Handlebars from "handlebars";

const TEMPLATE = `
<h1>New Customer Added</h1>
<p>A new customer has registered for the app with the following contact information:</p>
<ul>
  <li>Name: {{name}}</li>
  <li>Email: {{email}}</li>
  <li>Phone Number: {{phoneNumber}}</li>
  <li>State: {{state}}</li>
  <li>Company: {{company}}</li>
</ul>
`;

// Notes on this and duplicate types in the NOTES-FOR-TEAM.md
export interface Contact {
  name: string;
  email: string;
  phoneNumber: string;
  state: keyof typeof USStates | "";
  company: string;
}

const contacts: Array<Contact> = [
  {
    name: "Alice",
    email: "alice@example.com",
    phoneNumber: "(123) 456-7890",
    state: "CA",
    company: "Acme, Inc.",
  },
  {
    name: "Bob",
    email: "bob@example.com",
    phoneNumber: "123-456-7890",
    state: "NY",
    company: "Widgets, LLC",
  },
];

export function getAllContacts(): Array<Contact> {
  return contacts;
}

export function addNewContact(contact: Contact): Contact {
  contacts.push(contact);
  notifyContactAdded(contact);
  return contact;
}

function notifyContactAdded(contact: Contact) {
  const template = Handlebars.compile(TEMPLATE);
  const emailMessage = template(contact);
  sendMail(emailMessage);
}

function sendMail(message: string) {
  // NOTE: pretend that this function actually sends an email to marketing
  console.info(`Sending Email to Marketing:\n${message}`);
}

enum USStates {
  AL = "Alabama",
  AK = "Alaska",
  AZ = "Arizona",
  AR = "Arkansas",
  CA = "California",
  CO = "Colorado",
  CT = "Connecticut",
  DE = "Delaware",
  FL = "Florida",
  GA = "Georgia",
  HI = "Hawaii",
  ID = "Idaho",
  IL = "Illinois",
  IN = "Indiana",
  IA = "Iowa",
  KS = "Kansas",
  KY = "Kentucky",
  LA = "Louisiana",
  ME = "Maine",
  MD = "Maryland",
  MA = "Massachusetts",
  MI = "Michigan",
  MN = "Minnesota",
  MS = "Mississippi",
  MO = "Missouri",
  MT = "Montana",
  NE = "Nebraska",
  NV = "Nevada",
  NH = "New Hampshire",
  NJ = "New Jersey",
  NM = "New Mexico",
  NY = "New York",
  NC = "North Carolina",
  ND = "North Dakota",
  OH = "Ohio",
  OK = "Oklahoma",
  OR = "Oregon",
  PA = "Pennsylvania",
  RI = "Rhode Island",
  SC = "South Carolina",
  SD = "South Dakota",
  TN = "Tennessee",
  TX = "Texas",
  UT = "Utah",
  VT = "Vermont",
  VA = "Virginia",
  WA = "Washington",
  WV = "West Virginia",
  WI = "Wisconsin",
  WY = "Wyoming",
}
