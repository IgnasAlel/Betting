import React, { Dispatch, SetStateAction, useState } from "react";
import "./Register.css";
import { UserDetailsType } from "../../types/requests.types";
import { useUserData } from "../../hooks/use-user-data/useUserData";

type RegisterProps = {
    setShowRegister: Dispatch<SetStateAction<boolean>>;
};

const Register = ({ setShowRegister }: RegisterProps) => {
    const { registerRequest, registerErrorMessage } = useUserData();

    const [userDetails, setUserDetails] = useState<UserDetailsType>({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });

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
        const data = await registerRequest(userDetails);
        if (data.success) {
            setShowRegister(false);
        }
    };

    return (
        <div className="register-wrapper">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        id="email"
                        onChange={(e) => handleInput("email", e)}
                        type="email"
                        placeholder="Enter your email address"
                        value={userDetails.email}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        onChange={(e) => handleInput("name", e)}
                        type="text"
                        placeholder="Enter your name"
                        value={userDetails.name}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        onChange={(e) => handleInput("password", e)}
                        type="password"
                        placeholder="Enter your password"
                        value={userDetails.password}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        id="confirmPassword"
                        onChange={(e) => handleInput("confirmPassword", e)}
                        type="password"
                        placeholder="Confirm your password"
                        value={userDetails.confirmPassword}
                        required
                    />
                </div>

                {registerErrorMessage && (
                    <p className="error-message">{registerErrorMessage}</p>
                )}

                <div className="button-group">
                    <button type="submit">Register</button>
                    <button
                        type="button"
                        onClick={() => setShowRegister(false)}
                    >
                        Go Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
