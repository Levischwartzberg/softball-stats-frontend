import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {CreateOpponentDTO, CreatePlayerDTO, Opponent, Player} from "@/types/types";
import {RootState} from "@/store/store";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const OPPONENTS_TAG = "opponentsTag"

export const opponentApiSlice = createApi({

    reducerPath: "opponents",

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

        getOpponents: build.query<Opponent[], void>({
            query: () => "/opponents",
            providesTags: [OPPONENTS_TAG]
        }),

        createOpponent: build.mutation<Opponent, CreateOpponentDTO>({
            query: (createOpponentDTO : CreateOpponentDTO) => ({
                url: "/createOpponent",
                method: "POST",
                body: createOpponentDTO,
            }),
            transformResponse: (response: { message: string; opponent: Opponent }) => response.opponent,
            invalidatesTags: (result, error) => error ? [] : [OPPONENTS_TAG]
        })
    }),

});

export const {
    useGetOpponentsQuery,
    useCreateOpponentMutation
} = opponentApiSlice;