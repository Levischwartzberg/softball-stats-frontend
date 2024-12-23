import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AtBat, Inning, Player} from "../../types/types";
import ScorekeepingAtBat from "./ScorekeepingAtBat/ScorekeepingAtBat";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import SelectPlayerModal from "./SelectPlayerModal/SelectPlayerModal";
import {JSX, useState} from "react";
import EditPlateAppearanceModal from "./EditPlateAppearanceModal/EditPlateAppearanceModal";

type ScorekeepingTableProps = {
    innings : Inning[],
    lineup : Player[],
    allPlayers : Player[],
    setLineup : (lineup : Player[]) => void;
    setInnings : (innings : Inning[]) => void;
}

function ScorekeepingTable(props : ScorekeepingTableProps) {

    const [selectedPlayerAndInning, setSelectedPlayerAndInning] = useState({player : undefined, inning : undefined, index : 0} as {player : Player | undefined, inning : Inning | undefined , index : number});
    const [addPlayerModalOpen, setAddPlayerModalOpen] = useState(false);
    const [editPlayerModalOpen, setEditPlayerModalOpen] = useState(false);
    const [addNewPlateAppearanceOpen, setAddNewPlateAppearanceOpen] = useState(false);

    const timesBattedAround = (inning : Inning) : number => {
        if (inning.atBats.length) {
            const player = inning.atBats[0].player;

            return inning.atBats.filter(atBat => atBat.player.id === player.id).length;
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
                const previousPlateAppearanceLineupIndex = props.lineup.indexOf(props.innings[totalInnings-1].atBats[props.innings[totalInnings-1].atBats.length-1].player);
                return (previousPlateAppearanceLineupIndex + 1 === playerLineupIndex) || ((previousPlateAppearanceLineupIndex + 1 === lineupLength) && playerLineupIndex === 0);
            } else {
                return false
            }
        }
    }

    const openEditor = (player : Player, inning : Inning) => {
        let index;
        if (props.innings[inning.inning-1].atBats.length === 0) {
            index = 1;
        } else if (props.innings[inning.inning-1].atBats.filter(ab => ab.player === player).length > 0) {
            index = props.innings[inning.inning-1].atBats.find(ab => ab.player === player)!.index;
        } else {
            index = props.innings[inning.inning-1].atBats.length + 1;
        }
        const playerInningAndIndex = {player, inning, index};
        setSelectedPlayerAndInning(playerInningAndIndex);
        setAddNewPlateAppearanceOpen(true)
    }

    const availablePlayers = (player : Player, inning : Inning) : Player[] => {
        const players = [player] as Player[];
        if (inning.atBats.length > 0) {
            const baserunners = inning.atBats[inning.atBats.length-1].baserunners;
            Object.values(baserunners).forEach(value => {
                if (value !== null) {
                    players.push(value);
                }
            });
        }
        return players;
    }

    const playerAtBatRows = (player : Player) : JSX.Element[] => {
        const playerPlateAppearanceRow = [] as JSX.Element[];
        props.innings.forEach(inning => {
            const playerAtBats = inning.atBats.filter(ab => ab.player.id === player.id);
            if (playerAtBats.length === 0) {
                playerPlateAppearanceRow.push(
                    <TableCell>
                        {isEditable(player, inning) ? (
                            <Button onClick={() => openEditor(player, inning)}>
                                <ScorekeepingAtBat atBat={null} canEdit={true}/>
                            </Button>
                        ) : (
                            <ScorekeepingAtBat atBat={null} canEdit={false}/>
                        )}
                    </TableCell>
                );
            } else {
                playerAtBats.forEach(ab => {
                    playerPlateAppearanceRow.push(
                        <TableCell>
                            <ScorekeepingAtBat atBat={ab} inningUpUntil={inning.atBats.filter(pa => pa.index <= ab.index)} canEdit={true} />
                        </TableCell>
                    )
                })
            }
        })
        return playerPlateAppearanceRow;
    }

    const updateInning = (plateAppearance : AtBat) => {
        const inningsCopy = [...props.innings];
        inningsCopy[selectedPlayerAndInning.inning?.inning!-1].atBats[plateAppearance.index-1] = plateAppearance;
        props.setInnings(inningsCopy);
    }

    return (
        <TableContainer>
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
                        <TableRow>
                            <TableCell>
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                {`${player.firstName} ${player.lastName}`}
                                <Button onClick={() => setEditPlayerModalOpen(true)}>
                                    <EditIcon />
                                </Button>
                            </TableCell>
                            {playerAtBatRows(player)}
                            <SelectPlayerModal
                                title={"Change Player"}
                                lineupSpot={index}
                                open={editPlayerModalOpen}
                                players={props.allPlayers}
                                lineup={props.lineup}
                                closeModal={setEditPlayerModalOpen}
                                setLineup={props.setLineup} />
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell>
                            {props.lineup.length + 1}
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => setAddPlayerModalOpen(true)}>
                                <PersonAddIcon />
                            </Button>
                        </TableCell>
                        <SelectPlayerModal
                            title={"Add Player"}
                            lineupSpot={props.lineup.length}
                            open={addPlayerModalOpen}
                            players={props.allPlayers}
                            lineup={props.lineup}
                            closeModal={setAddPlayerModalOpen}
                            setLineup={props.setLineup} />
                    </TableRow>
                </TableBody>
            </Table>
            {(selectedPlayerAndInning.inning !== undefined && selectedPlayerAndInning.player !== undefined) && (
                <EditPlateAppearanceModal open={addNewPlateAppearanceOpen}
                                          index={selectedPlayerAndInning.index}
                                          player={selectedPlayerAndInning.player}
                                          closeModal={setAddNewPlateAppearanceOpen}
                                          availablePlayers={availablePlayers(selectedPlayerAndInning.player!, selectedPlayerAndInning.inning!)}
                                          plateAppearance={props.innings[selectedPlayerAndInning.inning.inning - 1].atBats.filter(ab => ab.player === selectedPlayerAndInning.player)[0]}
                                          setPlateAppearance={updateInning}
                />
            )}
        </TableContainer>
    );
}

export  default  ScorekeepingTable;