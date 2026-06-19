import {PlayerBattedBallData} from "@/types/types";
import {Box, Tooltip, Typography} from "@mui/material";
import PlayerBattedBallWRCPlusTable, {
    LaunchAngle,
    Region
} from "@/components/PlayerBattedBallWRCPlusTable/PlayerBattedBallWRCPlusTable";
import PlayerBattedBallSLGTable from "@/components/PlayerBattedBallSLGTable/PlayerBattedBallSLGTable";
import PlayerBattedBallAVGTable from "@/components/PlayerBattedBallAVGTable/PlayerBattedBallAVGTable";
import {useState} from "react";
import InfoIcon from "@mui/icons-material/Info";
import BattedBallScatterPlot from "@/components/BattedBallScatterPlot/BattedBallScatterPlot";
import BattedBallBoxPlot from "@/components/BattedBallBoxPlot/BattedBallBoxPlot";
import LaunchAnglePieChart from "@/components/LaunchAnglePieChart/LaunchAnglePieChart";
import RegionPieChart from "@/components/RegionPieChart/RegionPieChart";

type BattedBallChartsProps = {
    data : PlayerBattedBallData;
}

const BattedBallCharts = (props : BattedBallChartsProps) => {

    const [selectedFilter, setSelectedFilter] = useState(null as { region : Region | null, launchAngle: LaunchAngle | null } | null);
    const wrcPlusTooltip = 'WRC+ uses the expected runs for each result which are then applied to all results in the sample set, normalizing to an average of 100.';

    return <>
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
                    <PlayerBattedBallWRCPlusTable data={props.data!} setSelectedFilter={setSelectedFilter} />
                </Box>

                <Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>SLG% By Region and Launch Angle</Typography>
                    <PlayerBattedBallSLGTable data={props.data!} />
                </Box>

                <Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>AVG By Region and Launch Angle</Typography>
                    <PlayerBattedBallAVGTable data={props.data!} />
                </Box>
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                gap={4}
                flex={1}
            >
                <BattedBallScatterPlot data={props.data!} filter={selectedFilter}/>
                <BattedBallBoxPlot data={props.data!} filter={selectedFilter}/>
            </Box>
        </Box>
        <Box
            display="flex"
            justifyContent="left"
            alignItems="flex-start"
            sx={{ marginTop: 2 }}
        >
            <LaunchAnglePieChart data={props.data!} filter={selectedFilter}/>
            <RegionPieChart data={props.data!} filter={selectedFilter}/>
        </Box>
    </>
}

export default BattedBallCharts;
