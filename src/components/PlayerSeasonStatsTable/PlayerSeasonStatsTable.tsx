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
        <Table className={css.statsTable}>
            <StatlineHeader statline={props.seasonStats[0].statline} season={true} />
            {props.seasonStats.map(seasonStatline => (
                <StatlineData statline={seasonStatline.statline} season={seasonStatline.season} />
                )
            )}
        </Table>
    )
}

export default PlayerSeasonStatsTable;