import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "@/store/store";
import {PlayerStatline} from "@/types/types";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const OPPONENTS_TAG = "opponentsTag"

export const opponentTeamStatsApiSlice = createApi({

    reducerPath: "opponentTeamStats",

    tagTypes: [OPPONENTS_TAG],

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

        getTeamStatsByOpponent: build.query<PlayerStatline[], number>({
            query: (opponentId : number) => `/opponentTeamStats/${opponentId}`,
            providesTags: [OPPONENTS_TAG]
        }),
    }),

});

export const {
    useLazyGetTeamStatsByOpponentQuery,
} = opponentTeamStatsApiSlice;
