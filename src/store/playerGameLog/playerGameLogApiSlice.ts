import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {PlayerGameLogQueryParams, ResultStatline} from "@/store/playerGameLog/playerGameLogTypes";
import {RootState} from "@/store/store";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const playerGameLogApiSlice = createApi({

    reducerPath: "playerGameLog",

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

        getPlayerGameLogs: build.query<ResultStatline[], PlayerGameLogQueryParams>({
            query: (params : PlayerGameLogQueryParams) => `/playerGameLog/${params.playerId}/${params.seasonId}`,
        }),
    }),

});

export const {
    useLazyGetPlayerGameLogsQuery
} = playerGameLogApiSlice;