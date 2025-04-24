export interface DID {
    did: string;
    name: string
    valid: boolean;
    created_at: Date | string;
}

export interface DIDRequest {
    name: string;
    did: string;
}

export interface DIDState {
    loading: boolean;
    dids: DID[] | null;
    error: string | null;
    setLoading: (loading: boolean) => void;
    setDIDs: (dids: DID[]) => void;
    setError: (error: string | null) => void;
}