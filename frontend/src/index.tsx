import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/start-page/StartPage";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/home-page/HomePage";
import HistoryPage from "./pages/history-page/HistoryPage";
import { UserDataProvider } from "./context/user-context/UserProvider";
import { BetDataProvider } from "./context/bet-context/BetProvider";
import ProtectedRoute from "./utils/ProtectedRoute";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Router>
            <UserDataProvider>
                <BetDataProvider>
                    <Routes>
                        <Route path="/start" index element={<StartPage />} />
                        <Route path="/" element={<Layout />}>
                            <Route
                                path="/home"
                                element={
                                    <ProtectedRoute>
                                        <HomePage />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/history"
                                element={
                                    <ProtectedRoute>
                                        <HistoryPage />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                    </Routes>
                </BetDataProvider>
            </UserDataProvider>
        </Router>
    </React.StrictMode>
);
