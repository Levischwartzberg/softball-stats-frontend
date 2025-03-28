import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Opponent} from "@/types/types";
import {RootState} from "@/store/store";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const opponentApiSlice = createApi({

    reducerPath: "opponents",

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
        }),
    }),

});

export const {
    useGetOpponentsQuery,
} = opponentApiSlice;