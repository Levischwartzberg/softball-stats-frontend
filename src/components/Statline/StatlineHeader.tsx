import {Statline} from "../../types/types";
import {TableCell, TableHead, TableRow} from "@mui/material";
import css from "../Statline/Statline.module.scss";

type StatlineProps = {
    statline : Statline,
    season? : boolean,
    result? : boolean,
    lineupSpot? : boolean
}

function StatlineHeader(props : StatlineProps) {

    const stats = props.statline;

    return <TableHead>
                <TableRow className={css.header}>
                    {props.result && (
                        <TableCell>Game</TableCell>
                    )}
                    {props.lineupSpot && (
                        <TableCell>LineupSpot</TableCell>
                    )}
                    {props.season && (
                        <TableCell>Season</TableCell>
                    )}
                    {stats.games !== undefined && (
                        <TableCell>Games</TableCell>
                    )}
                    <TableCell>AB</TableCell>
                    <TableCell>Hits</TableCell>
                    <TableCell>1B</TableCell>
                    <TableCell>2B</TableCell>
                    <TableCell>3B</TableCell>
                    <TableCell>HR</TableCell>
                    <TableCell>BB</TableCell>
                    <TableCell>R</TableCell>
                    <TableCell>RBI</TableCell>
                    <TableCell>AVG</TableCell>
                    <TableCell>OBP</TableCell>
                    <TableCell>SLG</TableCell>
                    <TableCell>OPS</TableCell>
                </TableRow>
        </TableHead>
}

export default StatlineHeader;