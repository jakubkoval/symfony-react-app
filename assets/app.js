// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

import React from "react";
import ReactDOM from "react-dom/client";
import Chart from "./pages/Chart";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import About from "./pages/About";
import Layout from "./layout/Layout";

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
        {/*<Layout>*/}
            <RouterProvider router={router}/>
        {/*</Layout>*/}
    </React.StrictMode>
);
