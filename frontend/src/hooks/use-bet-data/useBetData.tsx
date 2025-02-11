import { useContext } from "react";
import { BetDataContext } from "../../context/bet-context/BetContext";

const useBetData = () => {
    const betData = useContext(BetDataContext);

    if (betData === null) {
        throw new Error("UserDataProvider is not up in the tree");
    }

    return betData;
};

export { useBetData };
