import {Statline} from "@/types/types";

type StatlineProps = {
    games? : boolean,
    season? : boolean,
    result? : boolean,
    lineupSpot? : boolean,
    playerName? : boolean,
}

function StatlineHeader(props : StatlineProps) {

    return <>
                {props.result && (
                    <th>Game</th>
                )}
                {props.lineupSpot && (
                    <th>LineupSpot</th>
                )}
                {props.season && (
                    <th>Season</th>
                )}
                {props.playerName && (
                    <th>Player</th>
                )}
                {props.games && (
                    <th>Games</th>
                )}
                <th>AB</th>
                <th>Hits</th>
                <th>1B</th>
                <th>2B</th>
                <th>3B</th>
                <th>HR</th>
                <th>BB</th>
                <th>R</th>
                <th>RBI</th>
                <th>AVG</th>
                <th>OBP</th>
                <th>SLG</th>
                <th>OPS</th>
    </>
}

export default StatlineHeader;