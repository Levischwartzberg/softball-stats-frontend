import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {CreateSeasonDTO, Season, SeasonResults} from "@/types/types";
import {RootState} from "@/store/store";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const SEASONS_TAG = "SeasonsTag";

export const seasonApiSlice = createApi({

    reducerPath: "seasons",

    tagTypes: [SEASONS_TAG],

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

        getSeasons: build.query<Season[], void>({
            query: () => "/seasons",
            providesTags: [SEASONS_TAG]
        }),

        getSeasonResults: build.query<SeasonResults, number>({
            query: (seasonId) => `/seasonResults/${seasonId}`
        }),

        createSeason: build.mutation<Season, CreateSeasonDTO>({
            query: (createSeasonDTO: CreateSeasonDTO) => ({
                url: "/createSeason",
                method: "POST",
                body: createSeasonDTO,
            }),
            transformResponse: (response: { message: string; season: Season }) => response.season,
            invalidatesTags: (result, error) => error ? [] : [SEASONS_TAG]
        })
    }),

});

export const {
    useGetSeasonsQuery,
    useGetSeasonResultsQuery,
    useCreateSeasonMutation
} = seasonApiSlice;