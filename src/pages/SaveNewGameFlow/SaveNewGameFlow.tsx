import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SetStartingLineup from "@/components/SetStartingLineup/SetStartingLineup";
import {GameInfo, Player, Season} from "@/types/types";
import ChooseSeasonPage from "@/pages/SaveNewGameFlow/ChooseSeasonPage";
import SetGameInfoPage from "@/pages/SaveNewGameFlow/SetGameInfoPage";

const steps = ["Choose Season", "Game Info", "Create Lineup", "Scorekeeping", "Confirmation"];

type SaveNewGameFlowProps = {
    season : Season;
    gameInfo : GameInfo;
    players : Player[];
    lineup : Player[];
    setSeason : (season : Season) => void;
    setGameInfo : (gameInfo : GameInfo) => void;
    setLineup : (lineup : Player[]) => void;
}

const SaveNewGameFlow = (props : SaveNewGameFlowProps) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepSkipped = (step : number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {activeStep === 0 && (
                        <ChooseSeasonPage season={props.season} setSeason={props.setSeason} />
                    )}
                    {activeStep === 1 && (
                        <SetGameInfoPage gameInfo={props.gameInfo} setGameInfo={props.setGameInfo} />
                    )}
                    {activeStep === 2 && (
                        <SetStartingLineup players={props.players} lineup={props.lineup} setLineup={props.setLineup} />
                    )}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

export default SaveNewGameFlow;