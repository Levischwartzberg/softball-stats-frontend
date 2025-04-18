import {Player} from "@/types/types";
import SelectPlayerAutocomplete from "@/components/SelectPlayerAutocomplete/SelectPlayerAutocomplete";
import {useGetPlayersQuery} from "@/store/players/playerApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";

type SetStartingLineupProps = {
    lineup : Player[],
    setLineup : (lineup : Player[]) => void;
}

const SetStartingLineup = (props : SetStartingLineupProps) => {

    const getPlayersQuery = useGetPlayersQuery();

    const setPlayer = (player : Player, index : number) => {
        const modifiedLineup = [...props.lineup];
        modifiedLineup[index] = player;
        props.setLineup(modifiedLineup);
    }

    return <div className="content">
        <table>
            <thead>
            <tr>
                <th>
                    Player
                </th>
            </tr>
            </thead>
            <tbody>
            <AsyncStateWrapper query={getPlayersQuery as QueryState}>
                {props.lineup.map((player, index) => (
                    <tr>
                        <SelectPlayerAutocomplete players={getPlayersQuery.data!} player={player} index={index} setSelectedPlayer={setPlayer} />
                    </tr>
                ))}
                <tr><SelectPlayerAutocomplete players={getPlayersQuery.data! ? getPlayersQuery.data!.filter(player => !props.lineup.includes(player)) : []} index={props.lineup.length} setSelectedPlayer={setPlayer} /></tr>
            </AsyncStateWrapper>
            </tbody>
        </table>
    </div>
}

export default SetStartingLineup;