import { apiEndpoints } from "@/constants/api";
import { DID, DIDRequest } from "@/interface/blockchain";
import { axiosInstance } from "@/lib/api";

export const getCustomerDIDs = async (): Promise<DID[]> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.did.get,
      isPrivate: true,
      headers: {},
    }).get(apiEndpoints.private.did.get);
    return data;
  } catch (error) {
    console.error("Error fetching dids:", error);
    throw error;
  }
}

export const createCustomerDID = async (body: DIDRequest): Promise<DID> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoints.private.did.create,
      isPrivate: true,
      headers: {},
    }).post(apiEndpoints.private.did.create, body);
    return data;
  } catch (error) {
    console.error("Error creating did:", error);
    throw error;
  }
}
