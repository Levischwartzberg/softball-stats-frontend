export type Inning = {
    inning : number,
    atBats : AtBat[]
}

export type AtBat = {
    index : number,
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
    ERROR = "Error(s)"

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

export type Season = {
    id : number,
    session : string,
    year : number
}

export type Statline = {
    games? : number,
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