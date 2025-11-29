import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "@/store/store";
import {PlayerBattedBallData} from "@/types/types";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const teamBattedBallDataApiSlice = createApi({

    reducerPath: "teamBattedBallData",

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

        getTeamBattedBallData: build.query<PlayerBattedBallData, void>({
            query: () => `/teamBattedBallData`,
        }),
    }),

});

export const {
    useGetTeamBattedBallDataQuery
} = teamBattedBallDataApiSlice;
