import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {PlayerStatline} from "@/types/types";
import {RootState} from "@/store/store";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const yearlyTeamStatsApiSlice = createApi({

    reducerPath: "yearlyTeamStats",

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

        getYearlyTeamStats: build.query<PlayerStatline[], number>({
            query: (year) => `/yearlyTeamStats/${year}`,
        }),
    }),

});

export const {
    useGetYearlyTeamStatsQuery
} = yearlyTeamStatsApiSlice;
