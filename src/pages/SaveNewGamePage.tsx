import {useState} from "react";
import {GameInfo, Inning, Player, Season} from "../types/types";
import {useGetPlayersQuery} from "../store/players/playerApiSlice";
import AsyncStateWrapper, {QueryState} from "../components/common/AsyncStateWrapper";
import SaveNewGameFlow from "@/pages/SaveNewGameFlow/SaveNewGameFlow";
import dayjs from "dayjs";
import {useCreateScorekeepingGameMutation} from "@/store/scorekeepingGame/scorekeepingGameApiSlice";
import AsyncButton from "@/components/common/AsyncButton";

function SaveNewGamePage() {

    const [season, setSeason] = useState({} as Season);
    const [gameInfo, setGameInfo] = useState({date : dayjs()} as GameInfo);
    const [lineup, setLineup] = useState([] as Player[]);
    const [gameSequence, setGameSequence] = useState([{inning : 1, atBats : []}] as Inning[]);
    const [showConfirmButton, setShowConfirmButton] = useState(false);

    const [createScorekeepingGameTrigger, createScorekeepingGameQuery] = useCreateScorekeepingGameMutation();

    const confirmGameInfo = () => {
        setShowConfirmButton(true);
    }

    const saveGame = async () => {
        // clean up and validate....
        gameInfo.runsFor = gameSequence.flatMap(inning => inning.atBats).map(atBat => atBat.runs.length).reduce((partialSum, a) => partialSum + a, 0);

        if (gameSequence[gameSequence.length-1].atBats.length < 1) {
            gameSequence.pop();
        }

        const createScorekeepingGameDTO = {
            season : season,
            gameInfo : gameInfo,
            innings : gameSequence
        }

        await createScorekeepingGameTrigger(createScorekeepingGameDTO);

        setGameInfo(gameInfo);
        setGameSequence(gameSequence);
        setShowConfirmButton(false);
    }

    return (
        <div className="content">
            <SaveNewGameFlow season={season}
                             gameInfo={gameInfo}
                             lineup={lineup}
                             gameSequence={gameSequence}
                             setSeason={setSeason}
                             setGameInfo={setGameInfo}
                             setLineup={setLineup}
                             setGameSequence={setGameSequence}
                             confirmGameInfo={confirmGameInfo}
            />

            {showConfirmButton && (
                <AsyncButton onClick={() => saveGame()} isLoading={createScorekeepingGameQuery.isLoading}> Confirm Save Game </AsyncButton>
            )}
        </div>
    )
}

export default SaveNewGamePage;