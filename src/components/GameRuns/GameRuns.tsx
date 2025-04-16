import {GameInfo, Inning} from "@/types/types";

type RunsByInningProps = {
    opponentName : string | undefined;
    homeAway : boolean | undefined;
    gameInfo : GameInfo;
    innings : Inning[];
}

const GameRuns = (props : RunsByInningProps) => {

    const mortsRuns = props.innings.flatMap(inning => inning.atBats).map(atBat => atBat.runs.length).reduce((partialSum, a) => partialSum + a, 0);

    if (props.homeAway !== undefined) {
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
                <tr>
                    <td>
                        {props.opponentName ? props.opponentName : "Unknown"}
                    </td>
                    {props.innings.map(inning => <td>{inning.opponentRuns}</td>)}
                    <td>
                        {props.innings.map(inning => inning.opponentRuns ? inning.opponentRuns : 0).reduce((partialSum, a) => partialSum + a, 0)}
                    </td>
                </tr>
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
                <tr>
                    <td>
                        {props.opponentName ? props.opponentName : "Unknown"}
                    </td>
                    {props.innings.map(inning => <td>{inning.opponentRuns}</td>)}
                    <td>
                        {props.innings.map(inning => inning.opponentRuns ? inning.opponentRuns : 0).reduce((partialSum, a) => partialSum + a, 0)}
                    </td>
                </tr>
                </tbody>
            )}
        </table>
    }
    else return (
        <table>
            <tr>
                <th>
                    Team
                </th>
                <th>
                    Total
                </th>
            </tr>
            {mortsRuns >= props.gameInfo.runsAgainst! && (
                <tr>
                    <td>
                        Morts
                    </td>
                    <td>
                        {mortsRuns}
                    </td>
                </tr>
            )}
            <tr>
                <td>
                    {props.opponentName ? props.opponentName : "Unknown"}
                </td>
                <td>
                    {props.gameInfo.runsAgainst}
                </td>
            </tr>
            {mortsRuns < props.gameInfo.runsAgainst! && (
                <tr>
                    <td>
                        Morts
                    </td>
                    <td>
                        {mortsRuns}
                    </td>
                </tr>
            )}
        </table>
    )
}

export default GameRuns;