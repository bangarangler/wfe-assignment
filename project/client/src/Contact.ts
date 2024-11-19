// Ok I've gone a little fancy here and just wanted to call it out.  We could totally have just used useState -> however wanted to have a conversation about state machines and how you can expand and reason about the code easier with a reducer and thinking about the flow the user is taking or the action the user is taking as opposed to just using state.
//
// I'll stop here so we can discuss but incase you see this and think why complicate it -> I just want to explain I did this to show I can and for more complex components with lots of state mangement it could be a reasonable approach dependig on the complexity and the teams thoughts on reducers and state machines.

export interface Contact {
  name: string;
  email: string;
  phoneNumber: string;
  state: keyof typeof USStates | "";
  company: string;
  phoneError: string | null;
}

export enum ContactActionChoices {
  SET_NAME,
  SET_EMAIL,
  SET_PHONE_NUMBER,
  SET_STATE,
  SET_PHONE_ERROR,
  SET_COMPANY,
  RESETFORM,
}

export type ContactActionType =
  | { type: ContactActionChoices.SET_NAME; payload: string }
  | { type: ContactActionChoices.SET_EMAIL; payload: string }
  | { type: ContactActionChoices.SET_PHONE_NUMBER; payload: string }
  | {
      type: ContactActionChoices.SET_STATE;
      payload: keyof typeof USStates | "";
    }
  | { type: ContactActionChoices.SET_PHONE_ERROR; payload: string | null }
  | { type: ContactActionChoices.SET_COMPANY; payload: string }
  | { type: ContactActionChoices.RESETFORM };

export const initContactState: Contact = {
  name: "",
  email: "",
  phoneNumber: "",
  state: "",
  company: "",
  phoneError: null,
};

export const contactReducer = (
  state: Contact,
  action: ContactActionType,
): Contact => {
  switch (action.type) {
    case ContactActionChoices.SET_NAME:
      return { ...state, name: action.payload };
    case ContactActionChoices.SET_EMAIL:
      return { ...state, email: action.payload };
    case ContactActionChoices.SET_PHONE_NUMBER:
      return { ...state, phoneNumber: action.payload };
    case ContactActionChoices.SET_STATE:
      return { ...state, state: action.payload };
    case ContactActionChoices.SET_COMPANY:
      return { ...state, company: action.payload };
    case ContactActionChoices.SET_PHONE_ERROR:
      return { ...state, phoneError: action.payload };
    case ContactActionChoices.RESETFORM:
      return initContactState;
    default:
      return state;
  }
};

const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

export function validatePhoneNumber(phone: string): boolean {
  return phoneRegex.test(phone);
}

export enum USStates {
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

export function getStateFullName(abbreviation: keyof typeof USStates): string {
  return USStates[abbreviation];
}

console.log(getStateFullName("NC")); // Output: "North Carolina"
console.log(getStateFullName("TX")); // Output: "Texas"

function isValidStateAbbreviation(
  abbreviation: string,
): abbreviation is keyof typeof USStates {
  return abbreviation in USStates;
}

console.log(isValidStateAbbreviation("CA")); // Output: true
console.log(isValidStateAbbreviation("ZZ")); // Output: false

function getAllStates(): { abbreviation: string; fullName: string }[] {
  return Object.entries(USStates).map(([abbreviation, fullName]) => ({
    abbreviation,
    fullName,
  }));
}

console.log(getAllStates());
/* Output:
[
  { abbreviation: 'AL', fullName: 'Alabama' },
  { abbreviation: 'AK', fullName: 'Alaska' },
  ...
]
*/

// Benefits of This Approach
// Type Safety: You can only pass valid abbreviations, preventing errors.
// Readability: The enum clearly associates abbreviations with full names.
// Programmatic Access: You can easily iterate, filter, or validate with enums.
// Notes
// The keyof typeof USStates type ensures you only use valid abbreviations (AL, AK, etc.).
// If you need additional mappings (e.g., region or timezone), you can add them as separate objects or extend the enum logic.
