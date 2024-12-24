import React from "react";
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import {Player} from "../../../types/types";
import {Theme, useTheme} from "@mui/material/styles";

type PlayerMultiselectProps = {

    title : string;
    availablePlayers : Player[];
    selectedPlayers : Player[];
    setSelectedPlayers: (players : Player[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    style: {
        zIndex: 1500
    },
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        zIndex: 1500,
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

const PlayerMultiselect : React.FC<PlayerMultiselectProps> = ({title, availablePlayers, selectedPlayers, setSelectedPlayers}) => {

    const theme = useTheme();

    const getPlayerObjects = (playerIds : number[]) : Player[] => {
        return availablePlayers.filter(player => playerIds.includes(player.id))!;
    }

    return <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">{title}</InputLabel>
        <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={selectedPlayers.map(player => player.id)}
            onChange={e => setSelectedPlayers(getPlayerObjects(e.target.value as number[]))}
            input={<OutlinedInput label={title} />}
            MenuProps={MenuProps}
        >
            {availablePlayers.map((player) => (
                <MenuItem
                    key={player.id}
                    value={player.id}
                    style={getStyles(`${player.lastName}, ${player.firstName}`,
                        selectedPlayers.map(player => `${player.lastName}, ${player.firstName}`),
                        theme)}
                >
                    {`${player.lastName}, ${player.firstName}`}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
}

export default PlayerMultiselect;