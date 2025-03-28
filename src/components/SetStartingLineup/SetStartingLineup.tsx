import {Player} from "@/types/types";
import SelectPlayerAutocomplete from "@/components/SelectPlayerAutocomplete/SelectPlayerAutocomplete";

type SetStartingLineupProps = {
    players : Player[],
    lineup : Player[],
    setLineup : (lineup : Player[]) => void;
}

const SetStartingLineup = (props : SetStartingLineupProps) => {

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
            {props.lineup.map((player, index) => (
                <tr>
                    <SelectPlayerAutocomplete players={props.players} player={player} index={index} setSelectedPlayer={setPlayer} />
                </tr>
            ))}
            <tr><SelectPlayerAutocomplete players={props.players.filter(player => !props.lineup.includes(player))} index={props.lineup.length} setSelectedPlayer={setPlayer} /></tr>
            </tbody>
        </table>
    </div>
}

export default SetStartingLineup;