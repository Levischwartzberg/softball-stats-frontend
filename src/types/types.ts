import {Dayjs} from "dayjs";
import {LaunchAngle, Region} from "@/components/PlayerBattedBallWRCPlusTable/PlayerBattedBallWRCPlusTable";

export type Inning = {
    inning : number,
    atBats : AtBat[],
    opponentRuns? : number,
    mortsRuns? : number
}

export type AtBat = {
    inningIndex : number,
    player : Player,
    result : AtBatResult,
    scoring : string,
    region? : RegionENUM,
    launchAngle? : LaunchAngleENUM,
    exitVelocity? : number,
    ballsAndStrikes? : string,
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
    ERROR = "Error",
    SKIP = "Skip"
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

export type YearlyStatline = {
    year : number,
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
    ops : number,
    wrcPlus? : number
}

export type Result = {
    id : number,
    result : string,
    score : string,
    date : Date
}

export type SeasonGames = {
    season : Season,
    games : GameInfo[]
}

export type GameInfo = {
    gameInfoId : number,
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
    opponentId : number,
    teamName : string
}

export type CreateOpponentDTO = {
    teamName : string
}

export type Scoresheet = {
    innings : Inning[];
}

export enum RegionENUM {
    FOUL_LEFT = "Foul Left",
    LEFT = "Left",
    LEFT_CENTER = "Left Center",
    CENTER = "Center",
    RIGHT_CENTER = "Right Center",
    RIGHT = "Right",
    FOUL_RIGHT = "Foul Right"
}

export enum LaunchAngleENUM {
    GROUNDBALL = "Groundball",
    LINER = "Liner",
    FLYBALL = "Flyball",
    POPUP = "Popup"
}

export enum WeatherConditionENUM {
    RAIN,
    CLOUDY,
    PARTLY_CLOUDY,
    SUNNY,
    NIGHT,
    WINDY
}

export enum OperationENUM {
    LESS_THAN = "<",
    LESS_THAN_OR_EQUAL = "<=",
    EQUAL = "=",
    GREATER_THAN_OR_EQUAL = ">=",
    GREATER_THAN = ">"
}

export type PlayerBattedBallData = {
    playerId : number,
    battedBallData : BattedBallData[]
}

export type BattedBallData = {
    exitVelocity : number,
    launchAngle : LaunchAngle,
    result : AtBatResult,
    region : Region;
    runsAboveAverage : number;
    player?: Player;
    gameInfoId?: number;
}

export type BattingResultsByExitVelocity = {
    exitVelocity: number,
    atBats: number,
    hits: number,
    totalBases: number,
}

export type RunExpectancyData = {
    situationRunExpectancy : SituationRunExpectancy[],
    resultRunExpectancy : ResultRunExpectancy
}

export type SituationRunExpectancy = {
    firstBaseOccupied : boolean,
    secondBaseOccupied : boolean,
    thirdBaseOccupied : boolean,
    outs : number,
    runExpectancy : number
}

export type ResultRunExpectancy = {
    runExpectancyByResult: { [key in AtBatResult]: number }
}


