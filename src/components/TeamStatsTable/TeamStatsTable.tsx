import {PlayerStatline} from "@/types/types";
import StatlineHeader from "@/components/Statline/StatlineHeader";
import StatlineData from "@/components/Statline/StatlineData";

type TeamStatsTableProps = {
    playerStatlines : PlayerStatline[]
}

const TeamStatsTable = (props : TeamStatsTableProps) => {

    return <table>
        <thead>
            <tr>
                <StatlineHeader games={true} playerName={true}/>
            </tr>
        </thead>
        <tbody>
            {props.playerStatlines.map(playerStatline => (
                <tr>
                    <StatlineData statline={playerStatline.statline} player={playerStatline.player} />
                </tr>
            ))}
        </tbody>
    </table>
}

export default TeamStatsTable;