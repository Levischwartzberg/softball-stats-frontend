import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Season, SeasonResults} from "@/types/types";

const userAccessToken = localStorage.getItem("userAccessToken");
const baseURL = process.env.REACT_APP_API_BASE_URL;

export const seasonApiSlice = createApi({

    reducerPath: "seasons",

    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${userAccessToken}`);
            return headers;
        }
    }),

    endpoints: (build) => ({

        getSeasons: build.query<Season[], void>({
            query: () => "/seasons",
        }),

        getSeasonResults: build.query<SeasonResults, number>({
            query: (seasonId) => `/seasonResults/${seasonId}`
        })
    }),

});

export const {
    useGetSeasonsQuery,
    useGetSeasonResultsQuery
} = seasonApiSlice;