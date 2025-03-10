import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Player, Statline} from "@/types/types";

const userAccessToken = localStorage.getItem("userAccessToken");
const baseURL = process.env.REACT_APP_API_BASE_URL;

export const playerLifetimeStatsApiSlice = createApi({

    reducerPath: "playerLifetimeStats",

    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${userAccessToken}`);
            return headers;
        }
    }),

    endpoints: (build) => ({

        getLifetimeStats: build.query<Statline, number>({
            query: (playerId) => `/playerLifetimeStats/${playerId}`,
        }),
    }),

});

export const {
    useGetLifetimeStatsQuery
} = playerLifetimeStatsApiSlice;