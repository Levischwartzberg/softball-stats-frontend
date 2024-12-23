import { configureStore } from '@reduxjs/toolkit';
import {playerApiSlice} from "../store/players/playerApiSlice";

export const store = configureStore({
    reducer: {
        [playerApiSlice.reducerPath]: playerApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
        .concat(playerApiSlice.middleware)
});
