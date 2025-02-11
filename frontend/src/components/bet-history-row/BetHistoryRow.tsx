import React from "react";
import { Bet } from "../../types/requests.types";

const BetHistoryRow = ({ amount, createdAt, id, status, winAmount }: Bet) => {
    const date = new Date(createdAt);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const displayDate =
        date.toLocaleDateString().replace(/\//g, "-") +
        " " +
        `${hours}:${minutes}`;
    const isBetWon = status === "win";

    const cancelBetHandler = () => {};
    return (
        <tr>
            <td>
                <div
                    className={`bet-indicator ${isBetWon ? "bet-won" : "bet-lost"}`}
                ></div>
            </td>
            <td>{amount}</td>
            <td>{displayDate}</td>
            <td>{winAmount}</td>
            <td>{id}</td>
            <td>
                <button
                    onClick={cancelBetHandler}
                    disabled={status === "win" || status === "lost"}
                >
                    Cancel
                </button>
            </td>
        </tr>
    );
};

export default BetHistoryRow;
