import {createBrowserRouter, Outlet, RouterProvider, useLocation, useNavigate} from "react-router-dom";
import React from "react";
import {routes} from "../routes";

const SoftballStatsApp : React.FC = () => {

    const router = createBrowserRouter(routes);

    return <RouterProvider router={router} />;
};

export default SoftballStatsApp;