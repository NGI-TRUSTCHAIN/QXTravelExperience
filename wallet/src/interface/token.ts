export interface Token {
    id: number;
    name: string;
    symbol: string;
    decimals: number;
    total_supply: number;
    mintable: boolean;
    burnable: boolean;
    transferable: boolean;
    active: boolean;
    network_id: number;
    created_at: string | Date;
    updated_at: string | Date | null;
}