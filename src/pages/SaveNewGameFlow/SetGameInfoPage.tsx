import {GameInfo} from "@/types/types";
import {useState} from "react";
import {DateTimePicker} from "@mui/x-date-pickers";
import {useGetOpponentsQuery} from "@/store/opponents/opponentApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import SelectOpponentAutocomplete from "@/components/SelectOpponentAutocomplete/SelectOpponentAutocomplete";

type SetGameInfoProps = {
    gameInfo : GameInfo;
    setGameInfo : (gameInfo : GameInfo) => void;
}

const SetGameInfoPage = (props : SetGameInfoProps) => {

    const [date, setDate] = useState(props.gameInfo.date);
    const [opponent, setOpponent] = useState(props.gameInfo.opponent);

    const getOpponentsQuery = useGetOpponentsQuery();

    return <div className="game-flow-content">
        <DateTimePicker
            label="Game Date/Time"
            value={date}
            onChange={(newValue) => setDate(newValue!)}
        />

        <AsyncStateWrapper query={getOpponentsQuery as QueryState} >
            <SelectOpponentAutocomplete opponents={getOpponentsQuery.data!} opponent={opponent} setSelectedOpponent={setOpponent} />
        </AsyncStateWrapper>
    </ div>

}

export default SetGameInfoPage;