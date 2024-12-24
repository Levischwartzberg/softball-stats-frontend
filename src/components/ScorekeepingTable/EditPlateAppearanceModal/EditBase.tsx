import {Player} from "../../../types/types";
import {MenuItem, Select} from "@mui/material";
import css from "./EditPlateAppearanceModal.module.scss";

type BaseProps = {
    base : BaseENUM;
    runner : Player | null;
    className : string;
    availablePlayers : Player[];
    setSelectedRunner : (player : Player | null, base : BaseENUM) => void;
}

export enum BaseENUM {
    FIRST = "first",
    SECOND = "second",
    THIRD = "third"
}

function EditBase(props : BaseProps) {

    const selectedPlayerId = props.runner !== null ? props.runner.id : 0;

    const selectPlayer = (playerId : number) => {
        if (playerId === 0) {
            props.setSelectedRunner(null, props.base);
        } else {
            props.setSelectedRunner(props.availablePlayers.find(player => player.id === playerId)!, props.base)
        }
    }

    return (
        <div style={props.runner !== null ? {backgroundColor : "yellow"} : {}} className={props.className}>
            <Select
                style={{opacity : "0", zIndex : "2"}}
                value={selectedPlayerId}
                label=""
                onChange={(e) => selectPlayer(e.target.value as number)}
            >
                <MenuItem selected value={0}>
                    No Runner
                </MenuItem>
                {props.availablePlayers.map(player => (
                    <MenuItem value={player.id}>
                        {`${player.lastName}, ${player.firstName}`}
                    </MenuItem>
                ))}
            </Select>
            <div className={css.initial}>
                {props.runner !== null ? `${props.runner?.firstName[0]}${props.runner?.lastName[0]}` : ""}
            </div>
        </div>
    )
}

export default EditBase;