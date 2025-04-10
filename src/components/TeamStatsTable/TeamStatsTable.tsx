import {PlayerStatline, Statline} from "@/types/types";
import StatlineHeader from "@/components/Statline/StatlineHeader";
import StatlineData from "@/components/Statline/StatlineData";
import {useState} from "react";

type TeamStatsTableProps = {
    playerStatlines : PlayerStatline[]
}

type StatlineKey = keyof Statline;

const TeamStatsTable = (props : TeamStatsTableProps) => {

    const [sortedStatlines, setSortedStatlines] = useState(props.playerStatlines);
    const [sortedColumn, setSortedColumn] = useState("");

    const sortColumn = (column : string) => {

        const sortedStatlinesCopy = [...sortedStatlines];

        if (column in sortedStatlines[0].statline) {
            sortedStatlinesCopy.sort((a,b) => b.statline[column as StatlineKey]! - a.statline[column as StatlineKey]!);
        }
        setSortedColumn(column);
        setSortedStatlines(sortedStatlinesCopy);
    }

    return <table>
        <thead>
            <tr className="sortable"
                onClick={(e) => sortColumn((e.target as HTMLTableHeaderCellElement).id)}>
                <StatlineHeader games={true} playerName={true} sortedColumn={sortedColumn} />
            </tr>
        </thead>
        <tbody>
            {sortedStatlines.map(playerStatline => (
                <tr>
                    <StatlineData statline={playerStatline.statline} player={playerStatline.player} />
                </tr>
            ))}
        </tbody>
    </table>
}

export default TeamStatsTable;