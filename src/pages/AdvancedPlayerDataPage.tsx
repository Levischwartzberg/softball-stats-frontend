import {useParams} from "react-router-dom";
import React, { useState } from "react";
import {
    useGetPlayerBattedBallDataQuery,
} from "@/store/playerBattedBallData/playerBattedBallDataApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";

import PlayerBattedBallWRCPlusTable, {
    LaunchAngle,
    Region
} from "@/components/PlayerBattedBallWRCPlusTable/PlayerBattedBallWRCPlusTable";
import {Box, Tooltip, Typography} from "@mui/material";
import {useGetPlayerInfoQuery} from "@/store/players/playerApiSlice";
import PlayerBattedBallSLGTable from "@/components/PlayerBattedBallSLGTable/PlayerBattedBallSLGTable";
import PlayerBattedBallAVGTable from "@/components/PlayerBattedBallAVGTable/PlayerBattedBallAVGTable";
import BattedBallBoxPlot from "@/components/BattedBallBoxPlot/BattedBallBoxPlot";
import BattedBallScatterPlot from "@/components/BattedBallScatterPlot/BattedBallScatterPlot";
import LaunchAnglePieChart from "@/components/LaunchAnglePieChart/LaunchAnglePieChart";
import RegionPieChart from "@/components/RegionPieChart/RegionPieChart";
import InfoIcon from "@mui/icons-material/Info";

const AdvancedPlayerDataPage = () => {
    const { playerId } = useParams();
    const getPlayerBattedBallDataQuery = useGetPlayerBattedBallDataQuery(parseInt(playerId!));
    const getPlayerInfo = useGetPlayerInfoQuery(parseInt(playerId!));

    const [selectedFilter, setSelectedFilter] = useState(null as { region : Region | null, launchAngle: LaunchAngle | null } | null);

    const wrcPlusTooltip = 'WRC+ uses the expected runs for each result which are then applied to all results in the sample set, normalizing to an average of 100.';

    return (
        <div className="content">
            <AsyncStateWrapper query={getPlayerInfo as QueryState}>
                <Typography variant="h4" gutterBottom>
                    Advanced Metrics
                </Typography>
                {getPlayerInfo.data && (
                    <Typography variant="h5" gutterBottom>
                        {getPlayerInfo.data.firstName} {getPlayerInfo.data.lastName}
                    </Typography>
                )}

                <AsyncStateWrapper query={getPlayerBattedBallDataQuery as QueryState}>
                    <Box
                        display="flex"
                        flexDirection={{ xs: 'column', md: 'row' }}
                        gap={4}
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            flex={1}
                            minHeight="600px"
                        >
                            <Box>
                                <Typography variant="h6" sx={{ mb: 1 }}>WRC+ <Tooltip title={wrcPlusTooltip}><InfoIcon/></Tooltip> By Region and Launch Angle</Typography>
                                <PlayerBattedBallWRCPlusTable data={getPlayerBattedBallDataQuery.data!} setSelectedFilter={setSelectedFilter} />
                            </Box>

                            <Box>
                                <Typography variant="h6" sx={{ mb: 1 }}>SLG% By Region and Launch Angle</Typography>
                                <PlayerBattedBallSLGTable data={getPlayerBattedBallDataQuery.data!} />
                            </Box>

                            <Box>
                                <Typography variant="h6" sx={{ mb: 1 }}>AVG By Region and Launch Angle</Typography>
                                <PlayerBattedBallAVGTable data={getPlayerBattedBallDataQuery.data!} />
                            </Box>
                        </Box>

                        <Box
                            display="flex"
                            flexDirection="column"
                            gap={4}
                            flex={1}
                        >
                            <BattedBallScatterPlot data={getPlayerBattedBallDataQuery.data!} filter={selectedFilter}/>
                            <BattedBallBoxPlot data={getPlayerBattedBallDataQuery.data!} filter={selectedFilter}/>
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent="left"
                        alignItems="flex-start"
                        sx={{ marginTop: 2 }}
                    >
                        <LaunchAnglePieChart data={getPlayerBattedBallDataQuery.data!} filter={selectedFilter}/>
                        <RegionPieChart data={getPlayerBattedBallDataQuery.data!} filter={selectedFilter}/>
                    </Box>
                </AsyncStateWrapper>
            </AsyncStateWrapper>
        </div>
    );
};

export default AdvancedPlayerDataPage;

