import {Result, Season, Statline} from "../../types/types";
import {TableCell, TableRow} from "@mui/material";
import {Link} from "react-router-dom";

type StatlineProps = {
    statline : Statline,
    season? : Season,
    result? : Result,
}

function StatlineData(props : StatlineProps) {

    const stats = props.statline;

    const roundRates = (rate : number ) => {
        return (rate >= 1) ? rate.toPrecision(4) : rate.toPrecision(3);
    }

    return (<TableRow>
                    {props.result && (
                        <TableCell>
                            <Link to={`/game/${props.result.id}`}>
                                {props.result.date.toString()}
                            </Link>
                        </TableCell>
                    )}
                    {stats.lineupSpot !== undefined && (
                        <TableCell>{stats.lineupSpot}</TableCell>
                    )}
                    {props.season && (
                        <TableCell>{`${props.season.session} ${props.season.year}`}</TableCell>
                    )}
                    {stats.games !== undefined && (
                        <TableCell>{stats.games}</TableCell>
                    )}
                    <TableCell>{stats.atBats}</TableCell>
                    <TableCell>{stats.hits}</TableCell>
                    <TableCell>{stats.singles}</TableCell>
                    <TableCell>{stats.doubles}</TableCell>
                    <TableCell>{stats.triples}</TableCell>
                    <TableCell>{stats.homeruns}</TableCell>
                    <TableCell>{stats.walks}</TableCell>
                    <TableCell>{stats.runs}</TableCell>
                    <TableCell>{stats.rbi}</TableCell>
                    <TableCell>{roundRates(stats.avg)}</TableCell>
                    <TableCell>{roundRates(stats.obp)}</TableCell>
                    <TableCell>{roundRates(stats.slg)}</TableCell>
                    <TableCell>{roundRates(stats.ops)}</TableCell>
                </TableRow>
    )
}

export default StatlineData;