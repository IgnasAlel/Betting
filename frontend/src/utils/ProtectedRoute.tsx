import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: React.ReactElement;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    if (!sessionStorage.getItem("token")) {
        return <Navigate to="/start" replace />;
    }

    return children;
};

export default ProtectedRoute;
