import {useParams} from "react-router-dom";
import React from "react";
import {
    useGetPlayerBattedBallDataQuery,
} from "@/store/playerBattedBallData/playerBattedBallDataApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";

import PlayerBattedBallDataTable from "@/components/PlayerBattedBallDataTable/PlayerBattedBallDataTable";
import {Typography} from "@mui/material";
import {useGetPlayerInfoQuery} from "@/store/players/playerApiSlice";

const AdvancedPlayerDataPage = () => {

    const {playerId} = useParams();

    const getPlayerBattedBallDataQuery = useGetPlayerBattedBallDataQuery(parseInt(playerId!));
    const getPlayerInfo = useGetPlayerInfoQuery(parseInt(playerId!));

    return (
        <div className="content">
            <AsyncStateWrapper query={getPlayerInfo as QueryState} >
                <Typography variant="h4">
                    Advanced Metrics
                </Typography>
                {getPlayerInfo.data && (
                    <Typography variant="h5">
                        {getPlayerInfo.data!.firstName} {getPlayerInfo.data!.lastName}
                    </Typography>
                )}

                <AsyncStateWrapper query={getPlayerBattedBallDataQuery as QueryState}>
                    <PlayerBattedBallDataTable data={getPlayerBattedBallDataQuery.data!} />
                </AsyncStateWrapper>
            </AsyncStateWrapper>
        </div>
    )
}

export default AdvancedPlayerDataPage;
