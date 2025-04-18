import {SeasonGames} from "@/types/types";
import {Table, TableCell, TableHead, TableRow} from "@mui/material";
import css from "@/components/SeasonTable/SeasonTable.module.scss";
import {Link} from "react-router-dom";

type SeasonResultsTableProps = {
    seasonGames : SeasonGames
}

const SeasonGamesTable = (props : SeasonResultsTableProps) => {

    const formatScore = (runsFor : number, runsAgainst : number) : string => {

        if (runsFor > runsAgainst) {
            return `${runsFor} - ${runsAgainst}`;
        } else {
            return `${runsAgainst} - ${runsFor}`;
        }
    }

    const determineResult = (runsFor : number, runsAgainst : number) : string => {

        if (runsFor > runsAgainst) {
            return "Win";
        } else if (runsFor < runsAgainst) {
            return "Loss";
        }
        return "Tie";
    }

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
        {props.seasonGames.games.map(game =>
            <TableRow>
                <TableCell>
                    {determineResult(game.runsFor, game.runsAgainst)}
                </TableCell>
                <TableCell>
                    {formatScore(game.runsFor, game.runsAgainst)}
                </TableCell>
                <TableCell>
                    <Link to={`/game/${game.gameInfoId}`}>
                        {game.date.toString()}
                    </Link>
                </TableCell>
            </TableRow>
        )}
    </Table>
}

export default SeasonGamesTable;