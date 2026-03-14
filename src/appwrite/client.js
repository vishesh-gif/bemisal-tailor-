import { Client, Account, Databases, Storage } from "appwrite";
import { APPWRITE_ENDPOINT, PROJECT_ID } from "./appwrite.config";

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;
