import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Album from "./Album";
import Expense from "./Expense";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ children }) => {
    const [cookies] = useCookies()
    return cookies.token ? children : <Navigate to={'/login'} />
}

const routes = createBrowserRouter([
    {
        path: '/expense',
        // Component: Expense
        element: (
            <ProtectedRoute>
                <Expense />
            </ProtectedRoute>
        )
    },
    {
        path: '/album',
        element: (
            <ProtectedRoute>
                <Album />
            </ProtectedRoute>
        )
    },
    {
        path: '/',
        Component: Login
    },
    {
        path: '/login',
        Component: Login
    }
])

function App() {
    return (
        <div className="App">
            <RouterProvider router={routes} />
        </div>
    );
}

export default App;
