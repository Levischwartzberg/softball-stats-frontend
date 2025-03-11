import {ResultStatline} from "@/store/playerGameLog/playerGameLogTypes";
import StatlineHeader from "@/components/Statline/StatlineHeader";
import StatlineData from "@/components/Statline/StatlineData";

type PlayerGameLogProps = {
    games : ResultStatline[];
}

const PlayerGameLog = (props : PlayerGameLogProps) => {

    return <>
        <StatlineHeader  statline={props.games[0].statline} result={true} />
        {props.games.map(game => (
            <StatlineData  statline={game.statline} result={game.result} />
        ))}
    </>
}

export default PlayerGameLog;