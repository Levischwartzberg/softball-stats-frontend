type StatlineProps = {
    games? : boolean,
    season? : boolean,
    result? : boolean,
    lineupSpot? : boolean,
    playerName? : boolean,
    sortedColumn? : string
}

function StatlineHeader(props : StatlineProps) {

    const addSortIcon = (columnName : string) => {
        if (props.sortedColumn && props.sortedColumn === columnName) {
            return true;
        }
        return false;
    }

    return <>
                {props.result && (
                    <th>Game</th>
                )}
                {props.lineupSpot && (
                    <th>LineupSpot</th>
                )}
                {props.season && (
                    <th>Season</th>
                )}
                {props.playerName && (
                    <th>Player</th>
                )}
                {props.games && (
                    <th id={"games"}>Games {addSortIcon("games") && <span>&#8681;</span>} </th>
                )}
                <th id={"atBats"}>AB {addSortIcon("atBats") && <span>&#8681;</span>} </th>
                <th id={"hits"}>Hits {addSortIcon("hits") && <span>&#8681;</span>} </th>
                <th id={"singles"}>1B {addSortIcon("singles") && <span>&#8681;</span>} </th>
                <th id={"doubles"}>2B {addSortIcon("doubles") && <span>&#8681;</span>} </th>
                <th id={"triples"}>3B {addSortIcon("triples") && <span>&#8681;</span>} </th>
                <th id={"homeruns"}>HR {addSortIcon("homeruns") && <span>&#8681;</span>} </th>
                <th id={"walks"}>BB {addSortIcon("walks") && <span>&#8681;</span>} </th>
                <th id={"runs"}>R {addSortIcon("runs") && <span>&#8681;</span>} </th>
                <th id={"rbi"}>RBI {addSortIcon("rbi") && <span>&#8681;</span>} </th>
                <th id={"avg"}>AVG {addSortIcon("avg") && <span>&#8681;</span>} </th>
                <th id={"obp"}>OBP {addSortIcon("obp") && <span>&#8681;</span>} </th>
                <th id={"slg"}>SLG {addSortIcon("slg") && <span>&#8681;</span>} </th>
                <th id={"ops"}>OPS {addSortIcon("ops") && <span>&#8681;</span>} </th>
    </>
}

export default StatlineHeader;