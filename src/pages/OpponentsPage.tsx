import {useGetOpponentsQuery} from "@/store/opponents/opponentApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import {Autocomplete, TextField} from "@mui/material";
import {useState} from "react";
import {GameInfo, Opponent} from "@/types/types";
import {useLazyGetGamesByOpponentQuery} from "@/store/opponentGameLog/opponentGameLogApiSlice";
import GamesTable from "@/components/SeasonGamesTable/GamesTable";
import {useLazyGetTeamStatsByOpponentQuery} from "@/store/opponentTeamStats/opponentTeamStatsApiSlice";
import TeamStatsTable from "@/components/TeamStatsTable/TeamStatsTable";

const OpponentsPage = () => {

    const [opponent, setOpponent] = useState({} as Opponent);

    const getOpponentsQuery = useGetOpponentsQuery();
    const [getOpponentGameLogsTrigger, getOpponentGameLogsQuery] = useLazyGetGamesByOpponentQuery();
    const [getOpponentTeamStatsTrigger, getOpponentTeamStatsQuery] = useLazyGetTeamStatsByOpponentQuery();

    const updateOpponent = (opponent: Opponent) => {
        setOpponent(opponent);
        getOpponentGameLogsTrigger(opponent.id);
        getOpponentTeamStatsTrigger(opponent.id);
    }

    const computeRecord = (games : GameInfo[]) => {
        let wins = 0;
        let losses = 0;
        let ties = 0;

        games.forEach((game: GameInfo) => {
            if (game.runsFor > game.runsAgainst) {
                wins++;
            } else if (game.runsFor < game.runsAgainst) {
                losses++;
            } else {
                ties++;
            }
        });

        return {wins, losses, ties};
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

        <AsyncStateWrapper query={getOpponentGameLogsQuery as QueryState} >
            <h2>
                {opponent.teamName}
            </h2>

            {getOpponentGameLogsQuery.data && (
                <table>
                    <tbody>
                    <tr>
                        <th>
                            Wins
                        </th>
                        <th>
                            Losses
                        </th>
                        <th>
                            Ties
                        </th>
                    </tr>
                    <tr>
                        <td>
                            {computeRecord(getOpponentGameLogsQuery.data!.games).wins}
                        </td>
                        <td>
                            {computeRecord(getOpponentGameLogsQuery.data!.games).losses}
                        </td>
                        <td>
                            {computeRecord(getOpponentGameLogsQuery.data!.games).ties}
                        </td>
                    </tr>
                    </tbody>
                </table>
            )}
            <br/>

            <GamesTable games={getOpponentGameLogsQuery.data!} />
        </AsyncStateWrapper>

        <AsyncStateWrapper query={getOpponentTeamStatsQuery as QueryState} >
            <TeamStatsTable playerStatlines={getOpponentTeamStatsQuery.data!} displayWrcPlus={false} />
        </AsyncStateWrapper>
    </div>
}

export default OpponentsPage;
