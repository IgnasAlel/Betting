import { createContext } from "react";
import { Bet, RequestReturn } from "../../types/requests.types";

export type BetData = {
    placeBetRequest: (amount: number) => Promise<RequestReturn>;
    getBets: (
        page: number,
        limit: number,
        status: string
    ) => Promise<RequestReturn>;
    betHistory: Bet[];
    betsTotalPages: number;
    placeBetErrorMessage: string;
    getBetsErrorMessage: string;
};

export const BetDataContext = createContext<BetData | null>(null);
