import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "@/store/store";
import {PlayerBattedBallData} from "@/types/types";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const playerBattedBallDataApiSlice = createApi({

    reducerPath: "playerBattedBallData",

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

        getPlayerBattedBallData: build.query<PlayerBattedBallData, number>({
            query: (playerId : number) => `/playerBattedBallData/${playerId}`,
        }),
    }),

});

export const {
    useGetPlayerBattedBallDataQuery
} = playerBattedBallDataApiSlice;
