import {PlayerBattedBallData} from "@/types/types";
import css from "./PlayerBattedBallAVGTable.module.scss";
import {LaunchAngle, Region} from "@/components/PlayerBattedBallWRCPlusTable/PlayerBattedBallWRCPlusTable";

type PlayerBattedBallDataTableProps = {
    data: PlayerBattedBallData;
}

const PlayerBattedBallAVGTable = ({data}: PlayerBattedBallDataTableProps) => {

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

    const calculateBattingAverage = (battedBalls: { exitVelocity: number; result: string }[]) : string => {
        if (battedBalls.length === 0) {
            return "N/A";
        }
        let hits = 0;
        battedBalls.forEach(bb => {
            switch (bb.result) {
                case 'SINGLE':
                case 'DOUBLE':
                case 'TRIPLE':
                case 'HOMERUN':
                    hits += 1;
                    break;
                default:
                    break;
            }
        });
        const battingAverage = hits / battedBalls.length;
        return battingAverage.toFixed(3);
    };

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
                    <th>{angle}</th>
                    {regions.map(region => {
                        const battedBalls = grid[region][angle];
                        return <td>{calculateBattingAverage(battedBalls)}</td>;
                    })}
                    <td className={css.aggregatedData}>
                        {calculateBattingAverage([
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
                <th>Total</th>
                {regions.map(region => {
                    const battedBalls = [
                        ...grid[region]['GROUNDBALL'],
                        ...grid[region]['LINER'],
                        ...grid[region]['FLYBALL'],
                        ...grid[region]['POPUP']
                    ];
                    return <td className={css.aggregatedData}>{calculateBattingAverage(battedBalls)}</td>;
                })}
                <td className={css.aggregatedData}>
                    {calculateBattingAverage(data.battedBallData)}
                </td>
            </tr>
        </tbody>
    </table>
}

export default PlayerBattedBallAVGTable;
