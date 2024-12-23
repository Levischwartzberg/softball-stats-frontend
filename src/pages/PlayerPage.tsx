import PlayerTable from "../components/PlayerTable/PlayerTable";
import {useGetPlayersQuery} from "../store/players/playerApiSlice";
import AsyncStateWrapper, {QueryState} from "../components/common/AsyncStateWrapper";
import CircularProgress from '@mui/material/CircularProgress';
import React from "react";

const PlayerPage = () => {

    const useGetPlayers = useGetPlayersQuery();

    return (
        <>
            Player Page

            <AsyncStateWrapper query={useGetPlayers as QueryState} >
                <PlayerTable players={useGetPlayers.data!} />
            </AsyncStateWrapper>
        </>
    )
}

export default PlayerPage;