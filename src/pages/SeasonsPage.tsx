import AsyncStateWrapper, {QueryState} from "../components/common/AsyncStateWrapper";
import {useGetSeasonsQuery} from "../store/seasons/seasonApiSlice";
import SeasonTable from "../components/SeasonTable/SeasonTable";

const SeasonsPage = () => {

    const getSeasonsQuery = useGetSeasonsQuery();

    return (
        <div className="content">
            <h1>
                Seasons
            </h1>

            <AsyncStateWrapper query={getSeasonsQuery as QueryState}>
                <SeasonTable seasons={getSeasonsQuery.data!} />
            </AsyncStateWrapper>
        </div>
    )

}

export default SeasonsPage;