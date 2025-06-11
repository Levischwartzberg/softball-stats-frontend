import {GameInfo, Inning, PlayerStatline} from "@/types/types";

export type BoxscoreDTO = {
    gameInfo : GameInfo,
    playerStatlines : PlayerStatline[],
    innings : Inning[]
}