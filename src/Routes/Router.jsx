import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllItems from "../pages/AllItems";
import ItemDetails from "../pages/ItemDetails";
import PrivateRoute from "./PrivateRoute";
import AddItem from "../pages/AddItem";
import MyItems from "../pages/MyItems";
import UpdateItem from "../pages/UpdateItem";
import AllRecovared from "../pages/AllRecovared";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/allItems',
                element: <PrivateRoute><AllItems /></PrivateRoute>,
            },
            {
                path: '/addItem',
                element: <PrivateRoute><AddItem /></PrivateRoute>,
            },
            {
                path: '/myItems',
                element: <PrivateRoute><MyItems /></PrivateRoute>,
            },
            {
                path: '/updateItems/:id',
                element: <PrivateRoute><UpdateItem /></PrivateRoute>,
            },
            {
                path: '/allRecovared',
                element: <PrivateRoute><AllRecovared /></PrivateRoute>,
            },
            {
                path: '/allItems/:id',
                element: <PrivateRoute><ItemDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://where-is-it-server-taupe.vercel.app/allItems/${params.id}`)
            },
        ],
    },
]);

export default router;