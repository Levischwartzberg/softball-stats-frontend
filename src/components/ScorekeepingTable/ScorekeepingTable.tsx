import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AtBat, Baserunners, Inning, Player} from "../../types/types";
import ScorekeepingAtBat from "./ScorekeepingAtBat/ScorekeepingAtBat";
import {JSX, useState} from "react";
import EditPlateAppearanceModal from "./EditPlateAppearanceModal/EditPlateAppearanceModal";
import css from "./ScorekeepingTable.module.scss";

type ScorekeepingTableProps = {
    innings : Inning[],
    lineup : Player[],
    setLineup : (lineup : Player[]) => void;
    setInnings : (innings : Inning[]) => void;
}

function ScorekeepingTable(props : ScorekeepingTableProps) {

    const [selectedPlayerAndInning, setSelectedPlayerAndInning] = useState({player : undefined, inning : undefined, index : 0} as {player : Player | undefined, inning : Inning | undefined , index : number});
    const [addNewPlateAppearanceOpen, setAddNewPlateAppearanceOpen] = useState(false);

    const timesBattedAround = (inning : Inning) : number => {
        if (inning.atBats.length) {
            const outs = inning.atBats.map(ab => ab.outs.length).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            return Math.ceil((inning.atBats.length + 1 - (outs / 3)) / props.lineup.length);
        }
        return 1;
    }

    const isEditable = (player : Player, inning : Inning) : boolean => {
        const playerLineupIndex = props.lineup.indexOf(player);
        const lineupLength = props.lineup.length;
        const totalInnings = props.innings.length;
        if (inning.inning === 1 && playerLineupIndex === 0) {
            return true;
        } else if ((inning.inning > 1) && (inning.inning === props.innings[totalInnings-1].inning) && (inning.atBats.length === 0)) {
            const previousPlateAppearanceLineupIndex = props.lineup.indexOf(props.innings[totalInnings-2].atBats[props.innings[totalInnings-2].atBats.length-1].player);
            return (previousPlateAppearanceLineupIndex + 1 === playerLineupIndex) || ((previousPlateAppearanceLineupIndex + 1 === lineupLength) && playerLineupIndex === 0);
        } else {
            if (inning.atBats.length > 0) {
                if (inning.atBats.map(ab => ab.outs.length).reduce((accumulator, currentValue) => accumulator + currentValue, 0) === 3) {
                    return false;
                }
                const previousPlateAppearanceLineupIndex = props.lineup.indexOf(inning.atBats[inning.atBats.length-1].player);
                return (previousPlateAppearanceLineupIndex + 1 === playerLineupIndex) || ((previousPlateAppearanceLineupIndex + 1 === lineupLength) && playerLineupIndex === 0);
            } else {
                return false
            }
        }
    }

    const openEditor = (player : Player, inning : Inning, index? : number) => {
        if (index === undefined) {
            index = props.innings[inning.inning-1].atBats.length + 1;
        }

        const playerInningAndIndex = {player, inning, index};
        setSelectedPlayerAndInning(playerInningAndIndex);
        setAddNewPlateAppearanceOpen(true)
    }

    const availablePlayers = (player : Player, inning : Inning, index : number) : Player[] => {
        const players = [player] as Player[];
        if (index > 1) {
            const baserunners = inning.atBats[index-2].baserunners;
            Object.values(baserunners).forEach(value => {
                if (value !== null) {
                    players.push(value);
                }
            });
        }
        return players;
    }

    const updateInning = (plateAppearance : AtBat) => {
        const inningsCopy = [...props.innings];
        inningsCopy[selectedPlayerAndInning.inning?.inning!-1].atBats[plateAppearance.inningIndex-1] = plateAppearance;
        props.setInnings(inningsCopy);

        const inningOuts = inningsCopy[selectedPlayerAndInning.inning!.inning-1].atBats.map(ab => ab.outs.length).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        if (inningOuts === 3) {
            if (inningsCopy.length === selectedPlayerAndInning.inning!.inning) {
                inningsCopy.push({
                    inning : selectedPlayerAndInning.inning!.inning + 1,
                    atBats : []
                });
            }
            props.setInnings(inningsCopy);
        }
    }

    const playerAtBatRows = (player : Player) : JSX.Element[] => {
        const playerPlateAppearanceRow = [] as JSX.Element[];
        props.innings.forEach(inning => {
            const playerAtBats = inning.atBats.filter(ab => ab.player.id === player.id);
            for (let i = 0; i < timesBattedAround(inning); i++) {
                if (playerAtBats[i] === undefined) {
                    playerPlateAppearanceRow.push(
                            <TableCell>
                                {isEditable(player, inning) ? (
                                    <Button onClick={() => openEditor(player, inning, undefined)}>
                                        <ScorekeepingAtBat atBat={null} canEdit={true}/>
                                    </Button>
                                ) : (
                                    <ScorekeepingAtBat atBat={null} canEdit={false}/>
                                )}
                            </TableCell>
                        );
                } else {
                    const ab = playerAtBats[i];
                    playerPlateAppearanceRow.push(
                        <TableCell>
                            <Box className={css.editPlateAppearanceButton} onClick={() => openEditor(player, inning, ab.inningIndex)}>
                                <ScorekeepingAtBat atBat={ab} inningUpUntil={inning.atBats.filter(pa => pa.inningIndex <= ab.inningIndex)} canEdit={true} />
                            </Box>
                        </TableCell>
                    )
                }
            }
        })
        return playerPlateAppearanceRow;
    }

    return (
        <TableContainer className={css.scorekeepingTable}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Lineup Spot
                        </TableCell>
                        <TableCell>
                            Player
                        </TableCell>
                        {props.innings.map(inning => {
                            const inningHeaders = [] as JSX.Element[];
                            for (let i = 0; i < timesBattedAround(inning); i++) {
                                inningHeaders.push(
                                    <TableCell>
                                        {inning.inning}
                                    </TableCell>
                                )
                            }
                            return inningHeaders;
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.lineup.map((player, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                {`${player.firstName} ${player.lastName}`}
                            </TableCell>
                            {playerAtBatRows(player)}
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell>
                            {props.lineup.length + 1}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {(selectedPlayerAndInning.inning !== undefined && selectedPlayerAndInning.player !== undefined) && (
                <EditPlateAppearanceModal open={addNewPlateAppearanceOpen}
                                          index={selectedPlayerAndInning.index}
                                          player={selectedPlayerAndInning.player}
                                          closeModal={setAddNewPlateAppearanceOpen}
                                          availablePlayers={availablePlayers(selectedPlayerAndInning.player!, selectedPlayerAndInning.inning!, selectedPlayerAndInning.index!)}
                                          plateAppearance={props.innings[selectedPlayerAndInning.inning.inning - 1].atBats.find(ab => ab.inningIndex === selectedPlayerAndInning.index)!}
                                          baserunners={selectedPlayerAndInning.index > 1 ? props.innings[selectedPlayerAndInning.inning.inning - 1].atBats.find(ab => ab.inningIndex === selectedPlayerAndInning.index - 1)!.baserunners : {first : null, second : null, third : null} as Baserunners}
                                          setPlateAppearance={updateInning}
                />
            )}
        </TableContainer>
    );
}

export  default  ScorekeepingTable;
