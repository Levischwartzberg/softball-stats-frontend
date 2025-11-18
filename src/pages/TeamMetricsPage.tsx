import {useGetRunExpectancyDataQuery} from "@/store/runExpectancy/runExpectancyApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import RunExpectancyMatrix from "@/components/RunExpectancyMatrix/RunExpectancyMatrix";

const TeamMetricsPage = () => {

    const getRunExpectancyDataQuery = useGetRunExpectancyDataQuery();

    return <div className="content">
        <h3>Run Expectancy Matrix</h3>
        <AsyncStateWrapper query={getRunExpectancyDataQuery as QueryState}>
            <RunExpectancyMatrix runExpectancyData={getRunExpectancyDataQuery.data!} />
        </AsyncStateWrapper>
    </div>
}

export default TeamMetricsPage;
