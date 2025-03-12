import {useParams} from "react-router-dom";
import {useGetSeasonResultsQuery} from "@/store/seasons/seasonApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import SeasonResultsTable from "@/components/SeasonResultsTable/SeasonResultsTable";
import {useGetSeasonTeamStatsQuery} from "@/store/seasonTeamStats/seasonTeamStatsApiSlice";
import TeamStatsTable from "@/components/TeamStatsTable/TeamStatsTable";

const SeasonInfoPage = () => {

    const {seasonId} = useParams();

    const getSeasonResultsQuery = useGetSeasonResultsQuery(parseInt(seasonId!));
    const getSeasonTeamStatsQuery = useGetSeasonTeamStatsQuery(parseInt(seasonId!));

    return <>
        <AsyncStateWrapper query={getSeasonResultsQuery as QueryState} >
            {getSeasonResultsQuery.data && (
                <div>
                    <h1>
                        {getSeasonResultsQuery.data!.season.session} {getSeasonResultsQuery.data!.season.year}
                    </h1>
                </div>
            )}
            <SeasonResultsTable seasonResults={getSeasonResultsQuery.data!} />
        </AsyncStateWrapper>

        <AsyncStateWrapper query={getSeasonTeamStatsQuery as QueryState} >
            <TeamStatsTable  playerStatlines={getSeasonTeamStatsQuery.data!} />
        </AsyncStateWrapper>
    </>

}

export default SeasonInfoPage;