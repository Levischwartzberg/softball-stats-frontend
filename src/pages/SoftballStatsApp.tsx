import React, {useState, useEffect} from "react";
import {createBrowserRouter, RouterProvider, useNavigate, useLocation, Outlet} from "react-router-dom";
import {routes} from "../routes";
import menuItems from "../menuItems";
import TopMenu from "../components/TopMenu/TopMenu";
import {CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

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

const guestUsername = process.env.REACT_APP_GUEST_USERNAME as string;
const guestPassword = process.env.REACT_APP_GUEST_PASSWORD as string;

const SoftballStatsApp : React.FC = () => {

    const [username, setUsername] = useState(guestUsername);
    const [password, setPassword] = useState(guestPassword);

    useEffect(() => {

        const user = new CognitoUser({
            Username : username,
            Pool : UserPool
        })

        const authDetails = new AuthenticationDetails({
            Username : username,
            Password : password
        })

        user.authenticateUser(authDetails, {
            onSuccess : (data) => {
                console.log("Success: ", data);
                localStorage.setItem("userAccessToken", data.getIdToken().getJwtToken());
            },
            onFailure : (data) => {
                console.error("Error: ", data);
            },
            newPasswordRequired : (data) => {
                console.log(data);
            }
        })
    },[username, password]);

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