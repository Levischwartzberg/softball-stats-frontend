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

    return <div className={css.gameNotes}>
        <div className={css.leftAlignContentInOwnLine}>
            <RunsByInning opponentName={props.gameInfo.opponent?.teamName} homeAway={props.gameInfo.home} gameInfo={props.gameInfo} innings={props.innings} setGameInfo={props.setGameInfo} setInnings={props.setInnings} />
        </div>

        <div className={css.leftAlignContentInOwnLine}>
            <FormControl>
                <FormLabel>Game Notes</FormLabel>
                <TextareaAutosize placeholder="..."
                                  minRows={2}
                                  value={props.gameInfo.gameNotes}
                                  onChange={(event) => updateGameNotes(event.target.value)}
                />
            </FormControl>
        </div>
    </div>
}

export default GameNotesPage;