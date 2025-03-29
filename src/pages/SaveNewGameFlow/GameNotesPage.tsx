import {GameInfo, Inning} from "@/types/types";
import RunsByInning from "@/components/RunsByInning/RunsByInning";
import {FormControl, FormLabel, TextareaAutosize} from "@mui/material";
import css from "./SaveNewGameFlow.module.scss";

type GameNotesPageProps = {
    gameInfo : GameInfo;
    innings : Inning[];
    setGameInfo : (gameInfo : GameInfo) => void;
    setInnings : (innings : Inning[]) => void;
}

const GameNotesPage = (props : GameNotesPageProps) => {

    const updateGameNotes = (gameNotes : string) => {
        const gameInfoCopy = {...props.gameInfo};

        gameInfoCopy.gameNotes = gameNotes;

        props.setGameInfo(gameInfoCopy);
    }

    return <>
        <RunsByInning opponentName={props.gameInfo.opponent?.teamName} homeAway={props.gameInfo.home} innings={props.innings} setInnings={props.setInnings} />

        <div className={css.gameNotesTextArea}>
            <FormControl>
                <FormLabel>Game Notes</FormLabel>
                <TextareaAutosize placeholder="..."
                                  minRows={2}
                                  value={props.gameInfo.gameNotes}
                                  onChange={(event) => updateGameNotes(event.target.value)}
                />
            </FormControl>
        </div>
    </>
}

export default GameNotesPage;