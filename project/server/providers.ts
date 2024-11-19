import { db } from "./db-setup";

export interface Provider {
  id: number;
  name: string;
  portal_url: string | null;
}

export const getAllProviders = async (): Promise<Provider[]> => {
  const result = await db.all<Provider[]>("SELECT * FROM provider");
  return result;
};
