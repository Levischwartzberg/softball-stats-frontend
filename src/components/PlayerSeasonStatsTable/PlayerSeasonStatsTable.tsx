import {Table} from "@mui/material";
import css from "../Statline/Statline.module.scss";
import {SeasonStatline} from "../../types/types";
import StatlineHeader from "../../components/Statline/StatlineHeader";
import StatlineData from "../../components/Statline/StatlineData";

type PlayerSeasonStatsProps = {
    seasonStats : SeasonStatline[]
}

const PlayerSeasonStatsTable = (props : PlayerSeasonStatsProps) => {

    return (
        <table className={css.statsTable}>
            <thead>
                <tr>
                    <StatlineHeader games={true} season={true} />
                </tr>
            </thead>
            <tbody>
                {props.seasonStats.map(seasonStatline => (
                    <tr>
                        <StatlineData statline={seasonStatline.statline} season={seasonStatline.season} />
                    </tr>
                    )
                )}
            </tbody>
        </table>
    )
}

export default PlayerSeasonStatsTable;