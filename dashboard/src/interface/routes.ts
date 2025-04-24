import { RouteProps } from "react-router-dom";

export interface RouteItem {
    base: string;
    id: string;
    adminOnly?: boolean;
}

export interface Routes {
    wildcard: string;
    auth: {
        base: string;
    };
    network: RouteItem;
    tokens: RouteItem;
    customers: RouteItem;
}

export type ProtectedRouteProps = RouteProps & {
    element: React.ReactNode;
    requireAdmin: boolean;
};