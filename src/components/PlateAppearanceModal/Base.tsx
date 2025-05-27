import {Player} from "@/types/types";
import {MenuItem, Select} from "@mui/material";
import css from "@/components/ScorekeepingTable/EditPlateAppearanceModal/EditPlateAppearanceModal.module.scss";

type BaseProps = {
    base : BaseENUM;
    runner : Player | null;
    className : string;
}

export enum BaseENUM {
    FIRST = "first",
    SECOND = "second",
    THIRD = "third"
}

function Base(props : BaseProps) {

    console.log(props.runner);

    return (
        <div style={props.runner !== undefined ? {backgroundColor : "yellow"} : {}} className={props.className}>
            <div className={css.initial}>
                {props.runner !== undefined ? `${props.runner?.firstName[0]}${props.runner?.lastName[0]}` : ""}
            </div>
        </div>
    )
}

export default Base;