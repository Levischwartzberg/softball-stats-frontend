import {createBrowserRouter, RouterProvider, useNavigate, useLocation, Outlet} from "react-router-dom";
import React from "react";
import {routes} from "../routes";
import TopMenu from "../components/TopMenu/TopMenu";
import menuItems from "../menuItems";

const Layout = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const menu = menuItems(navigate, location);

    return <>
        <TopMenu links={menu.map(menuItem => menuItem.link)} />
        <div>
            <Outlet />
        </div>
    </>
}

const SoftballStatsApp : React.FC = () => {

    const router = createBrowserRouter([
        {
            element: <Layout/>,
            children: routes
        }
    ]);

    return <>
        <RouterProvider router={router} />
    </>;
};

export default SoftballStatsApp;