import css from "../Statline/Statline.module.scss";
import {YearlyStatline} from "@/types/types";
import StatlineHeader from "../../components/Statline/StatlineHeader";
import StatlineData from "../../components/Statline/StatlineData";

type PlayerYearlyStatsProps = {
    yearlyStats : YearlyStatline[];
}

const PlayerYearlyStatsTable = (props : PlayerYearlyStatsProps) => {

    return (
        <table className={css.statsTable}>
            <thead>
                <tr>
                    <StatlineHeader games={true} year={true} displayWrcPlus={true} />
                </tr>
            </thead>
            <tbody>
                {props.yearlyStats.map(yearlyStatline => (
                    <tr>
                        <StatlineData statline={yearlyStatline.statline} year={yearlyStatline.year} displayWrcPlus={true} />
                    </tr>
                    )
                )}
            </tbody>
        </table>
    )
}

export default PlayerYearlyStatsTable;
