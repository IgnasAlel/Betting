import React, { useState } from "react";
import Register from "../../components/register/Register";
import Login from "../../components/login/Login";
import "./StartPage.css";

const StartPage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    return (
        <div className="homepage-wrapper">
            <h1>Welcome to Ignas Betting Platform</h1>
            {!showLogin && !showRegister && (
                <div className="buttons-wrapper">
                    <button onClick={() => setShowRegister(true)}>
                        Sign Up
                    </button>
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                </div>
            )}
            {showLogin && <Login setShowLogin={setShowLogin} />}
            {showRegister && <Register setShowRegister={setShowRegister} />}
        </div>
    );
};

export default StartPage;
