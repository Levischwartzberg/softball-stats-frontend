import {useState} from "react";
import {GameInfo, Inning, Player, Season} from "../types/types";
import {useGetPlayersQuery} from "../store/players/playerApiSlice";
import AsyncStateWrapper, {QueryState} from "../components/common/AsyncStateWrapper";
import {Button} from "@mui/material";
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

                <SaveNewGameFlow season={season}
                                 gameInfo={gameInfo}
                                 players={getPlayersQuery.data!}
                                 lineup={lineup}
                                 gameSequence={gameSequence}
                                 setSeason={setSeason}
                                 setGameInfo={setGameInfo}
                                 setLineup={setLineup}
                                 setGameSequence={setGameSequence}
                />
            </AsyncStateWrapper>

            <Button onClick={() => console.log(gameInfo, season, gameSequence)}> Submit </Button>
        </div>
    )
}

export default SaveNewGamePage;