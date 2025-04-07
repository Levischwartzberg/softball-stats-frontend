import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {CreatePlayerDTO, Player} from "@/types/types";
import {RootState} from "@/store/store";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const PLAYERS_TAG = "PlayersTag";

export const playerApiSlice = createApi({

    reducerPath: "players",

    tagTypes: [PLAYERS_TAG],

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

        getPlayers: build.query<Player[], void>({
            query: () => "/players",
        }),

        getPlayerInfo: build.query<Player, number>({
            query: (playerId) => `playerInfo/${playerId}`,
        }),

        createPlayer: build.mutation<Player, CreatePlayerDTO>({
            query: (createPlayerDTO: CreatePlayerDTO) => ({
                url: "/createPlayer",
                method: "POST",
                body: createPlayerDTO,
            }),
            transformResponse: (response: { message: string; player: Player }) => response.player,
            invalidatesTags: (result, error) => error ? [] : [PLAYERS_TAG]
        })
    }),

});

export const {
    useGetPlayersQuery,
    useGetPlayerInfoQuery,
    useCreatePlayerMutation
} = playerApiSlice;