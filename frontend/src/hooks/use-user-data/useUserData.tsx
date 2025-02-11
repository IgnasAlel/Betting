import { useContext } from "react";
import { UserDataContext } from "../../context/user-context/UserContext";

const useUserData = () => {
    const userData = useContext(UserDataContext);

    if (userData === null) {
        throw new Error("UserDataProvider is not up in the tree");
    }

    return userData;
};

export { useUserData };
