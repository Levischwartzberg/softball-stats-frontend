import {useParams} from "react-router-dom";
import Boxscore from "@/components/Boxscore/Boxscore";
import {useGetBoxscoreQuery} from "@/store/boxscore/boxscoreApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import {useLazyGetScoresheetQuery} from "@/store/scoresheet/scoresheetApiSlice";
import Button from "@mui/material/Button";
import Scoresheet from "@/components/Scoresheet/Scoresheet";
import GameInfoCard from "@/components/GameInfoTable/GameInfoCard";
import LineScore from "@/components/LineScore/LineScore";

const ResultPage = () => {

    const {gameId} = useParams();

    const getBoxscoreQuery = useGetBoxscoreQuery(parseInt(gameId!));
    const [getScoresheetTrigger, getScoresheetQuery] = useLazyGetScoresheetQuery();

    return <div className="content">
        <AsyncStateWrapper query={getBoxscoreQuery as QueryState} >
            <GameInfoCard boxscoreDTO={getBoxscoreQuery.data!} />

            <LineScore boxscoreDTO={getBoxscoreQuery.data!} />

            <Boxscore boxscore={getBoxscoreQuery.data!}/>
        </AsyncStateWrapper>

        <Button onClick={() => getScoresheetTrigger(parseInt(gameId!))}>Show Scoresheet</Button>
        <AsyncStateWrapper query={getScoresheetQuery as QueryState}>
            {getScoresheetQuery.data && (
                <Scoresheet innings={getScoresheetQuery.data!.innings} />
            )}
        </AsyncStateWrapper>
    </div>
}

export default ResultPage;
