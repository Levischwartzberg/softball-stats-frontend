import {SeasonResults} from "@/types/types";
import {Table, TableCell, TableHead, TableRow} from "@mui/material";
import css from "@/components/SeasonTable/SeasonTable.module.scss";
import {Link} from "react-router-dom";

type SeasonResultsTableProps = {
    seasonResults : SeasonResults
}

const SeasonResultsTable = (props : SeasonResultsTableProps) => {

    return <Table>
        <TableHead>
            <TableRow className={css.header}>
                <TableCell>
                    Result
                </TableCell>
                <TableCell>
                    Score
                </TableCell>
                <TableCell>
                    Date
                </TableCell>
            </TableRow>
        </TableHead>
        {props.seasonResults.results.map(result =>
            <TableRow>
                <TableCell>
                    {result.result}
                </TableCell>
                <TableCell>
                    {result.score}
                </TableCell>
                <TableCell>
                    <Link to={`/game/${result.id}`}>
                        {result.date.toString()}
                    </Link>
                </TableCell>
            </TableRow>
        )}
    </Table>
}

export default SeasonResultsTable;