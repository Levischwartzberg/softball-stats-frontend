import {TableCell} from "@mui/material";
import {AtBat, Inning, Player} from "../../types/types";
import {JSX, useState} from "react";
import css from "./Scoresheet.module.scss"
import ScorekeepingAtBat from "@/components/ScorekeepingTable/ScorekeepingAtBat/ScorekeepingAtBat";
import Button from "@mui/material/Button";
import PlateAppearanceModal from "@/components/PlateAppearanceModal/PlateAppearanceModal";

type ScorekeepingTableProps = {
    innings : Inning[],
}

function ScorekeepingTable(props : ScorekeepingTableProps) {

    const [plateAppearanceViewerOpen, setPlateAppearanceViewerOpen] = useState(false);
    const [selectedAtBat, setSelectedAtBat] = useState({runs : [] as Player[], outs : [] as Player[]} as AtBat);

    const lineup = [] as Player[];
    props.innings.forEach(inning => {
        inning.atBats.forEach(atBat => {
            const player = atBat.player;

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

    const openPlateAppearanceViewer = (atBat : AtBat) => {
        setSelectedAtBat(atBat);
        setPlateAppearanceViewerOpen(true);
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
                            <div onClick={() => openPlateAppearanceViewer(ab)}>
                                <ScorekeepingAtBat atBat={ab} inningUpUntil={inning.atBats.filter(pa => pa.inningIndex <= ab.inningIndex)} canEdit={false} />
                            </div>
                        </TableCell>
                    )
                }
            }
        })
        return playerPlateAppearanceRow;
    }

    return <>
        <PlateAppearanceModal open={plateAppearanceViewerOpen} atBat={selectedAtBat} closeModal={() => setPlateAppearanceViewerOpen(false)} />
        <table>
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
    </>
}

export  default  ScorekeepingTable;
