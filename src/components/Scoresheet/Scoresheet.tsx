import {TableCell} from "@mui/material";
import {Inning, Player} from "../../types/types";
import {JSX} from "react";
import css from "./Scoresheet.module.scss"
import ScorekeepingAtBat from "@/components/ScorekeepingTable/ScorekeepingAtBat/ScorekeepingAtBat";

type ScorekeepingTableProps = {
    innings : Inning[],
}

function ScorekeepingTable(props : ScorekeepingTableProps) {

    const lineup = [] as Player[];
    props.innings.forEach(inning => {
        inning.atBats.forEach(atBat => {
            const player = atBat.player;

            //TODO : When players are skippable in a lineup, we need to check for player of previous atBat and insert after them instead of at the end
            if (!lineup.some(p => p.id === player.id)) {
                lineup.push(player);
            }
        })
    });

    const timesBattedAround = (inning : Inning) : number => {
        if (inning.atBats.length) {
            const outs = inning.atBats.map(ab => ab.outs.length).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            return Math.ceil((inning.atBats.length + 1 - (outs / 3)) / lineup.length);
        }
        return 1;
    }

    const playerAtBatRows = (player : Player) : JSX.Element[] => {
        const playerPlateAppearanceRow = [] as JSX.Element[];
        props.innings.forEach(inning => {
            const playerAtBats = inning.atBats.filter(ab => ab.player.id === player.id);
            for (let i = 0; i < timesBattedAround(inning); i++) {
                if (playerAtBats[i] === undefined) {
                    playerPlateAppearanceRow.push(
                        <TableCell>
                            <ScorekeepingAtBat atBat={null} canEdit={false}/>
                        </TableCell>
                    );
                } else {
                    const ab = playerAtBats[i];
                    playerPlateAppearanceRow.push(
                        <TableCell>
                            <ScorekeepingAtBat atBat={ab} inningUpUntil={inning.atBats.filter(pa => pa.inningIndex <= ab.inningIndex)} canEdit={false} />
                        </TableCell>
                    )
                }
            }
        })
        return playerPlateAppearanceRow;
    }

    return <table>
        <thead>
            <tr>
                <th>Lineup Spot</th>
                <th>Player</th>
                {props.innings.map(inning => {
                    const inningHeaders = [] as JSX.Element[];
                    for (let i = 0; i < timesBattedAround(inning); i++) {
                        inningHeaders.push(
                            <th>
                                {inning.inning}
                            </th>
                        )
                    }
                    return inningHeaders;
                })}
            </tr>
        </thead>
        <tbody>
        {lineup.map((player, index) => (
            <tr key={index} className={css.scoresheetTable}>
                <td>
                    {index + 1}
                </td>
                <td>
                    {`${player.firstName} ${player.lastName}`}
                </td>
                {playerAtBatRows(player)}
            </tr>
        ))}
        </tbody>
    </table>
}

export  default  ScorekeepingTable;
