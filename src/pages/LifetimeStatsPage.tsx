import {useGetTeamLifetimeStatsQuery} from "@/store/teamLifetimeStats/teamLifetimeStats";
import {GameTableFieldNameENUM} from "@/store/teamLifetimeStats/teamLifetimeStatsTypes";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import TeamStatsTable from "@/components/TeamStatsTable/TeamStatsTable";

const LifetimeStatsPage = () => {

    const getTeamLifetimeStatsQuery = useGetTeamLifetimeStatsQuery({field: GameTableFieldNameENUM.AT_BATS, value: 0});

    return (
        <AsyncStateWrapper query={getTeamLifetimeStatsQuery as QueryState} >
            <TeamStatsTable  playerStatlines={getTeamLifetimeStatsQuery.data!} />
        </AsyncStateWrapper>
    )
}

export default LifetimeStatsPage;