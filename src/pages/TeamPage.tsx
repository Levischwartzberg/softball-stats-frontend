import PlayerTable from "../components/PlayerTable/PlayerTable";
import {useGetPlayersQuery} from "../store/players/playerApiSlice";
import AsyncStateWrapper, {QueryState} from "../components/common/AsyncStateWrapper";
import React from "react";

const TeamPage = () => {

    const useGetPlayers = useGetPlayersQuery();

    return (
        <div className="content">
            <h1 className="page-header">
                Players
            </h1>

            <AsyncStateWrapper query={useGetPlayers as QueryState} >
                <PlayerTable players={useGetPlayers.data!} />
            </AsyncStateWrapper>
        </div>
    )
}

export default TeamPage;