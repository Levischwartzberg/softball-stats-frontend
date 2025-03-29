import {Inning} from "@/types/types";
import {isNumber} from "@mui/base/unstable_useNumberInput/utils";
import css from "./RunsByInning.module.scss";

type RunsByInningProps = {
    opponentName : string | undefined;
    homeAway : boolean | undefined;
    innings : Inning[];
    setInnings : (inning : Inning[]) => void;
}

const OpponentRuns = (props : RunsByInningProps) => {

    const updateOpponentRuns = (runs : string, inningIndex : number) => {
        const inningsCopy = [...props.innings];

        if (isNumber(parseInt(runs))) {
            inningsCopy[inningIndex].opponentRuns = parseInt(runs);
        } else if (runs === "") {
            inningsCopy[inningIndex].opponentRuns = 0;
        } else return;

        props.setInnings(inningsCopy);
    }

    return <tr>
        <td>
            {props.opponentName ? props.opponentName : "Opponent"}
        </td>
        {props.innings.map((inning, index) => <td>
            <input
                className={css.opponentRunsInput}
                min={0}
                type="numeric"
                value={inning.opponentRuns}
                onChange={(event) => updateOpponentRuns(event.target.value!, index)}
            />
        </td>)}
        <td>
            {props.innings.map(inning => inning.opponentRuns ? inning.opponentRuns : 0).reduce((partialSum, a) => partialSum + a, 0)}
        </td>
    </tr>
}

const RunsByInning = (props : RunsByInningProps) => {

    if (props.homeAway === undefined) return <></>;

    return <table>
        <thead>
            <tr>
                <th>
                    Innings
                </th>
                {props.innings.map(inning => <th>{inning.inning}</th>)}
                <th>
                    Total
                </th>
            </tr>
        </thead>
        {props.homeAway ? (
            <tbody>
                <OpponentRuns opponentName={props.opponentName} homeAway={props.homeAway} innings={props.innings} setInnings={props.setInnings} />
                <tr>
                    <td>
                        Morts
                    </td>
                    {props.innings.map(inning => <td>{inning.atBats.map(atBat => atBat.runs.length).reduce((partialSum, a) => partialSum + a, 0)}</td>)}
                    <td>
                        {props.innings.flatMap(inning => inning.atBats).map(atBat => atBat.runs.length).reduce((partialSum, a) => partialSum + a, 0)}
                    </td>
                </tr>
            </tbody>
        ) : (
            <tbody>
                <tr>
                    <td>
                        Morts
                    </td>
                    {props.innings.map(inning => <td>{inning.atBats.map(atBat => atBat.runs.length).reduce((partialSum, a) => partialSum + a, 0)}</td>)}
                    <td>
                        {props.innings.flatMap(inning => inning.atBats).map(atBat => atBat.runs.length).reduce((partialSum, a) => partialSum + a, 0)}
                    </td>
                </tr>
                <OpponentRuns opponentName={props.opponentName} homeAway={props.homeAway} innings={props.innings} setInnings={props.setInnings} />
            </tbody>
        )}
    </table>
}

export default RunsByInning