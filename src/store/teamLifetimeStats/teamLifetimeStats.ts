import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {PlayerStatline} from "@/types/types";
import {TeamLifetimeStatsQueryParams} from "@/store/teamLifetimeStats/teamLifetimeStatsTypes";

const userAccessToken = localStorage.getItem("userAccessToken");
const baseURL = process.env.REACT_APP_API_BASE_URL;

export const teamLifetimeStatsApiSlice = createApi({

    reducerPath: "teamLifetimeStats",

    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${userAccessToken}`);
            return headers;
        }
    }),

    endpoints: (build) => ({

        getTeamLifetimeStats: build.query<PlayerStatline[], TeamLifetimeStatsQueryParams>({
            query: (params) => `/teamLifetimeStats/${params.field}/${params.value}`,
        }),
    }),

});

export const {
    useGetTeamLifetimeStatsQuery,
    useLazyGetTeamLifetimeStatsQuery
} = teamLifetimeStatsApiSlice;