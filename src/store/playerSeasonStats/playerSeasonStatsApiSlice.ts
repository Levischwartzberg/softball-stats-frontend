import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {SeasonStatline} from "../../types/types";
import {RootState} from "@/store/store";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const playerSeasonStatsApiSlice = createApi({

    reducerPath: "playerSeasonStats",

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

        getSeasonStats: build.query<SeasonStatline[], number>({
            query: (playerId) => `/playerSeasonStats/${playerId}`,
        }),
    }),

});

export const {
    useGetSeasonStatsQuery
} = playerSeasonStatsApiSlice;