import { createContext } from "react";
import {
    LoginType,
    RequestReturn,
    Transaction,
    UserDetailsType,
} from "../../types/requests.types";

export type UserData = {
    id: string;
    balance: number;
    currency: string;
    registerErrorMessage: string;
    loginErrorMessage: string;
    registerRequest: (user: UserDetailsType) => Promise<RequestReturn>;
    loginRequest: (user: LoginType) => Promise<RequestReturn>;
    getTransactions: (
        page: number,
        limit: number,
        status: string
    ) => Promise<RequestReturn>;
    transactions: Transaction[];
    transactionsTotalPages: number;
};

export const UserDataContext = createContext<UserData | null>(null);
