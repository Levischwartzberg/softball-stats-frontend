import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Statline} from "@/types/types";
import {RootState} from "@/store/store";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const playerLifetimeStatsApiSlice = createApi({

    reducerPath: "playerLifetimeStats",

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

        getLifetimeStats: build.query<Statline, number>({
            query: (playerId) => `/playerLifetimeStats/${playerId}`,
        }),
    }),

});

export const {
    useGetLifetimeStatsQuery
} = playerLifetimeStatsApiSlice;