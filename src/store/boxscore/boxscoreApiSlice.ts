import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {BoxscoreDTO} from "@/store/boxscore/boxscoreDTO";

const userAccessToken = localStorage.getItem("userAccessToken");
const baseURL = process.env.REACT_APP_API_BASE_URL;

export const boxscoreApiSlice = createApi({

    reducerPath: "boxscore",

    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${userAccessToken}`);
            return headers;
        }
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