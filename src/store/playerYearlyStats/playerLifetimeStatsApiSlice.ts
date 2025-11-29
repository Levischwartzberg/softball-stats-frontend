import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {YearlyStatline} from "@/types/types";
import {RootState} from "@/store/store";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const playerYearlyStatsApiSlice = createApi({

    reducerPath: "playerYearlyStats",

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

        getYearlyStats: build.query<YearlyStatline[], number>({
            query: (playerId) => `/playerYearlyStats/${playerId}`,
        }),
    }),

});

export const {
    useGetYearlyStatsQuery
} = playerYearlyStatsApiSlice;
