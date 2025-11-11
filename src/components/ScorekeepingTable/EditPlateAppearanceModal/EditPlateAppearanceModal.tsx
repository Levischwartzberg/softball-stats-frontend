import {AtBat, Baserunners, Player} from "../../../types/types";
import {Button, Modal, Typography, Box} from "@mui/material";
import css from "./EditPlateAppearanceModal.module.scss";
import EditBase, {BaseENUM} from "./EditBase";
import {useEffect, useState} from "react";
import EditPlateAppearanceResultPopover from "./EditPlateAppearanceResultPopover";
import EditBattedBallDataPopover
    from "@/components/ScorekeepingTable/EditPlateAppearanceModal/EditBattedBallDataPopover";

type EditPlateAppearanceModalProps = {
    open : boolean;
    index : number;
    player : Player;
    availablePlayers : Player[];
    baserunners : Baserunners;
    plateAppearance : AtBat;
    closeModal : (close : boolean) => void;
    setPlateAppearance : (atBat : AtBat) => void;
}

function EditPlateAppearanceModal(props : EditPlateAppearanceModalProps) {

    const [plateAppearanceCopy, setPlateAppearanceCopy] = useState({...props.plateAppearance, inningIndex : props.index, player : props.player} as AtBat);
    const [baserunners, setBaserunners] = useState(props.baserunners);

    const updateBaserunners = (player : Player | null, base : BaseENUM) => {
        const baserunnersCopy = {...baserunners};

        Object.keys(baserunners).forEach(base1 => {

            if (base1 !== base) {
                // @ts-ignore
                const player1 = baserunnersCopy[base1];
                if (player === player1) {
                    // @ts-ignore
                    baserunnersCopy[base1] = null;
                }
            }
        });

        baserunnersCopy[base] = player;
        setBaserunners(baserunnersCopy);
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
        setBaserunners(props.baserunners);
    }, [props.baserunners]);

    useEffect(() => {
        setPlateAppearanceCopy({...props.plateAppearance, inningIndex : props.index, player : props.player} as AtBat);

    }, [props.player, props.index, props.open]);

    return <Modal open={props.open} onClose={() => props.closeModal(false)}>
        <Box className={css.modal}>
            <Typography> Add Plate Appearance </Typography>
            <Button onClick={() => props.closeModal(false)}>X</Button>
            <EditPlateAppearanceResultPopover plateAppearance={plateAppearanceCopy} setPlateAppearance={setPlateAppearanceCopy} availablePlayers={props.availablePlayers}/>
            <EditBattedBallDataPopover  plateAppearance={plateAppearanceCopy} setPlateAppearance={setPlateAppearanceCopy} />
            <Box>
                <div className={css.diamond}>
                    <EditBase className={css.firstBase} base={BaseENUM.FIRST} runner={baserunners.first} availablePlayers={props.availablePlayers} setSelectedRunner={updateBaserunners}/>
                    <EditBase className={css.secondBase} base={BaseENUM.SECOND} runner={baserunners.second} availablePlayers={props.availablePlayers} setSelectedRunner={updateBaserunners}/>
                    <EditBase className={css.thirdBase} base={BaseENUM.THIRD} runner={baserunners.third} availablePlayers={props.availablePlayers} setSelectedRunner={updateBaserunners}/>
                </div>
            </Box>
            <Button onClick={() => savePlateAppearance()}>Confirm</Button>
        </Box>
    </Modal>
}

export default EditPlateAppearanceModal;