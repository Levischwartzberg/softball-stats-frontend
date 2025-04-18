import {GameInfoStatline} from "@/store/playerGameLog/playerGameLogTypes";
import StatlineHeader from "@/components/Statline/StatlineHeader";
import StatlineData from "@/components/Statline/StatlineData";

type PlayerGameLogProps = {
    games : GameInfoStatline[];
}

const PlayerGameLog = (props : PlayerGameLogProps) => {

    return <table>
        <thead>
            <StatlineHeader result={true} lineupSpot={false} />
        </thead>
        <tbody>
            {props.games.map(game => (
                <tr>
                    <StatlineData statline={game.statline} gameInfo={game.gameInfo} />
                </tr>
            ))}
        </tbody>
    </table>
}

export default PlayerGameLog;