import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Opponent} from "@/types/types";

const userAccessToken = localStorage.getItem("userAccessToken");
const baseURL = process.env.REACT_APP_API_BASE_URL;

export const opponentApiSlice = createApi({

    reducerPath: "opponents",

    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${userAccessToken}`);
            return headers;
        }
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