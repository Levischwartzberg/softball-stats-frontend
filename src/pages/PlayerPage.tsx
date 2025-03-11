import React, {useState} from "react";
import AsyncStateWrapper, {QueryState} from "../components/common/AsyncStateWrapper";
import {Select, MenuItem} from "@mui/material";
import { useParams } from 'react-router-dom';
import {useGetLifetimeStatsQuery} from "../store/playerLifetimeStats/playerLifetimeStatsApiSlice";
import StatlineData from "../components/Statline/StatlineData";
import {useGetSeasonStatsQuery} from "../store/playerSeasonStats/playerSeasonStatsApiSlice";
import StatlineHeader from "../components/Statline/StatlineHeader";
import PlayerInfo from "../components/PlayerInfo/PlayerInfo";
import {Table} from "@mui/material";
import PlayerSeasonStatsTable from "../components/PlayerSeasonStatsTable/PlayerSeasonStatsTable";
import {useGetPlayerInfoQuery} from "../store/players/playerApiSlice";
import {useLazyGetPlayerGameLogsQuery} from "@/store/playerGameLog/playerGameLogApiSlice";
import PlayerGameLog from "@/components/PlayerGameLog/PlayerGameLog";

const PlayerPage = () => {

    const {playerId} = useParams();
    const [selectedSeasonId, setSelectedSeasonId] = useState(0);

    const getPlayerInfo = useGetPlayerInfoQuery(parseInt(playerId!));
    const getPlayerLifetimeStatsQuery = useGetLifetimeStatsQuery(parseInt(playerId!));
    const getPlayerSeasonStatsQuery = useGetSeasonStatsQuery(parseInt(playerId!));
    const [getPlayerGameLogsTrigger, getPlayerGameLogsQuery] = useLazyGetPlayerGameLogsQuery();

    const updateSeasonForGameLogs = (seasonId : number) => {
        setSelectedSeasonId(seasonId);
        getPlayerGameLogsTrigger({playerId : parseInt(playerId!), seasonId : seasonId});
    }

    return (
        <>
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

                        <h3>
                            Game Logs
                        </h3>
                        <Select
                            value={selectedSeasonId}
                            label="Player"
                            onChange={(e) => updateSeasonForGameLogs(e.target.value as number)}
                        >
                            <MenuItem value={0}>
                                Season
                            </MenuItem>
                            {getPlayerSeasonStatsQuery.data.map(seasonStats => seasonStats.season).map(season => (
                                <MenuItem value={season.id}>
                                    {`${season.session}, ${season.year}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </AsyncStateWrapper>
                )
            }

            <AsyncStateWrapper query={getPlayerGameLogsQuery as QueryState} >
                <PlayerGameLog games={getPlayerGameLogsQuery.data!} />
            </AsyncStateWrapper>
        </>
    )
}

export default PlayerPage;