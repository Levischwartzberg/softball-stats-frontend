import {OperationENUM, PlayerStatline, Statline} from "@/types/types";
import StatlineHeader from "@/components/Statline/StatlineHeader";
import StatlineData from "@/components/Statline/StatlineData";
import {useState} from "react";
import TableFilters, {TableFilter} from "@/components/TableFilters/TableFilters";

type TeamStatsTableProps = {
    playerStatlines : PlayerStatline[],
    displayWrcPlus : boolean
}

type StatlineKey = keyof Statline;

const TeamStatsTable = (props : TeamStatsTableProps) => {

    const [sortedStatlines, setSortedStatlines] = useState(props.playerStatlines);
    const [sortedColumn, setSortedColumn] = useState("");
    const [filters, setFilters] = useState([{field : "games", operator: OperationENUM.GREATER_THAN, value : 0}] as TableFilter[]);

    const sortColumn = (column : string) => {

        const sortedStatlinesCopy = [...sortedStatlines];

        if (column in sortedStatlines[0].statline) {
            sortedStatlinesCopy.sort((a,b) => b.statline[column as StatlineKey]! - a.statline[column as StatlineKey]!);
        }
        setSortedColumn(column);
        setSortedStatlines(sortedStatlinesCopy);
    }

    const applyFilters = (filters: TableFilter[]) => {
        setFilters(filters);
        setSortedColumn("");
        let filteredStatlines = props.playerStatlines;

        filters.forEach(filter => {
            filteredStatlines = filteredStatlines.filter(playerStatline => {
                const statlineValue = playerStatline.statline[filter.field as StatlineKey] || 0;
                switch (filter.operator) {
                    case OperationENUM.EQUAL:
                        return statlineValue === filter.value;
                    case OperationENUM.GREATER_THAN:
                        return statlineValue > filter.value;
                    case OperationENUM.LESS_THAN:
                        return statlineValue < filter.value;
                    default:
                        return true;
                }
            });
            setSortedStatlines(filteredStatlines);
        });
    }

    return <>
        <TableFilters filters={filters} setFilters={applyFilters} />
        <table>
            <thead>
                <tr className="sortable"
                    onClick={(e) => sortColumn((e.target as HTMLTableHeaderCellElement).id)}>
                    <StatlineHeader games={true} playerName={true} sortedColumn={sortedColumn} displayWrcPlus={props.displayWrcPlus} />
                </tr>
            </thead>
            <tbody>
                {sortedStatlines.map(playerStatline => (
                    <tr>
                        <StatlineData statline={playerStatline.statline} player={playerStatline.player} displayWrcPlus={props.displayWrcPlus} />
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}

export default TeamStatsTable;
