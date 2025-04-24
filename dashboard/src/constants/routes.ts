import { Routes } from "@/interface/routes";

export const routes: Routes = {
  wildcard: "*",
  auth: {
    base: "/auth",
  },
  network: {
    base: "/network",
    id: "/network/:networkId",
    adminOnly: false,
  },
  tokens: {
    base: "/tokens",
    id: "/tokens/:tokenId",
    adminOnly: false,
  },
  customers: {
    base: "/customers",
    id: "/customers/:customerId",
    adminOnly: false,
  },
};

export enum RoutesIdsEnum {
  organizationId = ":organizationId",
  networkId = ":networkId",
  tokenId = ":tokenId",
  customerId = ":customerId",
}

export enum AuthTypeEnum {
    login = "login",
    register = "register",
}