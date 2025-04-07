import {GameInfo, Opponent} from "@/types/types";
import {Autocomplete, Button, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import CreateNewOpponentModal from "@/components/CreateNewOpponentModal/CreateNewOpponentModal";

type SelectPlayerAutocompleteProps= {
    gameInfo? : GameInfo;
    opponents : Opponent[];
    setSelectedOpponent : (opponent : Opponent) => void;
    setGameInfo? : (gameInfo : GameInfo) => void;
}

function SelectOpponentAutocomplete(props : SelectPlayerAutocompleteProps) {

    const [createNewOpponentModalOpen, setCreateNewOpponentModalOpen] = useState(false);

    return <div style={{display : "flex"}}>
        <CreateNewOpponentModal open={createNewOpponentModalOpen} gameInfo={props.gameInfo} setOpen={setCreateNewOpponentModalOpen} setGameInfo={props.setGameInfo} />
        <Autocomplete
            disablePortal
            defaultValue={props.gameInfo?.opponent ? props.gameInfo.opponent : null}
            blurOnSelect={true}
            options={props.opponents}
            getOptionLabel={(opponent) => opponent.teamName}
            sx={{ width: 300 }}
            onChange={(event, value) => props.setSelectedOpponent(value!)}
            renderInput={(params) => <TextField {...params} label="Opponent" />}
        />
        <Button onClick={() => setCreateNewOpponentModalOpen(!createNewOpponentModalOpen)}>
            <AddIcon />
        </Button>
    </div>

}

export default SelectOpponentAutocomplete;