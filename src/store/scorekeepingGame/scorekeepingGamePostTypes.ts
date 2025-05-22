import {Inning, Opponent, Season, WeatherConditionENUM} from "@/types/types";

export type CreateScorekeepingGameDTO = {
    season : Season,
    gameInfo : GameInfoPostDto,
    innings : Inning[]
}

export type GameInfoPostDto = {
    gameInfoId : number,
    date : string,
    result : string,
    home : boolean | undefined,
    runsFor : number,
    runsAgainst : number,
    opponent? : Opponent,
    season : Season,
    field? : string,
    temperature? : number,
    weatherConditions? : WeatherConditionENUM[],
    gameNotes? : string;
}


