import React from "react";
import AsyncStateWrapper, {QueryState} from "../components/common/AsyncStateWrapper";
import { useParams } from 'react-router-dom';
import {useGetLifetimeStatsQuery} from "../store/playerLifetimeStats/playerLifetimeStatsApiSlice";
import StatlineData from "../components/Statline/StatlineData";
import {useGetSeasonStatsQuery} from "../store/playerSeasonStats/playerSeasonStatsApiSlice";
import StatlineHeader from "../components/Statline/StatlineHeader";
import PlayerInfo from "../components/PlayerInfo/PlayerInfo";
import {Table} from "@mui/material";
import PlayerSeasonStatsTable from "../components/PlayerSeasonStatsTable/PlayerSeasonStatsTable";
import {useGetPlayerInfoQuery} from "../store/players/playerApiSlice";

const PlayerPage = () => {

    const {playerId} = useParams();

    const getPlayerInfo = useGetPlayerInfoQuery(parseInt(playerId!));
    const getPlayerLifetimeStatsQuery = useGetLifetimeStatsQuery(parseInt(playerId!));
    const getPlayerSeasonStatsQuery = useGetSeasonStatsQuery(parseInt(playerId!));

    return (
        <>
            Player Page

            <AsyncStateWrapper query={getPlayerInfo as QueryState} >
                <PlayerInfo player={getPlayerInfo.data!} />
            </AsyncStateWrapper>

            <AsyncStateWrapper query={getPlayerLifetimeStatsQuery as QueryState} >
                <h3>
                    Lifetime Stats
                </h3>
                <Table>
                    <StatlineHeader statline={getPlayerLifetimeStatsQuery.data!} season={false}/>
                    <StatlineData statline={getPlayerLifetimeStatsQuery.data!} />
                </Table>
            </AsyncStateWrapper>

            {
                getPlayerSeasonStatsQuery.data && (
                    <AsyncStateWrapper query={getPlayerSeasonStatsQuery as QueryState} >
                        <h3>
                            Season Stats
                        </h3>
                        <PlayerSeasonStatsTable seasonStats={getPlayerSeasonStatsQuery.data!} />
                    </AsyncStateWrapper>
                )
            }
        </>
    )
}

export default PlayerPage;