import {useGetTeamLifetimeStatsQuery} from "@/store/teamLifetimeStats/teamLifetimeStatsApiSlice";
import {GameTableFieldNameENUM} from "@/store/teamLifetimeStats/teamLifetimeStatsTypes";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import TeamStatsTable from "@/components/TeamStatsTable/TeamStatsTable";
import {useState} from "react";
import {FormControl, InputLabel, OutlinedInput} from "@mui/material";
import {isNumber} from "@mui/base/unstable_useNumberInput/utils";

const LifetimeStatsPage = () => {

    const [minimumAtBats, setMinimumAtBats] = useState(0);

    const getTeamLifetimeStatsQuery = useGetTeamLifetimeStatsQuery({field: GameTableFieldNameENUM.AT_BATS, value: minimumAtBats});

    const updateMinimumAtBats = (abs : string) => {
        if (isNumber(parseInt(abs))) {
            setMinimumAtBats(parseInt(abs));
        } else if (abs === "") {
            setMinimumAtBats(0);
        }
    }

    return (<div className="content">
            <h1>Lifetime Stats</h1>
            <div style={{display : "flex", alignItems : "start"}}>
                <FormControl sx={{ m: 1 }} style={{display : "block"}}>
                    <InputLabel htmlFor="outlined-adornment-min-abs">Min. ABs</InputLabel>
                    <OutlinedInput
                        className="outlined-input"
                        id="outlined-adornment-min-abs"
                        label="Min. ABs"
                        value={minimumAtBats}
                        onChange={(event) => updateMinimumAtBats(event.target.value)}
                    />
                </FormControl>
            </div>
        <AsyncStateWrapper query={getTeamLifetimeStatsQuery as QueryState} >
            <TeamStatsTable playerStatlines={getTeamLifetimeStatsQuery.data!} />
        </AsyncStateWrapper>
    </div>
    )
}

export default LifetimeStatsPage;