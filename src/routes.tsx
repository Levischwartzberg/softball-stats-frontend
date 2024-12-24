import PlayerPage from "./pages/PlayerPage";
import HomePage from "./pages/HomePage";
import ScorekeepingInputPage from "./pages/ScorekeepingInputPage";

export const routes = [

    { path: "/", element: <HomePage /> },
    { path: "/player-page", element: <PlayerPage /> },
    { path: "/scorekeeping", element: <ScorekeepingInputPage /> },

];
