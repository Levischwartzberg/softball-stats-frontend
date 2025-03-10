import {Table, TableCell, TableHead, TableRow, TextField, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {Player} from "@/types/types";
import css from "./PlayerTable.module.scss";
import {Link} from 'react-router-dom';
import {useState} from "react";

type PlayerTableProps = {
    players : Player[]
}

const PlayerTable = (props : PlayerTableProps) => {

    const [searchText, setSearchText] = useState("");

    const filteredPlayers = searchText === "" ? props.players : props.players.filter(player => {
        return player.firstName.toUpperCase().includes(searchText.toUpperCase()) || player.lastName.toUpperCase().includes(searchText.toUpperCase());
    });

    return (
        <Table className={css.playerTable}>
            <TableHead>
                <TextField
                    id="input-with-icon-textfield"
                    label="search"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="standard"
                    onChange={(event) => setSearchText(event.target.value)}
                />
                <TableRow className={css.header}>
                    <TableCell>
                        First Name
                    </TableCell>
                    <TableCell>
                        Last Name
                    </TableCell>
                </TableRow>
            </TableHead>
            {filteredPlayers.map(player =>
            <TableRow>
                <TableCell>
                    <Link to={`/player/${player.id}`}>
                        {player.firstName}
                    </Link>
                </TableCell>
                <TableCell>
                    <Link to={`/player/${player.id}`}>
                        {player.lastName}
                    </Link>
                </TableCell>
            </TableRow>
                )}
        </Table>
    )
}

export default PlayerTable;