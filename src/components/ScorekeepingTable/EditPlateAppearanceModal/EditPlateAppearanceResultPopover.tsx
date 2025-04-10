import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Popper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import css from "./EditPlateAppearanceModal.module.scss";
import {AtBat, AtBatResult, Player} from "@/types/types";
import {NumberInput} from "@mui/base/Unstable_NumberInput/NumberInput";
import PlayerMultiselect from "./PlayerMultiselect";

type EditPlateAppearanceResultPopoverProps = {
    plateAppearance : AtBat,
    availablePlayers : Player[];
    setPlateAppearance : (atBat: AtBat) => void;
}

function EditPlateAppearanceResultPopover(props : EditPlateAppearanceResultPopoverProps) {

    const [open, setOpen] = useState(false);
    const [runs, setRuns] = useState(props.plateAppearance.runs !== undefined ? props.plateAppearance.runs.length : 0);
    const [additionalOuts, setAdditionalOuts] = useState(false);
    const potentialAdditionalOuts = [AtBatResult.SINGLE, AtBatResult.DOUBLE, AtBatResult.TRIPLE, AtBatResult.HOMERUN, AtBatResult.ERROR];
    const [validationErrorMessage, setValidationErrorMessage] = useState("");

    useEffect(() => {
        if (validationErrorMessage !== "" && runs === props.plateAppearance.runs.length) {
            setValidationErrorMessage("");
        }
    }, [runs, props.plateAppearance.runs]);

    useEffect(() => {
        if (validationErrorMessage !== "" && props.plateAppearance.outs) {
            setValidationErrorMessage("");
        }
    }, [props.plateAppearance.outs]);

    const setPlayersScored = (players : Player[]) => {

        props.setPlateAppearance({...props.plateAppearance, runs : players});
    }

    const setPlayersOut = (players : Player[]) => {

        props.setPlateAppearance({...props.plateAppearance, outs : players});
    }

    const confirmAndClose = () => {
        const playersScored = props.plateAppearance.runs ? props.plateAppearance.runs.length : 0;
        if (runs !== playersScored) {
            setValidationErrorMessage("Runs scored on the play must equal the amount of players entered into the 'driven in' multiselect.")
            return;
        }
        const playersOut = props.plateAppearance.outs ? props.plateAppearance.outs.length : 0;
        if (props.plateAppearance.result === AtBatResult.OUT && playersOut === 0) {
            setValidationErrorMessage("If the result of the at bat is Out(s), you must select at least one player to be out of the play.")
            return;
        }
        setOpen(false);
    }

    const atBatSet = props.plateAppearance !== undefined;

    return (
        <div>
            <Button onClick={() => setOpen(!open)}>
                Result
            </Button>
            <Popper open={open} className={css.popover}>
                <Box className={css.popoverContent}>
                    <Typography>
                        Result
                    </Typography>

                    <FormGroup>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={atBatSet ? props.plateAppearance.result : null}
                            name="radio-buttons-group"
                            onChange={(e) => {
                                props.setPlateAppearance({...props.plateAppearance, result : e.target.value as AtBatResult});
                            }}
                        >
                            <FormControlLabel value={AtBatResult.SINGLE} control={<Radio />} label="1B" />
                            <FormControlLabel value={AtBatResult.DOUBLE} control={<Radio />} label="2B" />
                            <FormControlLabel value={AtBatResult.TRIPLE} control={<Radio />} label="3B" />
                            <FormControlLabel value={AtBatResult.HOMERUN} control={<Radio />} label="HR" />
                            <FormControlLabel value={AtBatResult.WALK} control={<Radio />} label="BB" />
                            <FormControlLabel value={AtBatResult.OUT} control={<Radio />} label="Out(s)" />
                            <FormControlLabel value={AtBatResult.ERROR} control={<Radio />} label="Error" />
                        </RadioGroup>
                        {(atBatSet && potentialAdditionalOuts.filter(result => result === props.plateAppearance.result).length > 0) && (
                            <>
                                <FormControlLabel control={<Checkbox value={additionalOuts} onChange={() => setAdditionalOuts(!additionalOuts)}/>} label="Out(s) on Bases" />
                            </>
                        )}
                    </FormGroup>

                    <FormControlLabel label="Runs scored on play"
                                      control={
                            <NumberInput
                                slotProps={{
                                    root: { className: 'CustomNumberInput' },
                                    input: { className: 'input' },
                                    decrementButton: { className: 'btn decrement', children: '▾' },
                                    incrementButton: { className: 'btn increment', children: '▴' },
                                }}
                                min={0}
                                max={props.availablePlayers.length}
                                aria-label="RBI"
                                placeholder="0"
                                value={runs}
                                onChange={(event, val) => setRuns(val || 0)}
                            />
                        }
                    />

                    {(atBatSet && runs > 0) && (
                        <PlayerMultiselect title="Driven In"
                                           availablePlayers={props.availablePlayers}
                                           selectedPlayers={props.plateAppearance.runs || []}
                                           setSelectedPlayers={setPlayersScored} />
                    )}

                    {(atBatSet && (props.plateAppearance.result === AtBatResult.OUT || additionalOuts)) && (
                        <PlayerMultiselect title="Outs"
                                           availablePlayers={props.availablePlayers}
                                           selectedPlayers={props.plateAppearance.outs || []}
                                           setSelectedPlayers={setPlayersOut} />
                    )}

                    <TextField id="outlined-basic"
                               label="Scoring"
                               variant="outlined"
                               style={{marginTop : "10px"}}
                               value={atBatSet ? props.plateAppearance.scoring : ""}
                               onChange={(e) => props.setPlateAppearance({...props.plateAppearance, scoring : e.target.value})}
                    />

                    <Button style={{display : "block"}} onClick={confirmAndClose} >
                        Confirm
                    </Button>
                    {validationErrorMessage !== "" && (
                        <Typography variant="caption" style={{color : "red"}}>
                            {validationErrorMessage}
                        </Typography>
                    )}
                </Box>
            </Popper>
        </div>
    )
}

export default EditPlateAppearanceResultPopover;