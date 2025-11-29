import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "@/store/store";
import {BattingResultsByExitVelocity} from "@/types/types";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const teamBattingByExitVelocityApiSlice = createApi({

    reducerPath: "teamBattingByExitVelocity",

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

        getTeamBattingByExitVelocity: build.query<BattingResultsByExitVelocity[], string>({
            query: (launchAngle) => `/teamBattingByExitVelocity/${launchAngle}`,
        }),
    }),

});

export const {
    useLazyGetTeamBattingByExitVelocityQuery
} = teamBattingByExitVelocityApiSlice;
