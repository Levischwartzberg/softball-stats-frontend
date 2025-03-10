import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {SeasonStatline} from "../../types/types";

const userAccessToken = localStorage.getItem("userAccessToken");
const baseURL = process.env.REACT_APP_API_BASE_URL;

export const playerSeasonStatsApiSlice = createApi({

    reducerPath: "playerSeasonStats",

    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${userAccessToken}`);
            return headers;
        }
    }),

    endpoints: (build) => ({

        getSeasonStats: build.query<SeasonStatline[], number>({
            query: (playerId) => `/playerSeasonStats/${playerId}`,
        }),
    }),

});

export const {
    useGetSeasonStatsQuery
} = playerSeasonStatsApiSlice;