import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "@/store/store";
import {RunExpectancyData} from "@/types/types";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const runExpectancyApiSlice = createApi({

    reducerPath: "runExpectancy",

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

        getRunExpectancyData: build.query<RunExpectancyData, void>({
            query: () => "/runExpectancyData",
        }),
    }),

});

export const {
    useGetRunExpectancyDataQuery
} = runExpectancyApiSlice;
