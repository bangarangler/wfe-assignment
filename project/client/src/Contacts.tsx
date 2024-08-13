import { Typography } from "@mui/material";
import ContactList from "./ContactList";
import NewContactForm from "./NewContactForm";

export default function Contacts() {
  return (
    <>
      <main>
        <section>
          <Typography className="page-header" variant="h4" component="h2">All Contacts</Typography>
          <ContactList />
        </section>
        <section>
          <Typography className="page-header" variant="h4" component="h2">New Contact Form</Typography>
          <NewContactForm />
        </section>
      </main>
    </>
  );
}
