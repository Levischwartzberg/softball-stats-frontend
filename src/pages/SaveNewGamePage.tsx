import {useState} from "react";
import {GameInfo, Inning, Player, Season} from "../types/types";
import ScorekeepingTable from "../components/ScorekeepingTable/ScorekeepingTable";
import {useGetPlayersQuery} from "../store/players/playerApiSlice";
import AsyncStateWrapper, {QueryState} from "../components/common/AsyncStateWrapper";
import {Button} from "@mui/material";
import playerInfo from "@/components/PlayerInfo/PlayerInfo";
import SetStartingLineup from "@/components/SetStartingLineup/SetStartingLineup";
import SaveNewGameFlow from "@/pages/SaveNewGameFlow/SaveNewGameFlow";
import dayjs from "dayjs";

function SaveNewGamePage() {

    const [season, setSeason] = useState({} as Season);
    const [gameInfo, setGameInfo] = useState({date : dayjs()} as GameInfo);
    const [lineup, setLineup] = useState([] as Player[]);
    const [gameSequence, setGameSequence] = useState([{inning : 1, atBats : []}] as Inning[]);

    const getPlayersQuery = useGetPlayersQuery();

    return (
        <div>
            <AsyncStateWrapper query={getPlayersQuery as QueryState} >

                {/*<ScorekeepingTable*/}
                {/*    innings={gameSequence}*/}
                {/*    lineup={lineup}*/}
                {/*    allPlayers={useGetPlayers.data!}*/}
                {/*    setLineup={setLineup}*/}
                {/*    setInnings={setGameSequence}*/}
                {/*/>*/}
                <SaveNewGameFlow season={season}
                                 gameInfo={gameInfo}
                                 players={getPlayersQuery.data!}
                                 lineup={lineup}
                                 setSeason={setSeason}
                                 setGameInfo={setGameInfo}
                                 setLineup={setLineup}
                />
            </AsyncStateWrapper>

            <Button onClick={() => console.log(gameInfo, season)}> Submit </Button>
        </div>
    )
}

export default SaveNewGamePage;