import { configureStore } from '@reduxjs/toolkit';
import {playerApiSlice} from "@/store/players/playerApiSlice";
import {playerLifetimeStatsApiSlice} from "@/store/playerLifetimeStats/playerLifetimeStatsApiSlice";
import {playerSeasonStatsApiSlice} from "@/store/playerSeasonStats/playerSeasonStatsApiSlice";
import {seasonApiSlice} from "@/store/seasons/seasonApiSlice";
import {boxscoreApiSlice} from "@/store/boxscore/boxscoreApiSlice";
import {playerGameLogApiSlice} from "@/store/playerGameLog/playerGameLogApiSlice";

export const store = configureStore({
    reducer: {
        [playerApiSlice.reducerPath]: playerApiSlice.reducer,
        [playerLifetimeStatsApiSlice.reducerPath]: playerLifetimeStatsApiSlice.reducer,
        [playerSeasonStatsApiSlice.reducerPath]: playerSeasonStatsApiSlice.reducer,
        [seasonApiSlice.reducerPath]: seasonApiSlice.reducer,
        [boxscoreApiSlice.reducerPath]: boxscoreApiSlice.reducer,
        [playerGameLogApiSlice.reducerPath]: playerGameLogApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
        .concat(playerApiSlice.middleware)
        .concat(playerLifetimeStatsApiSlice.middleware)
        .concat(playerSeasonStatsApiSlice.middleware)
        .concat(seasonApiSlice.middleware)
        .concat(boxscoreApiSlice.middleware)
        .concat(playerGameLogApiSlice.middleware)
});
