import {Player} from "../../../types/types";
import {Box, Button, MenuItem, Modal, Select, Typography} from "@mui/material";
import {useState} from "react";
import css from "./SelectPlayerModal.module.scss";

type SelectPlayerModalProps = {
    title : string;
    lineupSpot : number;
    open : boolean;
    players : Player[];
    lineup : Player[];
    closeModal : (close : boolean) => void;
    setLineup : (lineup : Player[]) => void;
}

function SelectPlayerModal(props : SelectPlayerModalProps) {

    const [selectedPlayerId, setSelectedPlayerId] = useState(props.lineup.length > props.lineupSpot ? props.lineup[props.lineupSpot].id : 0);

    const selectPlayer = () => {
        const selectedPlayer = props.players.find(player => player.id === selectedPlayerId) as Player;
        const modifiedLineup = [...props.lineup];
        modifiedLineup[props.lineupSpot] = selectedPlayer;
        props.setLineup(modifiedLineup);
        props.closeModal(false);
        setSelectedPlayerId(0);
    }

    return <Modal open={props.open} onClose={props.closeModal} className={css.modal}>
        <>
            <Typography> {props.title} </Typography>
            <Box>
                <Select
                    value={selectedPlayerId}
                    label="Player"
                    onChange={(e) => setSelectedPlayerId(e.target.value as number)}
                >
                    <MenuItem selected value={0}>
                        Select Player
                    </MenuItem>
                    {props.players.map(player => (
                        <MenuItem value={player.id}>
                            {`${player.lastName}, ${player.firstName}`}
                        </MenuItem>
                    ))}
                </Select>
                <Button onClick={selectPlayer} disabled={selectedPlayerId === 0}>
                    Select Player
                </Button>
            </Box>
        </>
    </Modal>
}

export default SelectPlayerModal;