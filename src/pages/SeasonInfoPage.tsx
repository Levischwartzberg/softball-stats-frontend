import {useParams} from "react-router-dom";
import {useGetSeasonResultsQuery} from "@/store/seasons/seasonApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import SeasonResultsTable from "@/components/SeasonResultsTable/SeasonResultsTable";

const SeasonInfoPage = () => {

    const {seasonId} = useParams();

    const getSeasonResultsQuery = useGetSeasonResultsQuery(parseInt(seasonId!));

    return <>
        <AsyncStateWrapper query={getSeasonResultsQuery as QueryState} >
            <div>

            </div>
            <SeasonResultsTable seasonResults={getSeasonResultsQuery.data!} />
        </AsyncStateWrapper>
    </>

}

export default SeasonInfoPage;