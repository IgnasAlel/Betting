import React, { useState } from "react";
import { useBetData } from "../../hooks/use-bet-data/useBetData";
import "./BetCard.css";
import { useUserData } from "../../hooks/use-user-data/useUserData";

type BetOptions = {
    label: string;
    value: string;
};

type BetCardProps = {
    label: string;
    options: Array<BetOptions>;
};

const BetCard = ({ label, options }: BetCardProps) => {
    const { balance } = useUserData();
    const { placeBetRequest } = useBetData();
    const [betAmount, setBetAmount] = useState("");
    const [showError, setShowError] = useState("");
    const [betSuccess, setBetSuccess] = useState(false);
    const [betSelected, setBetSelected] = useState("");

    const isBetButtonDisabled =
        !betSelected || parseFloat(betAmount) < 1 || betAmount === "";

    const placeBetHandler = async () => {
        const response = await placeBetRequest(parseFloat(betAmount));

        if (response) setBetSuccess(true);
    };

    const betChangeHandler = (betAmount: string) => {
        if (parseFloat(betAmount) < 1 || parseFloat(betAmount) === 0) {
            setShowError("Minimum amount is 1 EUR");
        } else if (parseFloat(betAmount) > balance) {
            setShowError("You dont have enough funds");
        } else {
            setShowError("");
        }

        const regex = /^\d*(\.\d{0,2})?$/;
        if (regex.test(`${betAmount}`) || "") setBetAmount(betAmount);
    };

    const betAgainHandler = () => {
        setBetAmount("");
        setShowError("");
        setBetSuccess(false);
        setBetSelected("");
    };

    const renderBetSelection = () => {
        return options.map((option) => (
            <React.Fragment key={option.value}>
                <label htmlFor={option.value}>{option.label}</label>
                <input
                    onChange={() => setBetSelected(option.value)}
                    type="radio"
                    id={option.value}
                    value={option.value}
                    checked={betSelected === option.value}
                />
            </React.Fragment>
        ));
    };

    const renderBet = () => (
        <>
            <p>{label}</p>
            {renderBetSelection()}
            <div className="bet-amount">
                <input
                    onChange={(e) => betChangeHandler(e.target.value)}
                    type="text"
                    placeholder="Bet amount (min 1 EUR)"
                    value={betAmount}
                />
                <button
                    onClick={placeBetHandler}
                    disabled={isBetButtonDisabled}
                >
                    Place your bet
                </button>
            </div>
            <p className="error-message">{showError}</p>
        </>
    );

    const renderSuccess = () => (
        <>
            <p>Your bet was accepted</p>
            <button onClick={betAgainHandler}>Bet again</button>
        </>
    );

    return (
        <article className="bet-card-wrapper">
            {betSuccess ? renderSuccess() : renderBet()}
        </article>
    );
};
export default BetCard;
