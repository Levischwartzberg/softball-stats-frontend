import PlayerTable from "../components/PlayerTable/PlayerTable";
import {useGetPlayersQuery} from "../store/players/playerApiSlice";
import AsyncStateWrapper, {QueryState} from "../components/common/AsyncStateWrapper";
import React from "react";

const TeamPage = () => {

    const useGetPlayers = useGetPlayersQuery();

    return (
        <>
            Players

            <AsyncStateWrapper query={useGetPlayers as QueryState} >
                <PlayerTable players={useGetPlayers.data!} />
            </AsyncStateWrapper>
        </>
    )
}

export default TeamPage;