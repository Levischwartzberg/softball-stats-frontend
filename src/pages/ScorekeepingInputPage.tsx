import {useState} from "react";
import {Inning, Player} from "../types/types";
import ScorekeepingTable from "../components/ScorekeepingTable/ScorekeepingTable";
import {useGetPlayersQuery} from "../store/players/playerApiSlice";
import AsyncStateWrapper, {QueryState} from "../components/common/AsyncStateWrapper";

function ScorekeepingInputPage() {

    // const [lineup, setLineup] = useState(sampleLineup as Player[]);
    // const [gameSequence, setGameSequence] = useState(sampleGameData.innings as Inning[]);
    const [lineup, setLineup] = useState([] as Player[]);
    const [gameSequence, setGameSequence] = useState([{inning : 1, atBats : []}] as Inning[]);

    const useGetPlayers = useGetPlayersQuery();

    return (
        <div>
            <AsyncStateWrapper query={useGetPlayers as QueryState} >
                <ScorekeepingTable
                    innings={gameSequence}
                    lineup={lineup}
                    allPlayers={useGetPlayers.data!}
                    setLineup={setLineup}
                    setInnings={setGameSequence}
                />
            </AsyncStateWrapper>
        </div>
    )
}

export default ScorekeepingInputPage;