import {Table, TableCell, TableHead, TableRow} from "@mui/material";
import {Player} from "@/types/types";
import css from "./PlayerTable.module.scss";

type PlayerTableProps = {
    players : Player[]
}

const PlayerTable = (props : PlayerTableProps) => {

    return (
        <Table className={css.playerTable}>
            <TableHead className={css.header}>
                <TableRow>
                    <TableCell>
                        First Name
                    </TableCell>
                    <TableCell>
                        Last Name
                    </TableCell>
                </TableRow>
            </TableHead>
            {props.players.map(player =>
            <TableRow>
                <TableCell>
                    {player.firstName}
                </TableCell>
                <TableCell>
                    {player.lastName}
                </TableCell>
            </TableRow>
                )}
        </Table>
    )
}

export default PlayerTable;