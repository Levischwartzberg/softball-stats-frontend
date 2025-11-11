import {GameInfo, Inning} from "@/types/types";
import {isNumber} from "@mui/base/unstable_useNumberInput/utils";
import css from "./RunsByInning.module.scss";
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";

type RunsByInningProps = {
    opponentName : string | undefined;
    homeAway? : boolean | undefined;
    gameInfo? : GameInfo;
    innings : Inning[];
    setGameInfo? : (gameInfo : GameInfo) => void;
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

        const totalOpponentRuns = inningsCopy.map(inning => inning.opponentRuns ? inning.opponentRuns : 0).reduce((partialSum, a) => partialSum + a, 0);

        const modifiedGameInfo = {...props.gameInfo};
        modifiedGameInfo.runsAgainst = totalOpponentRuns;

        if (props.setGameInfo && props.gameInfo) {
            props.setGameInfo(modifiedGameInfo as GameInfo);
        }
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

    const trimmedInnings = props.innings;

    const totalOpponentRuns = props.innings.map(inning => inning.opponentRuns ? inning.opponentRuns : 0).reduce((partialSum, a) => partialSum + a, 0);
    const totalMortsRuns = props.innings.flatMap(inning => inning.atBats).map(atBat => atBat.runs.length).reduce((partialSum, a) => partialSum + a, 0);

    if (props.homeAway) {
        const lastInning = trimmedInnings[trimmedInnings.length-1];
        if (totalOpponentRuns >= totalMortsRuns && lastInning.atBats.length < 1) {
            trimmedInnings.pop();
        } else if (totalMortsRuns > totalOpponentRuns && lastInning.atBats.map(atBat => atBat.outs.length).reduce((partialSum, a) => partialSum + a, 0) === 3) {
            trimmedInnings.push({inning : lastInning.inning+1, atBats : []});
        }
    } else {
        if (trimmedInnings[trimmedInnings.length-1].atBats.length < 1) {
            trimmedInnings.pop();
        }
    }

    const updateOpponentRuns = (runs : string) => {
        if (isNumber(parseInt(runs)) || runs === "") {
            const modifiedGameInfo = {...props.gameInfo};
            modifiedGameInfo.runsAgainst = parseInt(runs);

            if (props.setGameInfo && props.gameInfo) {
                props.setGameInfo(modifiedGameInfo as GameInfo);
            }
        }
    }

    if (props.homeAway === undefined) return <FormControl sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-opp-runs">Total Opponent Runs</InputLabel>
            <OutlinedInput
                className="outlined-input"
                id="outlined-adornment-opp-runs"
                label="Total Opponent Runs"
                value={(props.gameInfo?.runsAgainst || props.gameInfo?.runsAgainst! > -1) ? props.gameInfo?.runsAgainst : ""}
                onChange={(event) => updateOpponentRuns(event.target.value)}
            />
        </FormControl>

    return <table>
        <thead>
            <tr>
                <th>
                    Innings
                </th>
                {trimmedInnings.map(inning => <th>{inning.inning}</th>)}
                <th>
                    Total
                </th>
            </tr>
        </thead>
        {props.homeAway ? (
            <tbody>
                <OpponentRuns opponentName={props.opponentName} homeAway={props.homeAway} innings={trimmedInnings} setInnings={props.setInnings} setGameInfo={props.setGameInfo} gameInfo={props.gameInfo} />
                <tr>
                    <td>
                        Morts
                    </td>
                    {trimmedInnings.map(inning => {
                        if (inning.atBats.length < 1) {
                            return <td>-</td>;
                        } else {
                            return <td>{inning.atBats.map(atBat => atBat.runs.length).reduce((partialSum, a) => partialSum + a, 0)}</td>;
                        }
                    }
                    )}
                    <td>
                        {trimmedInnings.flatMap(inning => inning.atBats).map(atBat => atBat.runs.length).reduce((partialSum, a) => partialSum + a, 0)}
                    </td>
                </tr>
            </tbody>
        ) : (
            <tbody>
                <tr>
                    <td>
                        Morts
                    </td>
                    {trimmedInnings.map(inning => <td>{inning.atBats.map(atBat => atBat.runs.length).reduce((partialSum, a) => partialSum + a, 0)}</td>)}
                    <td>
                        {trimmedInnings.flatMap(inning => inning.atBats).map(atBat => atBat.runs.length).reduce((partialSum, a) => partialSum + a, 0)}
                    </td>
                </tr>
                <OpponentRuns opponentName={props.opponentName} homeAway={props.homeAway} innings={props.innings} setInnings={props.setInnings} setGameInfo={props.setGameInfo} gameInfo={props.gameInfo} />
            </tbody>
        )}
    </table>
}

export default RunsByInning