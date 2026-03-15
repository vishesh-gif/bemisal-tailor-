import { BUCKET_ID } from "./appwrite.config";
import { storage } from "./client";
import { ID } from "appwrite";

const storageService = {
  async upload_Bill_Image(file) {
    try {
      return await storage.createFile(BUCKET_ID, ID.unique(), file);
    } catch (error) {
      throw error;
    }
  },
  async get_Bill_Image(fileId) {
    if (!fileId) return null;
    return storage.getFileView(BUCKET_ID, fileId);
  },
  async delete_Bill_Image(fileId) {
    try {
      await storage.deleteFile(BUCKET_ID, fileId);
    } catch (error) {
      throw error;
    }
  },
};

export default storageService;
