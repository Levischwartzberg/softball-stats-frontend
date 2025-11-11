import {BoxscoreDTO} from "@/store/boxscore/boxscoreDTO";
import {Accordion, AccordionDetails, AccordionSummary, Card, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import css from "./GameInfoTable.module.scss";

type GameInfoTableProps = {
    boxscoreDTO : BoxscoreDTO;
}

const GameInfoCard = (props : GameInfoTableProps) => {

    const gameInfo = props.boxscoreDTO.gameInfo;

    console.log(gameInfo);

    const formatScore = (runsFor : number, runsAgainst : number) : string => {
        if (runsFor > runsAgainst) {
            return `${runsFor} - ${runsAgainst}`;
        } else {
            return `${runsAgainst} - ${runsFor}`;
        }
    }

    const determineResult = (runsFor : number, runsAgainst : number) : string => {
        if (runsFor > runsAgainst) {
            return "Win";
        } else if (runsFor < runsAgainst) {
            return "Loss";
        }
        return "Tie";
    }

    return (
        <Card className={css.gameInfo}>
            <h2>Game Info:</h2>
            <h3 style={{textAlign: "left"}}>
                {gameInfo.date.toString()}, {determineResult(gameInfo.runsFor, gameInfo.runsAgainst) + " " + formatScore(gameInfo.runsFor, gameInfo.runsAgainst)}
            </h3>
            {gameInfo.opponent?.teamName && (
                <h3 style={{textAlign: "left"}}>
                    <span style={{fontWeight: "bold"}}> Opponent: </span> <span style={{fontWeight: "normal"}}> {gameInfo.opponent.teamName} </span>
                </h3>
            )}
            {(gameInfo.gameNotes || gameInfo.field || gameInfo.weatherConditions || (gameInfo.temperature !== undefined && gameInfo.temperature > 0)) && (
                <Accordion className={css.additionalInfo}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">Additional Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {gameInfo.field && (
                            <h4 style={{textAlign: "left"}}>
                                <span style={{fontWeight: "bold"}}> Field: </span> <span style={{fontWeight: "normal"}}> {gameInfo.field}  </span>
                            </h4>
                        )}
                        {(gameInfo.temperature !== undefined && gameInfo.temperature > 0) && (
                            <h4 style={{textAlign: "left"}}>
                                <span style={{fontWeight: "bold"}}> Temperature: </span> <span style={{fontWeight: "normal"}}> {gameInfo.temperature}°F </span>
                            </h4>
                        )}
                        {gameInfo.weatherConditions && (
                            <h4 style={{textAlign: "left"}}>
                                <span style={{fontWeight: "bold"}}> Conditions: </span> <span style={{fontWeight: "normal"}}> {gameInfo.weatherConditions.map(condition => condition.toString()).join(", ")}  </span>
                            </h4>
                        )}
                        {gameInfo.gameNotes && (
                            <h4 style={{textAlign: "left"}}>
                                <span style={{fontWeight: "bold"}}> Game Notes: </span> <span style={{fontWeight: "normal"}}> {gameInfo.gameNotes} </span>
                            </h4>
                        )}
                    </AccordionDetails>
                </Accordion>
            )}
        </Card>
    );
}

export default GameInfoCard;
