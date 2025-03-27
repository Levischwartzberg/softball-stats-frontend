import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Player} from "@/types/types";
import {RootState} from "@/store/store";

const userAccessToken = localStorage.getItem("userAccessToken");
const baseURL = process.env.REACT_APP_API_BASE_URL;

export const playerApiSlice = createApi({

    reducerPath: "players",

    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).token.userAccessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),

    endpoints: (build) => ({

        getPlayers: build.query<Player[], void>({
            query: () => "/players",
        }),

        getPlayerInfo: build.query<Player, number>({
            query: (playerId) => `playerInfo/${playerId}`,
        }),
    }),

});

export const {
    useGetPlayersQuery,
    useGetPlayerInfoQuery
} = playerApiSlice;