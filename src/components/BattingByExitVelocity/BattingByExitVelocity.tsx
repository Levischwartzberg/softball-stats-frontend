import {BattingResultsByExitVelocity} from "@/types/types";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import BattingByExitVelocityPlot from "@/components/BattingByExitVelocity/BattingByExitVelocityPlot";
import {useState} from "react";
import css from "./BattingByExitVelocity.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export enum StatTypeENUM {
    AVG = "AVG",
    SLG = "SLG"
}

type BattingByExitVelocityProps = {
    data : BattingResultsByExitVelocity[];
    launchAngle: string;
    setLaunchAngle: (angle: string) => void;
}

const BattingByExitVelocity = ({data, launchAngle, setLaunchAngle}: BattingByExitVelocityProps) => {

    const [statType, setStatType] = useState<StatTypeENUM>(StatTypeENUM.AVG);

    return <Box>
        <FormControl variant="outlined">
            <InputLabel id="launchAngle">Launch Angle</InputLabel>
            <Select
                className={css.dropdowns}
                labelId="launchAngle"
                id="laucnhAngleSelect"
                value={launchAngle}
                label="Launch Angle"
                onChange={(e) => setLaunchAngle(e.target.value)}
                IconComponent={ExpandMoreIcon}
                sx={{ textAlign: 'left', backgroundColor: 'white' }}
            >
                <MenuItem value="ALL">All</MenuItem>
                <MenuItem value="GROUNDBALL">Groundball</MenuItem>
                <MenuItem value="LINER">Line Drive</MenuItem>
                <MenuItem value="FLYBALL">Flyball</MenuItem>
                <MenuItem value="POPUP">Popup</MenuItem>
            </Select>
        </FormControl>

        <FormControl variant="outlined">
            <InputLabel id="statType">Stat Type</InputLabel>
            <Select
                className={css.dropdowns}
                style={{textAlign: "left"}}
                value={statType}
                label="Stat Type"
                onChange={(e) => setStatType(e.target.value as StatTypeENUM)}
            >
                <MenuItem value="AVG">
                    Batting Average
                </MenuItem>
                <MenuItem value="SLG">
                    Slugging Percentage
                </MenuItem>
            </Select>
        </FormControl>

        <br/>
        <br/>
        <BattingByExitVelocityPlot data={data} statType={statType} />
    </Box>
}

export default BattingByExitVelocity;
