import {PlayerBattedBallData} from "@/types/types";
import css from "./PlayerBattedBallWRCPlusTable.module.scss";

type PlayerBattedBallDataTableProps = {
    data: PlayerBattedBallData;
    setSelectedFilter: (filter: { region : Region | null, launchAngle: LaunchAngle | null } | null) => void;
}


export type LaunchAngle = 'POPUP' | 'FLYBALL' | 'LINER' | 'GROUNDBALL';
export type Region = 'LEFT' | 'LEFT_CENTER' | 'CENTER' | 'RIGHT_CENTER' | 'RIGHT';

const PlayerBattedBallWRCPlusTable = ({data, setSelectedFilter}: PlayerBattedBallDataTableProps) => {

    type Grid = Record<Region, Record<LaunchAngle, { exitVelocity: number; result: string; runsAboveAverage: number; }[]>>;
    const grid = {
        LEFT: { POPUP: [], FLYBALL: [], LINER: [], GROUNDBALL: [] },
        LEFT_CENTER: { POPUP: [], FLYBALL: [], LINER: [], GROUNDBALL: [] },
        CENTER: { POPUP: [], FLYBALL: [], LINER: [], GROUNDBALL: [] },
        RIGHT_CENTER: { POPUP: [], FLYBALL: [], LINER: [], GROUNDBALL: [] },
        RIGHT: { POPUP: [], FLYBALL: [], LINER: [], GROUNDBALL: [] }
    } as Grid;

    data.battedBallData.forEach((bbdata) => {
        if (grid[bbdata.region] && grid[bbdata.region][bbdata.launchAngle]) {
            grid[bbdata.region][bbdata.launchAngle].push({ exitVelocity : bbdata.exitVelocity, result : bbdata.result, runsAboveAverage : bbdata.runsAboveAverage });
        }
    });

    const regions: Region[] = ['LEFT', 'LEFT_CENTER', 'CENTER', 'RIGHT_CENTER', 'RIGHT'];
    const angles: LaunchAngle[] = ['GROUNDBALL', 'LINER', 'FLYBALL', 'POPUP'];

    const calculateWRCPlus = (battedBalls: { exitVelocity: number; result: string; runsAboveAverage: number }[]) : string => {
        if (battedBalls.length === 0) {
            return "N/A";
        }

        const cumulativeRunsAboveAverage = battedBalls.reduce((sum, bb) => sum + bb.runsAboveAverage, 0);
        const wRCPlus = 100 + (cumulativeRunsAboveAverage / battedBalls.length) * 100;
        return wRCPlus.toFixed(0);
    };

    const setFilter = (filter: { region : Region | null, launchAngle: LaunchAngle | null } | null) => {
        if (filter === null) {
            setSelectedFilter(null);
            return;
        }
        setSelectedFilter({ region : filter.region, launchAngle : filter.launchAngle });
    }

    return <table>
        <thead>
            <tr className={css.header}>
                <th>
                    Angle \ Region
                </th>
                <th>
                    Left
                </th>
                <th>
                    Left Center
                </th>
                <th>
                    Center
                </th>
                <th>
                    Right Center
                </th>
                <th>
                    Right
                </th>
                <th>
                    Total
                </th>
            </tr>
            </thead>
            <tbody>
            {angles.map(angle => (
                <tr>
                    <td>{angle}</td>
                    {regions.map(region => {
                        const battedBalls = grid[region][angle];
                        return<td className={css.clickable} onClick={() => setFilter({region : region, launchAngle : angle})}>{calculateWRCPlus(battedBalls)}</td>;
                    })}
                    <td className={[css.aggregatedData, css.clickable].join(" ")} onClick={() => setFilter({ region : null, launchAngle : angle })}>
                            {calculateWRCPlus([
                                ...grid['LEFT'][angle],
                                ...grid['LEFT_CENTER'][angle],
                                ...grid['CENTER'][angle],
                                ...grid['RIGHT_CENTER'][angle],
                                ...grid['RIGHT'][angle]
                            ])}
                    </td>
                </tr>
            ))}
            <tr>
                <td className={css.aggregatedData}>Total</td>
                {regions.map(region => {
                    const battedBalls = [
                        ...grid[region]['GROUNDBALL'],
                        ...grid[region]['LINER'],
                        ...grid[region]['FLYBALL'],
                        ...grid[region]['POPUP']
                    ];
                    return <td className={[css.aggregatedData, css.clickable].join(" ")} onClick={() => setFilter({launchAngle : null, region : region})}>{calculateWRCPlus(battedBalls)}</td>;
                })}
                <td className={[css.aggregatedData, css.clickable].join(" ")} onClick={() => setFilter(null)}>
                    {calculateWRCPlus(data.battedBallData)}
                </td>
            </tr>
        </tbody>
    </table>
}

export default PlayerBattedBallWRCPlusTable;
