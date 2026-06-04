import {useGetOpponentsQuery} from "@/store/opponents/opponentApiSlice";
import AsyncStateWrapper, {QueryState} from "@/components/common/AsyncStateWrapper";
import {Autocomplete, TextField} from "@mui/material";
import {useState} from "react";
import {GameInfo, Opponent} from "@/types/types";
import GamesTable from "@/components/SeasonGamesTable/GamesTable";
import TeamStatsTable from "@/components/TeamStatsTable/TeamStatsTable";
import {useNavigate, useParams} from "react-router-dom";
import {useGetGamesByOpponentQuery} from "@/store/opponentGameLog/opponentGameLogApiSlice";
import {useGetTeamStatsByOpponentQuery} from "@/store/opponentTeamStats/opponentTeamStatsApiSlice";

const OpponentPage = () => {

    const navigate = useNavigate();
    const {opponentId} = useParams();

    const getOpponentsQuery = useGetOpponentsQuery();
    const getOpponentGameLogsQuery = useGetGamesByOpponentQuery(parseInt(opponentId!));
    const getTeamStatsByOpponentQuery = useGetTeamStatsByOpponentQuery(parseInt(opponentId!));

    const [opponent, setOpponent] = useState(opponentId ? getOpponentsQuery.data?.find(opp => opp.id === parseInt(opponentId)) : {} as Opponent);

    const updateOpponent = (opponent: Opponent) => {
        navigate(`/opponents/${opponent.id}`);
        setOpponent(opponent);
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
                defaultValue={opponent ? opponent : undefined}
                blurOnSelect={true}
                options={getOpponentsQuery.data!}
                getOptionLabel={(opponent) => opponent.teamName}
                sx={{ width: 300 }}
                onChange={(event, value) => updateOpponent(value as Opponent)}
                renderInput={(params) => <TextField {...params} label="Opponent" />}
            />
        </AsyncStateWrapper>

        <AsyncStateWrapper query={getOpponentGameLogsQuery as QueryState} >
            {getOpponentGameLogsQuery.data && (
                <>
                    <h2>
                        {getOpponentGameLogsQuery.data!.opponent.teamName}
                    </h2>

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
                </>
            )}
            <br/>

            <GamesTable games={getOpponentGameLogsQuery.data!} />
        </AsyncStateWrapper>

        <AsyncStateWrapper query={getTeamStatsByOpponentQuery as QueryState} >
            <TeamStatsTable playerStatlines={getTeamStatsByOpponentQuery.data!} displayWrcPlus={false} />
        </AsyncStateWrapper>
    </div>
}

export default OpponentPage;
