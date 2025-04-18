import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SetStartingLineup from "@/components/SetStartingLineup/SetStartingLineup";
import {GameInfo, Inning, Player, Season} from "@/types/types";
import ChooseSeasonPage from "@/pages/SaveNewGameFlow/ChooseSeasonPage";
import SetGameInfoPage from "@/pages/SaveNewGameFlow/SetGameInfoPage";
import ScorekeepingTable from "@/components/ScorekeepingTable/ScorekeepingTable";
import GameNotesPage from "@/pages/SaveNewGameFlow/GameNotesPage";
import ConfirmAndSubmitPage from "@/pages/SaveNewGameFlow/ConfirmAndSubmitPage";

const steps = ["Choose Season", "Game Info", "Create Lineup", "Scorekeeping", "Game Notes", "Confirmation"];

type SaveNewGameFlowProps = {
    season : Season;
    gameInfo : GameInfo;
    lineup : Player[];
    gameSequence : Inning[];
    setSeason : (season : Season) => void;
    setGameInfo : (gameInfo : GameInfo) => void;
    setLineup : (lineup : Player[]) => void;
    setGameSequence : (innings : Inning[]) => void;
    confirmGameInfo : () => void;
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

        if (activeStep === steps.length - 1) {
            props.confirmGameInfo();
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
                        Ready to Save?
                    </Typography>
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
                        <SetStartingLineup lineup={props.lineup} setLineup={props.setLineup} />
                    )}
                    {activeStep === 3 && (
                        <ScorekeepingTable
                        innings={props.gameSequence}
                        lineup={props.lineup}
                        setLineup={props.setLineup}
                        setInnings={props.setGameSequence}
                    />
                    )}
                    {activeStep === 4 && (
                        <GameNotesPage gameInfo={props.gameInfo} innings={props.gameSequence} setGameInfo={props.setGameInfo} setInnings={props.setGameSequence} />
                    )}
                    {activeStep === 5 && (
                        <ConfirmAndSubmitPage gameInfo={props.gameInfo} innings={props.gameSequence} season={props.season} />
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
                            {activeStep === steps.length - 1 ? 'Save Game' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

export default SaveNewGameFlow;