import {Player, Result, Season, Statline} from "../../types/types";
import {TableCell, TableRow} from "@mui/material";
import {Link} from "react-router-dom";

type StatlineProps = {
    statline : Statline,
    season? : Season,
    result? : Result,
    player? : Player
}

function StatlineData(props : StatlineProps) {

    const stats = props.statline;

    const roundRates = (rate : number ) => {
        return (rate >= 1) ? rate.toPrecision(4) : rate.toPrecision(3);
    }

    return (<>
                    {props.result && (
                        <td>
                            <Link to={`/game/${props.result.id}`}>
                                {props.result.date.toString()}
                            </Link>
                        </td>
                    )}
                    {stats.lineupSpot !== undefined && (
                        <td>{stats.lineupSpot}</td>
                    )}
                    {props.season && (
                        <td>{`${props.season.session} ${props.season.year}`}</td>
                    )}
                    {props.player && (
                        <td>{`${props.player.lastName}, ${props.player.firstName}`}</td>
                    )}
                    {stats.games !== undefined && (
                        <td>{stats.games}</td>
                    )}
                    <td>{stats.atBats}</td>
                    <td>{stats.hits}</td>
                    <td>{stats.singles}</td>
                    <td>{stats.doubles}</td>
                    <td>{stats.triples}</td>
                    <td>{stats.homeruns}</td>
                    <td>{stats.walks}</td>
                    <td>{stats.runs}</td>
                    <td>{stats.rbi}</td>
                    <td>{roundRates(stats.avg)}</td>
                    <td>{roundRates(stats.obp)}</td>
                    <td>{roundRates(stats.slg)}</td>
                    <td>{roundRates(stats.ops)}</td>
                </>
    )
}

export default StatlineData;