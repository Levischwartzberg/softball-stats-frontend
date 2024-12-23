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
    lastName : string
}

export type Baserunners = {
    first : Player | null,
    second : Player | null,
    third : Player | null
}