import {ResultStatline} from "@/store/playerGameLog/playerGameLogTypes";
import StatlineHeader from "@/components/Statline/StatlineHeader";
import StatlineData from "@/components/Statline/StatlineData";

type PlayerGameLogProps = {
    games : ResultStatline[];
}

const PlayerGameLog = (props : PlayerGameLogProps) => {

    return <table>
        <thead>
            <StatlineHeader result={true} lineupSpot={true} />
        </thead>
        <tbody>
            {props.games.map(game => (
                <tr>
                    <StatlineData statline={game.statline} result={game.result} />
                </tr>
            ))}
        </tbody>
    </table>
}

export default PlayerGameLog;