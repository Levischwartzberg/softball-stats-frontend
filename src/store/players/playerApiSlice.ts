import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Player} from "@/types/types";

const userAccessToken = localStorage.getItem("userAccessToken");
const baseURL = process.env.REACT_APP_API_BASE_URL;

export const playerApiSlice = createApi({

    reducerPath: "players",

    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${userAccessToken}`);
            return headers;
        }
    }),

    endpoints: (build) => ({

        getPlayers: build.query<Player[], void>({
            query: () => "/playerInfoTest",
        }),
    }),

});

export const {
    useGetPlayersQuery
} = playerApiSlice;