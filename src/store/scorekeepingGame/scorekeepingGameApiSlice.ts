import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {GameInfo} from "@/types/types";
import {CreateScorekeepingGameDTO} from "@/store/scorekeepingGame/scorekeepingGamePostTypes";
import {RootState} from "@/store/store";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const scorekeepingGameApiSlice = createApi({

    reducerPath: "scorekeepingGame",

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

        createScorekeepingGame: build.mutation<GameInfo, CreateScorekeepingGameDTO>({
            query: (createScorekeepingGameDTO: CreateScorekeepingGameDTO) => ({
                url: "/scorekeepingGame",
                method: "POST",
                body: createScorekeepingGameDTO,
            }),
            transformResponse: (response: { message: string; gameInfo: GameInfo }) => response.gameInfo
        })
    }),

});

export const {
    useCreateScorekeepingGameMutation
} = scorekeepingGameApiSlice;