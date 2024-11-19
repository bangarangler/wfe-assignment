import { useReducer } from "react";
import { Contact, ContactActionChoices, contactReducer, initContactState, USStates, validatePhoneNumber } from "./Contact";
import { Button, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./NewContactForm.css";

export default function NewContactForm() {
  const BASE_URL = "http://localhost:3001";

  const [state, dispatch] = useReducer(contactReducer, initContactState);
  const { name, email, phoneNumber, company } = state;


  type SanitizedContact = Omit<Contact, "phoneError">;

  async function saveContactData(contact: SanitizedContact) {
    const response = await fetch(`${BASE_URL}/contacts`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    if (response.ok) {
      console.log("Contact saved successfully");
      dispatch({ type: ContactActionChoices.RESETFORM });
    } else {
      console.error("Failed to save contact");
      // add more elaborate error handling here. stopping as it is a assignment and don't want to go to far (reasonable time constraints)  However setting up the reducer would allow us to extend the UI error logic in many ways and standardize on how we handle displaying front end errors to the user -> perhaps with a toast message or however we want to display them to a user.
    }
  }


  return (
    <>
      <form onSubmit={async (event) => {
        event.preventDefault();
        if (!validatePhoneNumber(state.phoneNumber)) {
          dispatch({
            type: ContactActionChoices.SET_PHONE_ERROR,
            payload: "Invalid phone number. Use (123) 456-7890 or 123-456-7890.",
          });
          return;
        }

        dispatch({ type: ContactActionChoices.SET_PHONE_ERROR, payload: null });

        // Remove phoneError from the contact object before saving
        const { phoneError, ...sanitizedContact } = state;
        const contact: SanitizedContact = sanitizedContact;
        console.log("contact", contact);
        await saveContactData(contact);
      }}>
        <section>
          <TextField variant="filled" id="name-text-field" name="name" label="Name" value={name} onChange={(evt) => dispatch({ type: ContactActionChoices.SET_NAME, payload: evt.target.value })} />
        </section>
        <section>
          <TextField variant="filled" id="email-text-field" name="email" label="Email" value={email} onChange={(evt) => dispatch({ type: ContactActionChoices.SET_EMAIL, payload: evt.target.value })} />
        </section>
        <section>
          <TextField variant="filled" id="phoneNumber-text-field" name="phoneNumber" label="Phone Number" value={phoneNumber} onChange={(evt) => dispatch({ type: ContactActionChoices.SET_PHONE_NUMBER, payload: evt.target.value })} />
        </section>
        <section>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="state-select-label">State</InputLabel>
            <Select
              labelId="state-select-label"
              id="state-select"
              value={state.state || ""}
              onChange={(evt) => dispatch({ type: ContactActionChoices.SET_STATE, payload: evt.target.value as keyof typeof USStates })}
            >
              {Object.entries(USStates).map(([abbreviation, fullName]) => (
                <MenuItem key={abbreviation} value={abbreviation}>
                  {`${abbreviation} - ${fullName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </section>
        <section>
          <TextField variant="filled" id="company-text-field" name="company" label="Company" value={company} onChange={(evt) => dispatch({ type: ContactActionChoices.SET_COMPANY, payload: evt.target.value })} />
        </section>
        <Button variant="contained" type="submit">Add Contact</Button>
      </form>
    </>
  );
}
