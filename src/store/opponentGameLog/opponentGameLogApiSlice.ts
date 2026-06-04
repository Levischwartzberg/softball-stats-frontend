import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "@/store/store";
import {OpponentGames} from "@/types/types";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const OPPONENTS_TAG = "opponentsTag"

export const opponentGameLogApiSlice = createApi({

    reducerPath: "opponentGameLog",

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

        getGamesByOpponent: build.query<OpponentGames, number>({
            query: (opponentId : number) => `/opponentGameLog/${opponentId}`,
            providesTags: [OPPONENTS_TAG]
        }),
    }),

});

export const {
    useGetGamesByOpponentQuery
} = opponentGameLogApiSlice;
