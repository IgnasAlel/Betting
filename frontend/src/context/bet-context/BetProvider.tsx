import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BetDataContext } from "./BetContext";
import { io } from "socket.io-client";

const BetDataProvider = ({ children }: { children: React.ReactNode }) => {
    const socket = io("http://localhost:5000");
    const navigate = useNavigate();
    const [placeBetErrorMessage, setPlaceBetErrorMessage] = useState("");
    const [getBetsErrorMessage, setGetBetsErrorMessage] = useState("");
    const [betHistory, setBetHistory] = useState([]);
    const [betsTotalPages, setBetsTotalPages] = useState(0);

    const checkSessionToken = useCallback(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/start");
        }
    }, [navigate]);

    const placeBetRequest = async (amount: number) => {
        try {
            checkSessionToken();
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
                body: JSON.stringify({ amount }),
            };
            const response = await fetch("http://localhost:3000/bet", options);
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) return navigate("/start");
                setPlaceBetErrorMessage(data.message);
                return { success: false };
            }
            socket.emit("bet", { token: sessionStorage.getItem("token") });

            return { success: true };
        } catch (e) {
            setPlaceBetErrorMessage(e.message);

            return { success: false };
        }
    };

    const getBets = useCallback(
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
                    status: status,
                    page: page.toString(),
                    limit: limit.toString(),
                });

                const response = await fetch(
                    "http://localhost:3000/my-bets?" + params,
                    options
                );
                const data = await response.json();
                if (!response.ok) {
                    if (response.status === 401) return navigate("/start");
                    setGetBetsErrorMessage(data.message);
                    return { success: false };
                }
                setBetsTotalPages(Math.ceil(data.total / limit));
                setBetHistory(data.data);
                return { success: true };
            } catch (e) {
                setGetBetsErrorMessage(e.message);

                return { success: false };
            }
        },
        [checkSessionToken, navigate]
    );

    return (
        <BetDataContext.Provider
            value={{
                placeBetRequest,
                getBets,
                betHistory,
                betsTotalPages,
                placeBetErrorMessage,
                getBetsErrorMessage,
            }}
        >
            {children}
        </BetDataContext.Provider>
    );
};

export { BetDataProvider };
