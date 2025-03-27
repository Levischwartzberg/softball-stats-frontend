import React, {useState, useEffect} from "react";
import {createBrowserRouter, RouterProvider, useNavigate, useLocation, Outlet} from "react-router-dom";
import {routes} from "../routes";
import menuItems from "../menuItems";
import TopMenu from "../components/TopMenu/TopMenu";
import {CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import {LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {Provider, useDispatch} from 'react-redux';
import store from "../store/store";
import {setUserAccessToken} from "@/store/token/tokenSlice";

const Layout = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const menu = menuItems(navigate, location);

    return <Provider store={store}>
        <div style={{display : "block"}}>
            <TopMenu links={menu.map(menuItem => menuItem.link)} />
        </div>
        <div style={{paddingTop : "30px"}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Outlet />
            </LocalizationProvider>
        </div>
    </ Provider>
}

const guestUsername = process.env.REACT_APP_GUEST_USERNAME as string;
const guestPassword = process.env.REACT_APP_GUEST_PASSWORD as string;

const SoftballStatsApp : React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const user = new CognitoUser({
            Username : guestUsername,
            Pool : UserPool
        })

        const authDetails = new AuthenticationDetails({
            Username : guestUsername,
            Password : guestPassword
        })

        user.authenticateUser(authDetails, {
            onSuccess : (data) => {
                console.log("Success: ", data);
                localStorage.setItem("userAccessToken", data.getIdToken().getJwtToken());
                dispatch(setUserAccessToken(data.getIdToken().getJwtToken()));
            },
            onFailure : (data) => {
                console.error("Error: ", data);
            },
            newPasswordRequired : (data) => {
                console.log(data);
            }
        })
    },[]);

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