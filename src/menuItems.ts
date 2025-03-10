import {Location, NavigateFunction} from "react-router-dom";

export default function menuItems(navigate : NavigateFunction, location : Location) {

    let menuItems = [
        {
            link: {
                label: "Home",
                selected: location.pathname.startsWith("/"),
                onClick: () => navigate("/")
            }
        },
        {
            link: {
                label: "Players",
                selected: location.pathname.startsWith("/player-page"),
                onClick: () => navigate("/player-page"),
            }
        },
        {
            link: {
                label: "Seasons",
                selected: location.pathname.startsWith("/seasons"),
                onClick: () => navigate("/seasons")
            }
        },
        {
            link: {
                label: "Scorekeeping",
                selected: location.pathname.startsWith("/scorekeeping"),
                onClick: () => navigate("/scorekeeping")
            }
        }
    ];

    return menuItems;
}