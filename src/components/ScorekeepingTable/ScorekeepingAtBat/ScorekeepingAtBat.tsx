import {AtBat, AtBatResult} from "../../../types/types";
import css from "./ScorekeepingAtBat.module.scss";
import Base from "./Base";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

type ScorekeepingAtBatProps = {
    atBat : AtBat | null,
    canEdit : boolean,
    inningUpUntil? : AtBat[]
}

function ScorekeepingAtBat(props : ScorekeepingAtBatProps) {

    if (props.atBat === null) {
        if (props.canEdit) {
            return <AddCircleOutlineIcon />
        }
        return <></>
    }
    else if (props.atBat.result && (props.atBat.result === AtBatResult.SKIP || props.atBat.result.toString() === "SKIP")) {
        return <div style={{textAlign : "center"}}>
            <p>No PA</p>
            <ArrowDownwardIcon />
        </div>
    }
    return (
        <>
            <div>
                <div className={css.result}>
                    {props.atBat.scoring}
                </div>
                <div className={css.runsOnPlay}>
                    {props.atBat.runs.length > 0 ? `+${props.atBat.runs.length}!` : ""}
                </div>
            </div>
            <div className={css.diamond}>
                <Base className={css.firstBase} hasRunner={props.atBat.baserunners.first !== undefined && props.atBat.baserunners.first !== null} />
                <Base className={css.secondBase} hasRunner={props.atBat.baserunners.second !== undefined && props.atBat.baserunners.second !== null} />
                <Base className={css.thirdBase} hasRunner={props.atBat.baserunners.third !== undefined && props.atBat.baserunners.third !== null} />
            </div>
            <div>
                <div className={css.totalOuts}>
                    O: {props.inningUpUntil?.map(ab => ab.outs.length).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}
                </div>
                <div className={css.totalRuns}>
                    R: {props.inningUpUntil?.map(ab => ab.runs.length).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}
                </div>
            </div>
        </>
    )
}

export default ScorekeepingAtBat;