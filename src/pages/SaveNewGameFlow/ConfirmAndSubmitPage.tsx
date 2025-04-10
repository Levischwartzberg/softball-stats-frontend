import {GameInfo, Inning, Season} from "@/types/types";
import {Typography} from "@mui/material";
import GameRuns from "@/components/GameRuns/GameRuns";

type ConfirmAndSubmitPageProps = {
    gameInfo : GameInfo;
    innings : Inning[];
    season : Season;
}

const ConfirmAndSubmitPage = (props : ConfirmAndSubmitPageProps) => {

    return (<div>
            <Typography variant="h6" style={{textAlign : "left"}}>
                <><span style={{fontWeight : "bold"}}> Date/Time: </span> {props.gameInfo.date.toDate().toString()}</>
            </Typography>
            <Typography variant="h6" style={{textAlign : "left"}}>
                <><span style={{fontWeight : "bold"}}> Season: </span> {props.season.session}, {props.season.year}</>
            </Typography>
            <GameRuns opponentName={props.gameInfo.opponent?.teamName} homeAway={props.gameInfo.home} gameInfo={props.gameInfo} innings={props.innings} />
    </div>
    )
}

export default ConfirmAndSubmitPage;