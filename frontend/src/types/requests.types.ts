export type UserDetailsType = {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
};

export type LoginType = {
    email: string;
    password: string;
};

export type Transaction = {
    id: string;
    amount: number;
    type: string;
    createdAt: string;
};

export type Bet = {
    amount: number;
    createdAt: string;
    id: string;
    status: string;
    winAmount?: number;
};

export type RequestReturn = {
    success: boolean;
};
