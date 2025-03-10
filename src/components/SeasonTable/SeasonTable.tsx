import {Table, TableCell, TableHead, TableRow, TextField, InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {Season} from "@/types/types";
import css from "./SeasonTable.module.scss";
import {Link} from 'react-router-dom';
import {useState} from "react";

type SeasonTableProps = {
    seasons : Season[]
}

const SeasonTable = (props : SeasonTableProps) => {

    const [searchText, setSearchText] = useState("");

    const filteredSeasons = searchText === "" ? props.seasons : props.seasons.filter(season => {
        return season.session.toUpperCase().includes(searchText.toUpperCase()) || season.year.toString().includes(searchText.toUpperCase());
    });

    return (
        <Table className={css.seasonTable}>
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
                        Session
                    </TableCell>
                    <TableCell>
                        Year
                    </TableCell>
                </TableRow>
            </TableHead>
            {filteredSeasons.map(season =>
                <TableRow>
                    <TableCell>
                        <Link to={`/season/${season.id}`}>
                            {season.session}
                        </Link>
                    </TableCell>
                    <TableCell>
                        <Link to={`/season/${season.id}`}>
                            {season.year}
                        </Link>
                    </TableCell>
                </TableRow>
            )}
        </Table>
    )
}

export default SeasonTable;