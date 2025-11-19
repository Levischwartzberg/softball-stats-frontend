import {useGetRunExpectancyDataQuery} from "@/store/runExpectancy/runExpectancyApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import RunExpectancyMatrix from "@/components/RunExpectancyMatrix/RunExpectancyMatrix";
import ResultRunValueTable from "@/components/ResultRunValueTable/ResultRunValueTable";
import {useGetTeamBattedBallDataQuery} from "@/store/teamBattedBallData/teamBattedBallDataApiSlice";
import PlayerBattedBallWRCPlusTable, {
    LaunchAngle,
    Region
} from "@/components/PlayerBattedBallWRCPlusTable/PlayerBattedBallWRCPlusTable";
import {useState} from "react";
import PlayerBattedBallSLGTable from "@/components/PlayerBattedBallSLGTable/PlayerBattedBallSLGTable";
import PlayerBattedBallAVGTable from "@/components/PlayerBattedBallAVGTable/PlayerBattedBallAVGTable";
import {Box} from "@mui/material";
import BattedBallBoxPlot from "@/components/BattedBallBoxPlot/BattedBallBoxPlot";

const TeamMetricsPage = () => {

    const [selectedFilter, setSelectedFilter] = useState(null as { region : Region | null, launchAngle: LaunchAngle | null } | null);

    const getRunExpectancyDataQuery = useGetRunExpectancyDataQuery();
    const getTeamBattedBallDataQuery = useGetTeamBattedBallDataQuery();

    return <div className="content">
        <AsyncStateWrapper query={getRunExpectancyDataQuery as QueryState}>
            <AsyncStateWrapper query={getTeamBattedBallDataQuery as QueryState}>
                <Box display="flex" gap={4}>
                    <RunExpectancyMatrix runExpectancyData={getRunExpectancyDataQuery.data!} />
                    <ResultRunValueTable runExpectancyData={getRunExpectancyDataQuery.data!} />
                </Box>
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
                        <h3>WRC By Region And Launch Angle</h3>
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
                    >
                        <BattedBallBoxPlot data={getTeamBattedBallDataQuery.data!} filter={selectedFilter} />
                    </Box>
                </Box>
            </AsyncStateWrapper>
        </AsyncStateWrapper>
    </div>
}

export default TeamMetricsPage;
