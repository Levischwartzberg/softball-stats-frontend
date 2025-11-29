import {useGetRunExpectancyDataQuery} from "@/store/runExpectancy/runExpectancyApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import RunExpectancyMatrix from "@/components/RunExpectancyMatrix/RunExpectancyMatrix";
import ResultRunValueTable from "@/components/ResultRunValueTable/ResultRunValueTable";
import {useGetTeamBattedBallDataQuery} from "@/store/teamBattedBallData/teamBattedBallDataApiSlice";
import PlayerBattedBallWRCPlusTable, {
    LaunchAngle,
    Region
} from "@/components/PlayerBattedBallWRCPlusTable/PlayerBattedBallWRCPlusTable";
import React, {useEffect, useState} from "react";
import PlayerBattedBallSLGTable from "@/components/PlayerBattedBallSLGTable/PlayerBattedBallSLGTable";
import PlayerBattedBallAVGTable from "@/components/PlayerBattedBallAVGTable/PlayerBattedBallAVGTable";
import {Accordion, AccordionDetails, AccordionSummary, Box, Paper, Tooltip} from "@mui/material";
import BattedBallBoxPlot from "@/components/BattedBallBoxPlot/BattedBallBoxPlot";
import BattedBallScatterPlot from "@/components/BattedBallScatterPlot/BattedBallScatterPlot";
import InfoIcon from "@mui/icons-material/Info";
import LaunchAnglePieChart from "@/components/LaunchAnglePieChart/LaunchAnglePieChart";
import RegionPieChart from "@/components/RegionPieChart/RegionPieChart";
import {
    useLazyGetTeamBattingByExitVelocityQuery
} from "@/store/teamBattingByExitVelocity/teamBattingByExitVelocityApiSlice";
import BattingByExitVelocity from "@/components/BattingByExitVelocity/BattingByExitVelocity";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GenericAccordion from "@/components/common/GenericAccordion/GenericAccordion";

const TeamMetricsPage = () => {

    const [selectedFilter, setSelectedFilter] = useState(null as { region : Region | null, launchAngle: LaunchAngle | null } | null);
    const [launchAngle, setLaunchAngle] = useState("ALL");

    const getRunExpectancyDataQuery = useGetRunExpectancyDataQuery();
    const getTeamBattedBallDataQuery = useGetTeamBattedBallDataQuery();
    const [getTeamBattingByExitVelocityTrigger, getTeamBattingByExitVelocityQuery] = useLazyGetTeamBattingByExitVelocityQuery();

    useEffect(() => {
        getTeamBattingByExitVelocityTrigger(launchAngle);
    }, [launchAngle])

    const wrcPlusTooltip = 'WRC+ uses the expected runs for each result which are then applied to all results in the sample set, normalizing to an average of 100.';

    return <div className="content">
        <AsyncStateWrapper query={getRunExpectancyDataQuery as QueryState}>
            <AsyncStateWrapper query={getTeamBattedBallDataQuery as QueryState}>
                <GenericAccordion
                    title={<h1>Run Expectancy Data</h1>}
                    content={
                        <Box display="flex" gap={4}>
                            <RunExpectancyMatrix runExpectancyData={getRunExpectancyDataQuery.data!} />
                            <ResultRunValueTable runExpectancyData={getRunExpectancyDataQuery.data!} />
                        </Box>
                    }
                    defaultExpanded={true}
                />
                <GenericAccordion
                    title={<h1>Batted Ball Data (Regions and Launch)</h1>}
                    content={
                        <>
                            <Box
                                display="flex"
                                flexDirection={{ xs: 'column', md: 'row' }}
                                gap={2}
                            >
                                <Box display="flex"
                                     flexDirection="column"
                                     justifyContent="space-between"
                                     flex={1}
                                     minHeight="600px"
                                >
                                    <h3>WRC+ <Tooltip title={wrcPlusTooltip}><InfoIcon/></Tooltip> By Region And Launch Angle</h3>
                                    <PlayerBattedBallWRCPlusTable data={getTeamBattedBallDataQuery.data!} setSelectedFilter={setSelectedFilter} />
                                    <h3>SLG By Region And Launch Angle</h3>
                                    <PlayerBattedBallSLGTable data={getTeamBattedBallDataQuery.data!} />
                                    <h3>AVG By Region And Launch Angle</h3>
                                    <PlayerBattedBallAVGTable data={getTeamBattedBallDataQuery.data!} />
                                </Box>
                                <Box display="flex"
                                     flexDirection="column"
                                     gap={4}
                                     flex={1}
                                     minWidth={0}
                                >
                                    <BattedBallBoxPlot data={getTeamBattedBallDataQuery.data!} filter={selectedFilter} />
                                    <BattedBallScatterPlot data={getTeamBattedBallDataQuery.data!} filter={selectedFilter} />
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="left"
                                alignItems="flex-start"
                                sx={{ marginTop: 2 }}
                                gap={4}
                            >
                                <LaunchAnglePieChart data={getTeamBattedBallDataQuery.data!} filter={selectedFilter}/>
                                <RegionPieChart data={getTeamBattedBallDataQuery.data!} filter={selectedFilter}/>
                            </Box>
                        </>
                    }
                />
                <GenericAccordion
                    title={<h1>Batting Results By Exit Velocity</h1>}
                    content={
                        <AsyncStateWrapper query={getTeamBattingByExitVelocityQuery as QueryState} heightPadding={200}>
                            <BattingByExitVelocity data={getTeamBattingByExitVelocityQuery.data!} launchAngle={launchAngle} setLaunchAngle={setLaunchAngle} />
                        </AsyncStateWrapper>
                    }
                />
            </AsyncStateWrapper>
        </AsyncStateWrapper>
    </div>
}

export default TeamMetricsPage;
