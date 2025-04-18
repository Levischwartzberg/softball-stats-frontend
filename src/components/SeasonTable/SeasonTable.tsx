import {TextField, InputAdornment} from "@mui/material";
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
        <table className={css.seasonTable}>
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
                            className="table-search"
                            variant="standard"
                            onChange={(event) => setSearchText(event.target.value)}
                        />
                    </th>
                </tr>
                <tr className={css.header}>
                    <th>
                        Session
                    </th>
                    <th>
                        Year
                    </th>
                </tr>
            </thead>
            {filteredSeasons.map(season =>
                <tr>
                    <td>
                        <Link to={`/season/${season.id}`}>
                            {season.session}
                        </Link>
                    </td>
                    <td>
                        <Link to={`/season/${season.id}`}>
                            {season.year}
                        </Link>
                    </td>
                </tr>
            )}
        </table>
    )
}

export default SeasonTable;