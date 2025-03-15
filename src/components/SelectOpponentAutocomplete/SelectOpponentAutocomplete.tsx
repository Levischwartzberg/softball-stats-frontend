import {Opponent, Player} from "@/types/types";
import {Autocomplete, TextField} from "@mui/material";

type SelectPlayerAutocompleteProps= {
    opponent? : Opponent
    opponents : Opponent[];
    setSelectedOpponent : (opponent : Opponent) => void;
}

function SelectOpponentAutocomplete(props : SelectPlayerAutocompleteProps) {

    return <Autocomplete
        disablePortal
        value={props.opponent ? props.opponent : null}
        blurOnSelect={true}
        options={props.opponents}
        getOptionLabel={(opponent) => opponent.teamName}
        sx={{ width: 300 }}
        onChange={(event, value) => props.setSelectedOpponent(value!)}
        renderInput={(params) => <TextField {...params} label="Opponent" />}
    />

}

export default SelectOpponentAutocomplete;