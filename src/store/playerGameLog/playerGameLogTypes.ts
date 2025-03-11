import {Result, Statline} from "@/types/types";

export type PlayerGameLogQueryParams = {
    playerId : number,
    seasonId : number
}

export type ResultStatline = {
    result : Result,
    statline : Statline
}