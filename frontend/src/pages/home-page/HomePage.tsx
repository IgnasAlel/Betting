import React, { useEffect, useState } from "react";
import BetCard from "../../components/bet-card/BetCard";
import "./HomePage.css";
import { betTypes } from "../../types/bet-types";
import { useBetData } from "../../hooks/use-bet-data/useBetData";
import BetHistoryRow from "../../components/bet-history-row/BetHistoryRow";

const HomePage = () => {
    const { getBets, betHistory, betsTotalPages } = useBetData();
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [status, setStatus] = useState<"win" | "lost" | "">("");

    useEffect(() => {
        getBets(currentPage, limit, status);
    }, [limit, currentPage, status, getBets]);

    return (
        <div className="homepage-wrapper">
            <h2>Most popular event to bet on</h2>
            <div className="bets">
                {betTypes.map((bet) => (
                    <BetCard
                        key={bet.key}
                        label={bet.label}
                        options={bet.options}
                    />
                ))}
            </div>
            <h3>Bet history</h3>
            <div className="bet-history-wrapper">
                <table className="bet-history-table">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Win</th>
                            <th>ID</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {betHistory.map((bet) => (
                            <BetHistoryRow {...bet} key={bet.id} />
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
                            onClick={() => setStatus("lost")}
                            disabled={status === "lost"}
                        >
                            Lost
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
                            Page {currentPage} of {betsTotalPages}
                        </span>
                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, betsTotalPages)
                                )
                            }
                            disabled={currentPage === betsTotalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
