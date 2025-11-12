import AsyncStateWrapper, {QueryState} from "../components/common/AsyncStateWrapper";
import {useGetSeasonsQuery} from "../store/seasons/seasonApiSlice";
import SeasonTable from "../components/SeasonTable/SeasonTable";
import {Tooltip} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

const YearsAndSeasonsPage = () => {

    const getSeasonsQuery = useGetSeasonsQuery();

    return (
        <div className="content">
            <h1>
                Years / Seasons
                <Tooltip title={"Click on a session or year to get team stats info for that period"}>
                    <InfoIcon />
                </Tooltip>
            </h1>

            <AsyncStateWrapper query={getSeasonsQuery as QueryState}>
                <SeasonTable seasons={getSeasonsQuery.data!} />
            </AsyncStateWrapper>
        </div>
    )

}

export default YearsAndSeasonsPage;
