import React from "react";
import AsyncStateWrapper, {QueryState} from "../components/common/AsyncStateWrapper";
import { useParams } from 'react-router-dom';
import {useGetLifetimeStatsQuery} from "../store/playerLifetimeStats/playerLifetimeStatsApiSlice";
import StatlineData from "../components/Statline/StatlineData";
import {useGetSeasonStatsQuery} from "../store/playerSeasonStats/playerSeasonStatsApiSlice";
import StatlineHeader from "../components/Statline/StatlineHeader";
import {Table} from "@mui/material";
import PlayerSeasonStatsTable from "../components/PlayerSeasonStatsTable/PlayerSeasonStatsTable";

const PlayerPage = () => {

    const {playerId} = useParams();

    const useGetPlayerLifetimeStats = useGetLifetimeStatsQuery(parseInt(playerId!));
    const useGetPlayerSeasonStats = useGetSeasonStatsQuery(parseInt(playerId!));

    console.log(useGetPlayerSeasonStats.data);

    return (
        <>
            Player Page

            <AsyncStateWrapper query={useGetPlayerLifetimeStats as QueryState} >
                <h3>
                    Lifetime Stats
                </h3>
                <Table>
                    <StatlineHeader statline={useGetPlayerLifetimeStats.data!} season={false}/>
                    <StatlineData statline={useGetPlayerLifetimeStats.data!} />
                </Table>
            </AsyncStateWrapper>

            {
                useGetPlayerSeasonStats.data && (
                    <AsyncStateWrapper query={useGetPlayerSeasonStats as QueryState} >
                        <h3>
                            Season Stats
                        </h3>
                        <PlayerSeasonStatsTable seasonStats={useGetPlayerSeasonStats.data!} />
                    </AsyncStateWrapper>
                )
            }
        </>
    )
}

export default PlayerPage;