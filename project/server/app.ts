import express, { Express, Request, Response } from "express";
import cors from "cors";
import { getAllContacts, addNewContact } from "./contacts";
import { getAllProviders } from "./providers";
import { db } from './db-setup';

const app: Express = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/contacts", (req: Request, res: Response) => {
  const contacts = getAllContacts();
  res.json(contacts);
});

app.post("/contacts", (req: Request, res: Response) => {
  const contact = req.body;
  const result = addNewContact(contact);

  res.status(201).json(result);
});

app.get("/providers", async (req: Request, res: Response) => {
  const providers = await getAllProviders();
  res.json(providers);
});

process.on('exit', async () => {
  await db.close();
});

app.listen(port, () => {
  console.info(`server running at http://localhost:${port}`);
});
