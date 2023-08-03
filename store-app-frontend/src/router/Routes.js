import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login/Login.js";
import Registration from "../components/Registration/Registration";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '/login', element: <Login />},
            {path: '/register', element: <Registration />}
        ]
    }
])