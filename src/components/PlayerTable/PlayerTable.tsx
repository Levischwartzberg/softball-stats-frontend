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
        <table className={css.playerTable}>
            <thead>
                <tr>
                    <th colSpan={2} className={css.searchInput}>
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
                    </th>
                </tr>
                <tr className={css.header}>
                    <th>
                        First Name
                    </th>
                    <th>
                        Last Name
                    </th>
                </tr>
            </thead>
            <tbody>
                {filteredPlayers.map(player =>
                    <tr>
                        <td>
                            <Link to={`/player/${player.id}`}>
                                {player.firstName}
                            </Link>
                        </td>
                        <td>
                            <Link to={`/player/${player.id}`}>
                                {player.lastName}
                            </Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default PlayerTable;