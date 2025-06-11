import {BoxscoreDTO} from "@/store/boxscore/boxscoreDTO";

type LineScoreProps = {
    boxscoreDTO : BoxscoreDTO;
}

const LineScore = (props : LineScoreProps) => {

    const innings = props.boxscoreDTO.innings;

    if (innings.map(inning => inning.opponentRuns).filter(runs => runs !== undefined).reduce((partialSum, a) => partialSum! + a!, 0) !== props.boxscoreDTO.gameInfo.runsAgainst) {
        return <></>
    }

    return <table>
        <thead>
        <tr>
            <th>
                Innings
            </th>
            {innings.map(inning => <th key={inning.inning}>{inning.inning}</th>)}
            <th>
                Total
            </th>
        </tr>
        </thead>
        {props.boxscoreDTO.gameInfo.home ? (
            <tbody>
            <tr>
                <td>{props.boxscoreDTO.gameInfo.opponent?.teamName ?? "unknown"}</td>
                {innings.map(inning => <td key={inning.inning}>{inning.opponentRuns}</td>)}
                <td>
                    {innings.map(inning => inning.opponentRuns).reduce((partialSum, a) => partialSum! + a!, 0)}
                </td>
            </tr>
            <tr>
                <td>
                    Morts
                </td>
                {innings.map(inning => <td key={inning.inning}>{inning.mortsRuns ?? "-"}</td>)}
                <td>
                    {innings.map(inning => inning.mortsRuns).filter(runs => runs !== undefined).reduce((partialSum, a) => partialSum! + a!, 0)}
                </td>
            </tr>
            </tbody>
        ) : (
            <tbody>
                <tr>
                    <td>
                        Morts
                    </td>
                    {innings.map(inning => <td key={inning.inning}>{inning.mortsRuns}</td>)}
                    <td>
                        {innings.map(inning => inning.mortsRuns).reduce((partialSum, a) => partialSum! + a!, 0)}
                    </td>
                </tr>
                <tr>
                    <td>{props.boxscoreDTO.gameInfo.opponent?.teamName ?? "unknown"}</td>
                    {innings.map(inning => <td key={inning.inning}>{inning.opponentRuns ?? "-"}</td>)}
                    <td>
                        {innings.map(inning => inning.opponentRuns).filter(runs => runs !== undefined).reduce((partialSum, a) => partialSum! + a!, 0)}
                    </td>
                </tr>
            </tbody>
        )}
    </table>
}

export default LineScore;