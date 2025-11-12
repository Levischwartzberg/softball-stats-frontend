import TeamPage from "@/pages/TeamPage";
import HomePage from "@/pages/HomePage";
import SaveNewGamePage from "@/pages/SaveNewGamePage";
import PlayerPage from "@/pages/PlayerPage";
import YearsAndSeasonsPage from "@/pages/YearsAndSeasonsPage";
import SeasonInfoPage from "@/pages/SeasonInfoPage";
import ResultPage from "@/pages/ResultPage";
import LifetimeStatsPage from "@/pages/LifetimeStatsPage";
import YearlyTeamStatsPage from "@/pages/YearlyTeamStatsPage";

export const routes = [

    { path: "/", element: <HomePage /> },
    { path: "/player-page", element: <TeamPage /> },
    { path: "/scorekeeping", element: <SaveNewGamePage /> },
    { path: "/player/:playerId", element: <PlayerPage />},
    { path: "/yearsAndSeasons", element: <YearsAndSeasonsPage />},
    { path: "/season/:seasonId", element: <SeasonInfoPage />},
    { path: "/game/:gameId", element: <ResultPage />},
    { path: "/lifetimeStats", element: <LifetimeStatsPage />},
    { path: "/yearlyStats/:year", element: <YearlyTeamStatsPage />}

];
