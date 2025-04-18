import {useParams} from "react-router-dom";
import Boxscore from "@/components/Boxscore/Boxscore";
import {useGetBoxscoreQuery} from "@/store/boxscore/boxscoreApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";

const ResultPage = () => {

    const {gameId} = useParams();

    const getBoxscoreQuery = useGetBoxscoreQuery(parseInt(gameId!));

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

    return <div className="content">
        <AsyncStateWrapper query={getBoxscoreQuery as QueryState} >
            {getBoxscoreQuery.data && (
                <div>
                    <h2 style={{textAlign: "left"}}>
                        <span style={{fontWeight: "bold"}}> Game Date: </span> <span style={{fontWeight: "normal"}}> {getBoxscoreQuery.data!.gameInfo.date.toString()} </span>
                    </h2>
                    <h2 style={{textAlign: "left"}}>
                        <span style={{fontWeight: "bold"}}> Result: </span> <span style={{fontWeight: "normal"}}> {determineResult(getBoxscoreQuery.data!.gameInfo.runsFor, getBoxscoreQuery.data!.gameInfo.runsAgainst) + " " + formatScore(getBoxscoreQuery.data!.gameInfo.runsFor, getBoxscoreQuery.data!.gameInfo.runsAgainst)} </span>
                    </h2>
                </div>
            )}

            <Boxscore boxscore={getBoxscoreQuery.data!}/>
        </AsyncStateWrapper>
    </div>
}

export default ResultPage;