import React, { useCallback, useEffect, useState } from "react";
import { UserDataContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
    LoginType,
    Transaction,
    UserDetailsType,
} from "../../types/requests.types";

const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
    const socket = io("http://localhost:5000");
    const navigate = useNavigate();
    const checkSessionToken = useCallback(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/start");
        }
    }, [navigate]);

    const [userData, setUserData] = useState({
        balance: 0,
        id: "",
        currency: "EUR",
    });
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [registerErrorMessage, setRegisterErrorMessage] = useState("");
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    const [transactionsTotalPages, setTransactionsTotalPages] = useState(0);

    const registerRequest = async (user: UserDetailsType) => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(user),
            };
            const response = await fetch(
                "http://localhost:3000/register",
                options
            );
            const data = await response.json();

            if (!response.ok) {
                setRegisterErrorMessage(data.message);
                return { success: false };
            }

            setRegisterErrorMessage("");
            return { success: true };
        } catch (e) {
            setRegisterErrorMessage(e.message);
            return { success: false };
        }
    };

    const loginRequest = async (user: LoginType) => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(user),
            };
            const response = await fetch(
                "http://localhost:3000/login",
                options
            );
            const data = await response.json();
            if (!response.ok) {
                setLoginErrorMessage(data.message);
                return { success: false };
            }
            setUserData({
                balance: data.balance,
                id: data.id,
                currency: data.currency,
            });
            sessionStorage.setItem("token", data.accessToken);
            setLoginErrorMessage("");
            return { success: true };
        } catch (e) {
            setLoginErrorMessage(e.message);
            return { success: false };
        }
    };

    const getTransactions = useCallback(
        async (page: number, limit: number, status: string) => {
            try {
                checkSessionToken();
                const options = {
                    headers: {
                        "content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                };
                const params = new URLSearchParams({
                    id: "",
                    type: status,
                    page: page.toString(),
                    limit: limit.toString(),
                });
                const response = await fetch(
                    "http://localhost:3000/my-transactions?" + params,
                    options
                );
                const data = await response.json();
                if (!response.ok) {
                    if (response.status === 401) return navigate("/start");
                    return { success: false };
                }
                setTransactionsTotalPages(Math.ceil(data.total / limit));

                setTransactions(data.data);
                return { success: true };
            } catch (e) {
                return { success: true };
            }
        },
        [checkSessionToken, navigate]
    );

    const getUserDetails = useCallback(async () => {
        try {
            checkSessionToken();
            const options = {
                headers: {
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            };
            const response = await fetch("http://localhost:3000/user", options);
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 401) return navigate("/start");
                return { success: false };
            }
            setUserData({
                balance: data.balance,
                id: data.id,
                currency: data.currency,
            });
            return { success: true };
        } catch (e) {
            return { success: false };
        }
    }, [checkSessionToken, navigate]);

    useEffect(() => {
        getUserDetails();
    }, [getUserDetails]);

    useEffect(() => {
        socket.on("checkBalance", (data) => {
            setUserData((prev) => ({ ...prev, balance: data }));
        });

        return () => {
            socket.off("checkBalance");
        };
    }, [socket]);

    return (
        <UserDataContext.Provider
            value={{
                ...userData,
                registerRequest,
                registerErrorMessage,
                loginErrorMessage,
                loginRequest,
                getTransactions,
                transactions,
                transactionsTotalPages,
            }}
        >
            {children}
        </UserDataContext.Provider>
    );
};

export { UserDataProvider };
