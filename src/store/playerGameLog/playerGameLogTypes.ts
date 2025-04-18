import {GameInfo, Statline} from "@/types/types";

export type PlayerGameLogQueryParams = {
    playerId : number,
    seasonId : number
}

export type GameInfoStatline = {
    gameInfo : GameInfo,
    statline : Statline
}