import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import TeamStatsTable from "@/components/TeamStatsTable/TeamStatsTable"
import {useParams} from "react-router-dom";
import {useGetYearlyTeamStatsQuery} from "@/store/yearlyTeamStats/yearlyTeamStatsApiSlice";

const YearlyTeamStatsPage = () => {

    const {year} = useParams();

    const getYearlyTeamStatsQuery  = useGetYearlyTeamStatsQuery(parseInt(year!));

    return (<div className="content">
            <h1>Yearly Stats ({year})</h1>
            <AsyncStateWrapper query={getYearlyTeamStatsQuery as QueryState} >
                <TeamStatsTable playerStatlines={getYearlyTeamStatsQuery.data!} displayWrcPlus={true} />
            </AsyncStateWrapper>
        </div>
    )
}

export default YearlyTeamStatsPage;
