import React from "react";
import { Transaction } from "../../types/requests.types";

const TransactionRow = ({ amount, createdAt, id, type }: Transaction) => {
    const date = new Date(createdAt);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const displayDate =
        date.toLocaleDateString().replace(/\//g, "-") +
        " " +
        `${hours}:${minutes}`;
    return (
        <tr key={id}>
            <td>{type}</td>
            <td>{amount}</td>
            <td>{displayDate}</td>
            <td>{id}</td>
        </tr>
    );
};

export default TransactionRow;
