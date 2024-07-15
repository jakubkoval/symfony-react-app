// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

import React from "react";
import ReactDOM from "react-dom/client";
import Chart from "./pages/Chart";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import About from "./pages/About";
import {SnackBarContextProvider} from "./components/Snackbars/SnackBarContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Chart />,
    },
    {
        path: "/about",
        element: <About />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SnackBarContextProvider>
            <RouterProvider router={router}/>
        </SnackBarContextProvider>
    </React.StrictMode>
);
