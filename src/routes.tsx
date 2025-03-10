import TeamPage from "@/pages/TeamPage";
import HomePage from "@/pages/HomePage";
import ScorekeepingInputPage from "@/pages/ScorekeepingInputPage";
import PlayerPage from "@/pages/PlayerPage";
import SeasonsPage from "@/pages/SeasonsPage";
import SeasonInfoPage from "@/pages/SeasonInfoPage";

export const routes = [

    { path: "/", element: <HomePage /> },
    { path: "/player-page", element: <TeamPage /> },
    { path: "/scorekeeping", element: <ScorekeepingInputPage /> },
    { path: "/player/:playerId", element: <PlayerPage />},
    { path: "/seasons", element: <SeasonsPage />},
    { path: "/season/:seasonId", element: <SeasonInfoPage />}

];
