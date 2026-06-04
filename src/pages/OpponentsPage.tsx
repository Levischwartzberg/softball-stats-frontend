import {useGetOpponentsQuery} from "@/store/opponents/opponentApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import {Autocomplete, TextField} from "@mui/material";
import {Opponent} from "@/types/types";
import {useNavigate} from "react-router-dom";

const OpponentsPage = () => {

    const navigate = useNavigate();

    const getOpponentsQuery = useGetOpponentsQuery();

    const updateOpponent = (opponent: Opponent) => {
        navigate(`/opponents/${opponent.id}`);
    }

    return <div className="content">
        <h1>Opponents</h1>

        <AsyncStateWrapper query={getOpponentsQuery as QueryState} >
            <Autocomplete
                disableClearable={true}
                disablePortal
                defaultValue={undefined}
                blurOnSelect={true}
                options={getOpponentsQuery.data!}
                getOptionLabel={(opponent) => opponent.teamName}
                sx={{ width: 300 }}
                onChange={(event, value) => updateOpponent(value as Opponent)}
                renderInput={(params) => <TextField {...params} label="Opponent" />}
            />
        </AsyncStateWrapper>
    </div>
}

export default OpponentsPage;
