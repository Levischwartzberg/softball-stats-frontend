import {Dayjs} from "dayjs";

export type Inning = {
    inning : number,
    atBats : AtBat[],
    opponentRuns? : number
}

export type AtBat = {
    inningIndex : number,
    player : Player,
    result : AtBatResult,
    scoring : string,
    region? : number,
    angle? : number,
    velocity? : number,
    baserunners : Baserunners,
    outs : Player[],
    runs : Player[]
}

export enum AtBatResult {
    SINGLE = "Single",
    DOUBLE = "Double",
    TRIPLE = "Triple",
    HOMERUN = "Homerun",
    WALK = "Walk",
    OUT = "Out(s)",
    ERROR = "Error"

}

export type Player = {
    id : number,
    firstName : string,
    lastName : string,
    height : string,
    weight : number,
    throwHand : string,
    batHand : string
}

export type Baserunners = {
    first : Player | null,
    second : Player | null,
    third : Player | null
}

export type SeasonStatline = {
    season : Season,
    statline : Statline
}

export type PlayerStatline = {
    player : Player,
    statline : Statline
}

export type Season = {
    id : number,
    session : string,
    year : number
}

export type CreateSeasonDTO = {
    session : string,
    year : number
}

export type CreatePlayerDTO = {
    firstName : string,
    lastName : string,
    height : string,
    weight : number,
    throwHand : string,
    batHand : string
}

export type Statline = {
    games? : number,
    lineupSpot? : number,
    atBats : number,
    hits : number,
    singles : number,
    doubles : number,
    triples : number,
    homeruns : number,
    walks : number,
    runs : number,
    rbi : number,
    avg : number,
    obp : number,
    slg : number,
    ops : number
}

export type Result = {
    id : number,
    result : string,
    score : string,
    date : Date
}

export type SeasonResults = {
    season : Season,
    results : Result[]
}

export type GameInfo = {
    id : number,
    date : Dayjs,
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

export type Opponent = {
    id : number,
    teamName : string
}

export type CreateOpponentDTO = {
    teamName : string
}

export type CreateScorekeepingGameDTO = {
    season : Season,
    gameInfo : GameInfo,
    innings : Inning[]
}

export enum WeatherConditionENUM {
    RAIN,
    CLOUDY,
    PARTLY_CLOUDY,
    SUNNY,
    NIGHT,
    WINDY
}