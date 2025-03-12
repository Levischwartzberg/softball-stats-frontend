import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {PlayerStatline} from "@/types/types";

const userAccessToken = localStorage.getItem("userAccessToken");
const baseURL = process.env.REACT_APP_API_BASE_URL;

export const seasonTeamStatsApiSlice = createApi({

    reducerPath: "seasonTeamStats",

    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${userAccessToken}`);
            return headers;
        }
    }),

    endpoints: (build) => ({

        getSeasonTeamStats: build.query<PlayerStatline[], number>({
            query: (seasonId) => `/seasonTeamStats/${seasonId}`,
        }),
    }),

});

export const {
    useGetSeasonTeamStatsQuery
} = seasonTeamStatsApiSlice;