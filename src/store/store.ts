import { configureStore } from '@reduxjs/toolkit';
import {playerApiSlice} from "@/store/players/playerApiSlice";
import {playerLifetimeStatsApiSlice} from "@/store/playerLifetimeStats/playerLifetimeStatsApiSlice";
import {playerSeasonStatsApiSlice} from "@/store/playerSeasonStats/playerSeasonStatsApiSlice";
import {seasonApiSlice} from "@/store/seasons/seasonApiSlice";
import {boxscoreApiSlice} from "@/store/boxscore/boxscoreApiSlice";
import {playerGameLogApiSlice} from "@/store/playerGameLog/playerGameLogApiSlice";
import {seasonTeamStatsApiSlice} from "@/store/seasonTeamStats/seasonTeamStatsApiSlice";
import {teamLifetimeStatsApiSlice} from "@/store/teamLifetimeStats/teamLifetimeStatsApiSlice";
import {opponentApiSlice} from "@/store/opponents/opponentApiSlice";
import tokenSlice from "@/store/token/tokenSlice";
import {scorekeepingGameApiSlice} from "@/store/scorekeepingGame/scorekeepingGameApiSlice";
import {scoresheetApiSlice} from "@/store/scoresheet/scoresheetApiSlice";
import {yearlyTeamStatsApiSlice} from "@/store/yearlyTeamStats/yearlyTeamStatsApiSlice";
import {playerBattedBallDataApiSlice} from "@/store/playerBattedBallData/playerBattedBallDataApiSlice";
import {runExpectancyApiSlice} from "@/store/runExpectancy/runExpectancyApiSlice";
import {teamBattedBallDataApiSlice} from "@/store/teamBattedBallData/teamBattedBallDataApiSlice";
import {teamBattingByExitVelocityApiSlice} from "@/store/teamBattingByExitVelocity/teamBattingByExitVelocityApiSlice";
import {playerYearlyStatsApiSlice} from "@/store/playerYearlyStats/playerLifetimeStatsApiSlice";

export const store = configureStore({
    reducer: {
        token: tokenSlice,
        [playerApiSlice.reducerPath]: playerApiSlice.reducer,
        [playerLifetimeStatsApiSlice.reducerPath]: playerLifetimeStatsApiSlice.reducer,
        [playerYearlyStatsApiSlice.reducerPath]: playerYearlyStatsApiSlice.reducer,
        [playerSeasonStatsApiSlice.reducerPath]: playerSeasonStatsApiSlice.reducer,
        [seasonApiSlice.reducerPath]: seasonApiSlice.reducer,
        [boxscoreApiSlice.reducerPath]: boxscoreApiSlice.reducer,
        [playerGameLogApiSlice.reducerPath]: playerGameLogApiSlice.reducer,
        [seasonTeamStatsApiSlice.reducerPath]: seasonTeamStatsApiSlice.reducer,
        [teamLifetimeStatsApiSlice.reducerPath]: teamLifetimeStatsApiSlice.reducer,
        [opponentApiSlice.reducerPath]: opponentApiSlice.reducer,
        [scorekeepingGameApiSlice.reducerPath]: scorekeepingGameApiSlice.reducer,
        [scoresheetApiSlice.reducerPath]: scoresheetApiSlice.reducer,
        [yearlyTeamStatsApiSlice.reducerPath]: yearlyTeamStatsApiSlice.reducer,
        [playerBattedBallDataApiSlice.reducerPath]: playerBattedBallDataApiSlice.reducer,
        [teamBattedBallDataApiSlice.reducerPath]: teamBattedBallDataApiSlice.reducer,
        [teamBattingByExitVelocityApiSlice.reducerPath]: teamBattingByExitVelocityApiSlice.reducer,
        [runExpectancyApiSlice.reducerPath]: runExpectancyApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
        .concat(playerApiSlice.middleware)
        .concat(playerLifetimeStatsApiSlice.middleware)
        .concat(playerYearlyStatsApiSlice.middleware)
        .concat(playerSeasonStatsApiSlice.middleware)
        .concat(seasonApiSlice.middleware)
        .concat(boxscoreApiSlice.middleware)
        .concat(playerGameLogApiSlice.middleware)
        .concat(seasonTeamStatsApiSlice.middleware)
        .concat(teamLifetimeStatsApiSlice.middleware)
        .concat(opponentApiSlice.middleware)
        .concat(scorekeepingGameApiSlice.middleware)
        .concat(scoresheetApiSlice.middleware)
        .concat(yearlyTeamStatsApiSlice.middleware)
        .concat(playerBattedBallDataApiSlice.middleware)
        .concat(teamBattedBallDataApiSlice.middleware)
        .concat(teamBattingByExitVelocityApiSlice.middleware)
        .concat(runExpectancyApiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
