export type TeamLifetimeStatsQueryParams = {
    field : GameTableFieldNameENUM,
    value : number
}

export enum GameTableFieldNameENUM {
    AT_BATS = "at_bats",
    SINGLES = "singles",
    DOUBLES = "doubles",
    TRIPLES = "triples",
    HOMERUNS = "homeruns",
    WALKS = "walks",
    RUNS = "runs",
    RBI = "rbi"
}