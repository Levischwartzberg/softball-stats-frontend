import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {PlayerGameLogQueryParams, ResultStatline} from "@/store/playerGameLog/playerGameLogTypes";

const userAccessToken = localStorage.getItem("userAccessToken");
const baseURL = process.env.REACT_APP_API_BASE_URL;

export const playerGameLogApiSlice = createApi({

    reducerPath: "playerGameLog",

    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${userAccessToken}`);
            return headers;
        }
    }),

    endpoints: (build) => ({

        getPlayerGameLogs: build.query<ResultStatline[], PlayerGameLogQueryParams>({
            query: (params : PlayerGameLogQueryParams) => `/playerGameLog/${params.playerId}/${params.seasonId}`,
        }),
    }),

});

export const {
    useLazyGetPlayerGameLogsQuery
} = playerGameLogApiSlice;