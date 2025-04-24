import { DID, DIDRequest, DIDState } from "@/interface/blockchain";
import { createCustomerDID, getCustomerDIDs } from "@/services/blockchain";
import { create } from "zustand";

const useDID = create<DIDState>((set) => ({
  loading: false,
  dids: null,
  error: null,
  setLoading: (loading: boolean) => set({ loading }),
  setDIDs: (dids: DID[]) => set({ dids }),
  setError: (error: string | null) => set({ error }),
}));


export const useFetchDIDs = () => {
    const { loading, setLoading, dids, setDIDs, error, setError } = useDID();

    const fetchDIDs = async () => {
        if (dids || loading || error) return;
        try {
        setLoading(true);
        // Fetch DIDs from the API
        const data = await getCustomerDIDs();
        setDIDs(data);
        } catch (error) {
        setError(
            error instanceof Error ? error.message : "Error fetching dids"
        );
        } finally {
        setLoading(false);
        }
    };

    return { fetchDIDs, loading, dids, error };
}

export const usePostDID = () => {
    const { loading, setLoading, dids, setDIDs, error, setError } = useDID();

    const postDID = async (body: DIDRequest) => {
        try {
        setLoading(true);
        const data = await createCustomerDID(body);
        const newDIDs = dids ? [...dids, data] : [data];
        setDIDs(newDIDs);
        return data;
        } catch (error) {
        setError(
            error instanceof Error ? error.message : "Error fetching dids"
        );
        } finally {
        setLoading(false);
        }
    };

    return { postDID, loading, dids, error };
}