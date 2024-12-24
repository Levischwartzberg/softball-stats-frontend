import {AtBat, Baserunners, Player} from "../../../types/types";
import {Button, Modal, Typography, Box} from "@mui/material";
import css from "./EditPlateAppearanceModal.module.scss";
import EditBase, {BaseENUM} from "./EditBase";
import {useEffect, useState} from "react";
import EditPlateAppearanceResultPopover from "./EditPlateAppearanceResultPopover";

type EditPlateAppearanceModalProps = {
    open : boolean;
    index : number;
    player : Player;
    availablePlayers : Player[];
    plateAppearance : AtBat;
    closeModal : (close : boolean) => void;
    setPlateAppearance : (atBat : AtBat) => void;
}

function EditPlateAppearanceModal(props : EditPlateAppearanceModalProps) {

    const [plateAppearanceCopy, setPlateAppearanceCopy] = useState({...props.plateAppearance, index : props.index, player : props.player} as AtBat);
    const [baserunners, setBaserunners] = useState({first : null, second : null, third : null} as Baserunners);
    let availableRunners = props.availablePlayers.filter(player => !Object.values(baserunners).map(runner => runner?.id).includes(player.id)) as Player[];

    const updateBaserunners = (player : Player | null, base : BaseENUM) => {
        const baserunnersCopy = {...baserunners};
        baserunnersCopy[base] = player;
        setBaserunners(baserunnersCopy);
        availableRunners = props.availablePlayers.filter(player => Object.values(baserunners).map(runner => runner?.id).includes(player.id));
    }

    const savePlateAppearance = () => {
        props.closeModal(false);
        props.setPlateAppearance({...plateAppearanceCopy,
            baserunners : baserunners,
            runs : plateAppearanceCopy.runs || [],
            outs: plateAppearanceCopy.outs || []
        });
    }

    useEffect(() => {
        setPlateAppearanceCopy({...props.plateAppearance, index : props.index, player : props.player} as AtBat);
    }, [props.player, props.index])

    return <Modal open={props.open} onClose={props.closeModal} className={css.modal}>
        <>
            <Typography> Add Plate Appearance </Typography>
            <Button onClick={() => props.closeModal(false)}>X</Button>
            <EditPlateAppearanceResultPopover plateAppearance={plateAppearanceCopy} setPlateAppearance={setPlateAppearanceCopy} availablePlayers={props.availablePlayers}/>
            <Box>
                <div className={css.diamond}>
                    <EditBase className={css.firstBase} base={BaseENUM.FIRST} runner={baserunners.first} availablePlayers={availableRunners} setSelectedRunner={updateBaserunners}/>
                    <EditBase className={css.secondBase} base={BaseENUM.SECOND} runner={baserunners.second} availablePlayers={availableRunners} setSelectedRunner={updateBaserunners}/>
                    <EditBase className={css.thirdBase} base={BaseENUM.THIRD} runner={baserunners.third} availablePlayers={availableRunners} setSelectedRunner={updateBaserunners}/>
                </div>
            </Box>
            <Button onClick={() => savePlateAppearance()}>Confirm</Button>
        </>
    </Modal>
}

export default EditPlateAppearanceModal;