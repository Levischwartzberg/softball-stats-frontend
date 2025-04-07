import {Player} from "@/types/types";
import {Autocomplete, Button, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import CreateNewPlayerModal from "@/components/CreateNewPlayerModal/CreateNewPlayerModal";

type SelectPlayerAutocompleteProps= {
    player? : Player
    index : number,
    players : Player[];
    setSelectedPlayer : (player : Player, index : number) => void;
}

function SelectPlayerAutocomplete(props : SelectPlayerAutocompleteProps) {

    const [createPlayerModalOpen, setCreatePlayerModalOpen] = useState(false);

    return <div style={{display : "flex"}}>
        <CreateNewPlayerModal open={createPlayerModalOpen} index={props.index} setOpen={setCreatePlayerModalOpen} setSelectedPlayer={props.setSelectedPlayer} />
        <Autocomplete
            disablePortal
            value={props.player ? props.player : null}
            blurOnSelect={true}
            options={props.players}
            getOptionLabel={(player) => player.firstName + " " + player.lastName}
            sx={{ width: 300 }}
            onChange={(event, value) => props.setSelectedPlayer(value!, props.index)}
            renderInput={(params) => <TextField {...params} label="Player" />}
        />
        <Button onClick={() => setCreatePlayerModalOpen(!createPlayerModalOpen)}>
            <AddIcon />
        </Button>
    </div>

}

export default SelectPlayerAutocomplete;