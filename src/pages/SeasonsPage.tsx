import AsyncStateWrapper, {QueryState} from "../components/common/AsyncStateWrapper";
import {useGetSeasonsQuery} from "../store/seasons/seasonApiSlice";
import SeasonTable from "../components/SeasonTable/SeasonTable";

const SeasonsPage = () => {

    const getSeasonsQuery = useGetSeasonsQuery();

    return (
        <AsyncStateWrapper query={getSeasonsQuery as QueryState}>
            <SeasonTable seasons={getSeasonsQuery.data!} />
        </AsyncStateWrapper>
    )

}

export default SeasonsPage;