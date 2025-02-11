import React, { useEffect, useState } from "react";
import { Transaction } from "../../types/requests.types";
import TransactionRow from "../../components/transaction-row/TransactionRow";
import "./HistoryPage.css";
import { useUserData } from "../../hooks/use-user-data/useUserData";

const HistoryPage = () => {
    const { transactions, getTransactions, transactionsTotalPages } =
        useUserData();
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [status, setStatus] = useState<"bet" | "win" | "">("");

    useEffect(() => {
        getTransactions(currentPage, limit, status);
    }, [limit, currentPage, status, getTransactions]);
    return (
        <div className="history-wrapper">
            <table className="history-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Transaction ID</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction: Transaction) => (
                        <TransactionRow {...transaction} key={transaction.id} />
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <div>
                    <button
                        onClick={() => setStatus("")}
                        disabled={status === ""}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setStatus("win")}
                        disabled={status === "win"}
                    >
                        Win
                    </button>
                    <button
                        onClick={() => setStatus("bet")}
                        disabled={status === "bet"}
                    >
                        Bet
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => setLimit(10)}
                        disabled={limit === 10}
                    >
                        10
                    </button>
                    <button
                        onClick={() => setLimit(20)}
                        disabled={limit === 20}
                    >
                        20
                    </button>
                    <button
                        onClick={() => setLimit(50)}
                        disabled={limit === 50}
                    >
                        50
                    </button>
                </div>
                <div>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {transactionsTotalPages}
                    </span>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, transactionsTotalPages)
                            )
                        }
                        disabled={currentPage === transactionsTotalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
export default HistoryPage;
