import {useParams} from "react-router-dom";
import {useGetSeasonGamesQuery} from "@/store/seasons/seasonApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import SeasonGamesTable from "@/components/SeasonGamesTable/SeasonGamesTable";
import {useGetSeasonTeamStatsQuery} from "@/store/seasonTeamStats/seasonTeamStatsApiSlice";
import TeamStatsTable from "@/components/TeamStatsTable/TeamStatsTable";

const SeasonInfoPage = () => {

    const {seasonId} = useParams();

    const getSeasonGamesQuery = useGetSeasonGamesQuery(parseInt(seasonId!));
    const getSeasonTeamStatsQuery = useGetSeasonTeamStatsQuery(parseInt(seasonId!));

    return <>
        <AsyncStateWrapper query={getSeasonGamesQuery as QueryState} >
            {getSeasonGamesQuery.data && (
                <div>
                    <h1>
                        {getSeasonGamesQuery.data!.season.session} {getSeasonGamesQuery.data!.season.year}
                    </h1>
                </div>
            )}
            <SeasonGamesTable seasonGames={getSeasonGamesQuery.data!} />
        </AsyncStateWrapper>

        <AsyncStateWrapper query={getSeasonTeamStatsQuery as QueryState} >
            <TeamStatsTable  playerStatlines={getSeasonTeamStatsQuery.data!} />
        </AsyncStateWrapper>
    </>

}

export default SeasonInfoPage;