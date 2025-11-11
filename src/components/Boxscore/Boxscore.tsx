import {BoxscoreDTO} from "@/store/boxscore/boxscoreDTO";
import {Player} from "@/types/types";
import css from "./Boxscore.module.scss";
import {Link} from "react-router-dom";

type BoxscoreProps = {
    boxscore : BoxscoreDTO
}

const Boxscore = (props : BoxscoreProps) => {

    function formatPlayerName(player : Player) {
        return player.lastName + " " + player.firstName[0];
    }
    function roundRates(rate : number) {
        return (rate >= 1) ? (rate).toPrecision(4) : (rate).toPrecision(3);
    }

    return (
        <div>
            <h3 style={{fontWeight: "bold"}} className={css.tableHeader}>Boxscore:</h3>
            <table>
                <tbody>
                <tr>
                    <th>Spot</th>
                    <th>Player Name</th>
                    <th>AB</th>
                    <th>Hits</th>
                    <th>1B</th>
                    <th>2B</th>
                    <th>3B</th>
                    <th>HR</th>
                    <th>BB</th>
                    <th>R</th>
                    <th>RBI</th>
                    <th>AVG</th>
                    <th>OBP</th>
                    <th>SLG</th>
                    <th>OPS</th>
                </tr>
                {props.boxscore.playerStatlines.map((game, index) => (
                    <tr key={game.player.id}>
                        <td>{index + 1}</td>
                        <td>
                            {game.player && (
                                <Link to={`/player/${game.player.id}`}>
                                    {formatPlayerName(game.player)}
                                </Link>
                            )}
                        </td>
                        <td>{game.statline.atBats}</td>
                        <td>{game.statline.hits}</td>
                        <td>{game.statline.singles}</td>
                        <td>{game.statline.doubles}</td>
                        <td>{game.statline.triples}</td>
                        <td>{game.statline.homeruns}</td>
                        <td>{game.statline.walks}</td>
                        <td>{game.statline.runs}</td>
                        <td>{game.statline.rbi}</td>
                        <td>{roundRates(game.statline.avg)}</td>
                        <td>{roundRates(game.statline.obp)}</td>
                        <td>{roundRates(game.statline.slg)}</td>
                        <td>{roundRates(game.statline.ops)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Boxscore;
