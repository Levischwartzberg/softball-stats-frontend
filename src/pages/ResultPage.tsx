import {useParams} from "react-router-dom";
import Boxscore from "@/components/Boxscore/Boxscore";
import {useGetBoxscoreQuery} from "@/store/boxscore/boxscoreApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";

const ResultPage = () => {

    const {gameId} = useParams();

    const getBoxscoreQuery = useGetBoxscoreQuery(parseInt(gameId!));

    return <>
        <AsyncStateWrapper query={getBoxscoreQuery as QueryState} >
            {getBoxscoreQuery.data && (
                <div>
                    <h2 style={{textAlign: "left"}}>
                        <span style={{fontWeight: "bold"}}> Game Date: </span> <span style={{fontWeight: "normal"}}> {getBoxscoreQuery.data!.result.date.toString()} </span>
                    </h2>
                    <h2 style={{textAlign: "left"}}>
                        <span style={{fontWeight: "bold"}}> Result: </span> <span style={{fontWeight: "normal"}}> {getBoxscoreQuery.data!.result.result + " " + getBoxscoreQuery.data!.result.score} </span>
                    </h2>
                </div>
            )}

            <Boxscore boxscore={getBoxscoreQuery.data!}/>
        </AsyncStateWrapper>
    </>
}

export default ResultPage;