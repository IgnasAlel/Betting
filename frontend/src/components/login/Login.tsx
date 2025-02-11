import React, { Dispatch, SetStateAction, useState } from "react";
import { LoginType } from "../../types/requests.types";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../hooks/use-user-data/useUserData";
type LoginProps = {
    setShowLogin: Dispatch<SetStateAction<boolean>>;
};

const Login = ({ setShowLogin }: LoginProps) => {
    const { loginRequest, loginErrorMessage } = useUserData();
    const [loginDetails, setUserDetails] = useState<LoginType>({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleInput = (
        type: string,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setUserDetails((prevState) => ({
            ...prevState,
            [type]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await loginRequest(loginDetails);
        if (!response.success) {
            return;
        }

        navigate("/home");
    };

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input
                        id="email"
                        onChange={(e) => handleInput("email", e)}
                        type="email"
                        value={loginDetails.email}
                        placeholder={"Enter your username"}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        onChange={(e) => handleInput("password", e)}
                        type="password"
                        value={loginDetails.password}
                        placeholder={"Enter your password"}
                        required
                    />
                </div>
                {loginErrorMessage && <p>{loginErrorMessage}</p>}
                <div>
                    <button type="submit">Login</button>
                    <button onClick={() => setShowLogin(false)}>GoBack</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
