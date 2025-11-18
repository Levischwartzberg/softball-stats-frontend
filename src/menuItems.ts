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
                label: "Years / Seasons",
                selected: location.pathname.startsWith("/yearsAndSeasons"),
                onClick: () => navigate("/yearsAndSeasons")
            }
        },
        {
            link: {
                label: "Lifetime Stats",
                selected: location.pathname.startsWith("/lifetimeStats"),
                onClick: () => navigate("/lifetimeStats")
            }
        },
        {
            link: {
                label: "Team Metrics",
                selected: location.pathname.startsWith("/teamMetrics"),
                onClick: () => navigate("/teamMetrics")
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
