import {Season} from "@/types/types";
import {useGetSeasonsQuery} from "@/store/seasons/seasonApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import ChooseSeasonDropdown from "@/components/ChooseSeasonDropdown/ChooseSeasonDropdown";
import CreateNewSeason from "@/components/CreateNewSeason/CreateNewSeason";

type ChooseSeasonPageProps = {
    season : Season,
    setSeason : (season : Season) => void;
}

const ChooseSeasonPage = (props : ChooseSeasonPageProps) => {

    const getSeasonsQuery = useGetSeasonsQuery();

    return <div className="game-flow-content">
        <h2> Choose Existing Season </h2>
        <AsyncStateWrapper query={getSeasonsQuery as QueryState} >
            <ChooseSeasonDropdown seasons={getSeasonsQuery.data!} season={props.season} setSeason={props.setSeason} />
        </AsyncStateWrapper>

        <h2> Create New Season </h2>
        <CreateNewSeason setSeason={props.setSeason} />
    </div>
}

export default ChooseSeasonPage;