import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {PlayerStatline} from "@/types/types";
import {RootState} from "@/store/store";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const seasonTeamStatsApiSlice = createApi({

    reducerPath: "seasonTeamStats",

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

        getSeasonTeamStats: build.query<PlayerStatline[], number>({
            query: (seasonId) => `/seasonTeamStats/${seasonId}`,
        }),
    }),

});

export const {
    useGetSeasonTeamStatsQuery
} = seasonTeamStatsApiSlice;