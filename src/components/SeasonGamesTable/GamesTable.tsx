import {OpponentGames, SeasonGames} from "@/types/types";
import css from "@/components/SeasonTable/SeasonTable.module.scss";
import {Link} from "react-router-dom";

type GamesTableProps = {
    games: OpponentGames | SeasonGames;
}

const GamesTable = (props : GamesTableProps) => {
    const isSeasonGames = (games: OpponentGames | SeasonGames): games is SeasonGames => {
        return "season" in games;
    };

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
    
    const showOpponentColumn = isSeasonGames(props.games);

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
                {showOpponentColumn && <th>Opponent</th>}
            </tr>
        </thead>
        <tbody>
            {props.games.games.map(game =>
                <tr key={game.gameInfoId}>
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
                    {showOpponentColumn && (
                        <td>
                            {game.opponent ? game.opponent.teamName : "Unavailable"}
                        </td>
                    )}
                </tr>
            )}
        </tbody>
    </table>
}

export default GamesTable;
