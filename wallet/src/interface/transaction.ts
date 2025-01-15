export interface Transaction {
    id: number;
    tx_hash: string;
    from_address: string;
    to_address: string;
    value: number;
    gas_price: number;
    gas_used: number;
    status: boolean
    data: string;
    token: number;
    reward: number | null;
    customer: number;
    created_at: string | Date;
}