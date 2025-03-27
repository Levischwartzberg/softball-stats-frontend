import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {BoxscoreDTO} from "@/store/boxscore/boxscoreDTO";
import {RootState} from "@/store/store";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const boxscoreApiSlice = createApi({

    reducerPath: "boxscore",

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

        getBoxscore: build.query<BoxscoreDTO, number>({
            query: (gameId) => `/boxscore/${gameId}`,
        }),
    }),

});

export const {
    useGetBoxscoreQuery
} = boxscoreApiSlice;