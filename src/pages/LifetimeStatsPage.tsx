import {useGetTeamLifetimeStatsQuery} from "@/store/teamLifetimeStats/teamLifetimeStatsApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import TeamStatsTable from "@/components/TeamStatsTable/TeamStatsTable";

const LifetimeStatsPage = () => {

    const getTeamLifetimeStatsQuery = useGetTeamLifetimeStatsQuery();

    return (<div className="content">
            <h1>Lifetime Stats</h1>
        <AsyncStateWrapper query={getTeamLifetimeStatsQuery as QueryState} >
            <TeamStatsTable playerStatlines={getTeamLifetimeStatsQuery.data!} displayWrcPlus={true} />
        </AsyncStateWrapper>
    </div>
    )
}

export default LifetimeStatsPage;
