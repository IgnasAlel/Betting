import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import { useUserData } from "../../hooks/use-user-data/useUserData";

function Layout() {
    const { balance } = useUserData();
    return (
        <div className="layout-wrapper">
            <header className="layout-header">
                <h1>Ignas Betting</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/history">Transactions History</Link>
                        </li>
                    </ul>
                </nav>
                <p className="balance">{`Balance: €${balance}`}</p>
            </header>
            <div className="layout-content">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
