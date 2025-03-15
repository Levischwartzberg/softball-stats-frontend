import {Player} from "@/types/types";
import {Autocomplete, TextField} from "@mui/material";

type SelectPlayerAutocompleteProps= {
    player? : Player
    index : number,
    players : Player[];
    setSelectedPlayer : (player : Player, index : number) => void;
}

function SelectPlayerAutocomplete(props : SelectPlayerAutocompleteProps) {

    return <Autocomplete
            disablePortal
            value={props.player ? props.player : null}
            blurOnSelect={true}
            options={props.players}
            getOptionLabel={(player) => player.firstName + " " + player.lastName}
            sx={{ width: 300 }}
            onChange={(event, value) => props.setSelectedPlayer(value!, props.index)}
            renderInput={(params) => <TextField {...params} label="Player" />}
        />

}

export default SelectPlayerAutocomplete;