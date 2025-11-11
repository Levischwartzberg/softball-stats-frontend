import {SeasonGames} from "@/types/types";
import {Table, TableCell, TableHead, TableRow} from "@mui/material";
import css from "@/components/SeasonTable/SeasonTable.module.scss";
import {Link} from "react-router-dom";

type SeasonResultsTableProps = {
    seasonGames : SeasonGames
}

const SeasonGamesTable = (props : SeasonResultsTableProps) => {

    console.log(props.seasonGames);

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

    return <table>
        <thead>
            <tr className={css.header}>
                <th>
                    Date
                </th>
                <th>
                    Result
                </th>
                <th>
                    Score
                </th>
                <th>
                    Opponent
                </th>
            </tr>
        </thead>
        {props.seasonGames.games.map(game =>
            <tr>
                <td>
                    <Link to={`/game/${game.gameInfoId}`}>
                        {game.date.toString()}
                    </Link>
                </td>
                <td>
                    {determineResult(game.runsFor, game.runsAgainst)}
                </td>
                <td>
                    {formatScore(game.runsFor, game.runsAgainst)}
                </td>
                <td>
                    {game.opponent ? game.opponent.teamName : "Unavailable"}
                </td>
            </tr>
        )}
    </table>
}

export default SeasonGamesTable;
