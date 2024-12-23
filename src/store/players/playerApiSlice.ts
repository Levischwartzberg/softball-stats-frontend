import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Player} from "@/types/types";

export const playerApiSlice = createApi({

    reducerPath: "players",

    baseQuery: fetchBaseQuery({
        baseUrl: `https://cert-manager-htb.heretobeeratmorts.com/api/player/`,
    }),

    endpoints: (build) => ({

        getPlayers: build.query<Player[], void>({
            query: () => "/",
        }),
    }),

});

export const {
    useGetPlayersQuery
} = playerApiSlice;