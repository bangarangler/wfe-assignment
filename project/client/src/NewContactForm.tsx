import { useState } from "react";
import { Contact } from "./Contact";
import { Button, TextField } from "@mui/material";
import "./NewContactForm.css";

export default function NewContactForm() {
  const BASE_URL = "http://localhost:3001";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function saveContactData(contact: Contact) {
    const response = await fetch(`${BASE_URL}/contacts`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
  }


  return (
    <>
      <form onSubmit={async (event) => {
        event.preventDefault();

        console.info(event.target);
        const contact: Contact = {
          name: name,
          email: email,
        };
        await saveContactData(contact);
      }}>
        <section>
          <TextField variant="filled" id="name-text-field" name="name" label="Name" value={name} onChange={(evt) => {
            setName(evt.target.value);
          }} />
        </section>
        <section>
          <TextField variant="filled" id="email-text-field" name="email" label="Email" value={email} onChange={(evt) => {
            setEmail(evt.target.value);

          }} />
        </section>
        <Button variant="contained" type="submit">Add Contact</Button>
      </form>
    </>
  );
}
