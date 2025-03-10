import { configureStore } from '@reduxjs/toolkit';
import {playerApiSlice} from "../store/players/playerApiSlice";
import {playerLifetimeStatsApiSlice} from "../store/playerLifetimeStats/playerLifetimeStatsApiSlice";
import {playerSeasonStatsApiSlice} from "../store/playerSeasonStats/playerSeasonStatsApiSlice";

export const store = configureStore({
    reducer: {
        [playerApiSlice.reducerPath]: playerApiSlice.reducer,
        [playerLifetimeStatsApiSlice.reducerPath]: playerLifetimeStatsApiSlice.reducer,
        [playerSeasonStatsApiSlice.reducerPath]: playerSeasonStatsApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
        .concat(playerApiSlice.middleware)
        .concat(playerLifetimeStatsApiSlice.middleware)
        .concat(playerSeasonStatsApiSlice.middleware)
});
