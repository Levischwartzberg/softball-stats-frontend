import {AtBat, LaunchAngleENUM} from "@/types/types";
import {useRef, useState} from "react";
import {
    Box,
    Button, FormControl, FormControlLabel,
    FormLabel, InputAdornment, InputLabel, OutlinedInput,
    Popper, Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import css from "@/components/ScorekeepingTable/EditPlateAppearanceModal/EditPlateAppearanceModal.module.scss";
import RegionSelector from "@/components/RegionSelector/RegionSelector";
import {isNumber} from "@mui/base/unstable_useNumberInput/utils";

type EditBattedBallDataPopoverProps = {
    plateAppearance : AtBat,
    setPlateAppearance : (atBat: AtBat) => void;
}

function EditBattedBallDataPopover(props : EditBattedBallDataPopoverProps) {

    const [open, setOpen] = useState(false);

    const rightAnchorRef = useRef<HTMLDivElement | null>(null);

    const handleLaunchAngleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setPlateAppearance({
            ...props.plateAppearance,
            launchAngle: event.target.value as LaunchAngleENUM
        });
    };

    const updateExitVelocity = (velo : string) => {
        if (isNumber(parseInt(velo))) {
            props.setPlateAppearance({
                ...props.plateAppearance,
                exitVelocity : parseInt(velo)
            })
        } else if (velo === "") {
            props.setPlateAppearance({
                ...props.plateAppearance,
                exitVelocity : undefined
            })
        }
    }

    const confirmAndClose = () => {
        setOpen(false);
    }

    const clear = () => {
        props.setPlateAppearance({
            ...props.plateAppearance,
            region : undefined,
            launchAngle : undefined,
            exitVelocity : undefined,
        })
    }

    return (
        <div>
            <Button onClick={() => setOpen(!open)}>
                Batted Ball
            </Button>

            <div ref={rightAnchorRef} style={{ position: 'absolute', top: 0, right: -75 }} />

            <Popper open={open}
                    className={css.popover}
                    placement="right-end"
                    anchorEl={rightAnchorRef.current}
            >
                <Box className={css.popoverContent}>
                    <Typography>
                        Region
                    </Typography>

                    <RegionSelector atBat={props.plateAppearance} setAtBat={props.setPlateAppearance}/>

                    <FormControl component="fieldset" style={{ marginTop: '1rem' }}>
                        <FormLabel component="legend">Launch Angle</FormLabel>
                        <RadioGroup
                            value={props.plateAppearance.launchAngle?.toString()}
                            onChange={handleLaunchAngleChange}
                        >
                            {Object.keys(LaunchAngleENUM)
                                .filter(key => isNaN(Number(key)))
                                .map((key) => {
                                    const enumValue = LaunchAngleENUM[key as keyof typeof LaunchAngleENUM];
                                    const label = key.charAt(0) + key.slice(1).toLowerCase();
                                    return (
                                        <FormControlLabel
                                            key={key}
                                            value={enumValue.toString()}
                                            control={<Radio />}
                                            label={label}
                                        />
                                    );
                                })}
                        </RadioGroup>

                    </FormControl>
                    <FormControl sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-velo">Exit Velocity</InputLabel>
                        <OutlinedInput
                            className="outlined-input"
                            id="outlined-adornment-velo"
                            endAdornment={<InputAdornment position="end">MPH</InputAdornment>}
                            label="Exit Velocity"
                            value={props.plateAppearance ? props.plateAppearance.exitVelocity : ""}
                            onChange={(event) => updateExitVelocity(event.target.value)}
                        />
                    </FormControl>

                    <Button style={{display : "block"}} onClick={confirmAndClose} >
                        Confirm
                    </Button>
                    <Button style={{display : "block"}} onClick={clear} >
                        Clear
                    </Button>
                </Box>
            </Popper>
        </div>
    )
}

export default EditBattedBallDataPopover;