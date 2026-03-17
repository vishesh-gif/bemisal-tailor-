import { DATABASE_ID, BILL_INFORMATION, BUCKET_ID } from "./appwrite.config";
import { databases } from "./client";
import { ID, Query } from "appwrite";

const customerService = {
  async create_Customer(userId, data) {
    console.log(data);
    try {
      return databases.createDocument(
        DATABASE_ID,
        BILL_INFORMATION,
        ID.unique(),
        {
          name: data.name,
          phoneNumber: data.phoneNumber,
          billNumber: data.billNumber,
          bill_image_id: data.bill_image_id,
          public_id: data.public_id,
          userId: userId,
        },
      );
    } catch (error) {
      console.log(error);
    }
  },
  async get_Customer_details(detailId) {
    try {
      return await databases.getDocument(
        DATABASE_ID,
        BILL_INFORMATION,
        detailId,
      );
    } catch (error) {
      return null;
    }
  },
  async get_Customers_detail(userId) {
    try {
      return await databases.listDocuments(DATABASE_ID, BILL_INFORMATION);
    } catch (error) {
      return null;
    }
  },

  async delete_Customer(customerId) {
    try {
      databases.deleteDocument(DATABASE_ID, BILL_INFORMATION, customerId);
      return true;
    } catch (error) {
      return false;
    }
  },

  async updateApplication(applicationId, data) {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        BILL_INFORMATION,
        applicationId,
        data,
      );
    } catch (error) {
      throw error;
    }
  },
  async search_Customer(phoneNumber) {
    try {
      // let queries = [];
      // if (mobile) {
      //   queries.push(Query.equal("mobile", mobile));
      // }
      // if (billNo) {
      //   queries.push(Query.equal("billNo", billNo));
      // }

      return await databases.listDocuments(DATABASE_ID, BILL_INFORMATION, [
        Query.startsWith("phoneNumber", phoneNumber),
      ]);
    } catch (error) {
      console.log(error);
    }
  },
};

export default customerService;
