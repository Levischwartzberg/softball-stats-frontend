import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {RootState} from "@/store/store";
import {Scoresheet} from "@/types/types";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const scoresheetApiSlice = createApi({

    reducerPath: "scoresheet",

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

        getScoresheet: build.query<Scoresheet, number>({
            query: (gameId : number) => `/scoresheet/${gameId}`,
        }),
    }),

});

export const {
    useLazyGetScoresheetQuery
} = scoresheetApiSlice;