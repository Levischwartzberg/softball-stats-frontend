import {Season} from "@/types/types";
import {MenuItem, Select} from "@mui/material";
import {useState} from "react";

type ChooseSeasonDropdownProps = {
    seasons : Season[],
    season : Season
    setSeason : (season : Season) => void;
}

const ChooseSeasonDropdown = (props : ChooseSeasonDropdownProps) => {

    const [selectedSeasonId, setSelectedSeasonId] = useState(props.season.id ? props.season.id : 0);

    const selectSeason = (seasonId : number) => {
        setSelectedSeasonId(seasonId);
        props.setSeason(props.seasons.find(season => season.id === seasonId)!);
    }

    return <Select
        value={selectedSeasonId}
        label="Player"
        onChange={(e) => selectSeason(e.target.value as number)}
    >
        <MenuItem selected value={0}>
            Select Season
        </MenuItem>
        {props.seasons.map(season  => (
            <MenuItem value={season.id}>
                {`${season.session} ${season.year}`}
            </MenuItem>
        ))}
    </Select>
}

 export default ChooseSeasonDropdown