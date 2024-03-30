export interface RaceDTOModel {
    index:                      string;
    name:                       string;
    ability_bonuses:   Ability_Bonuses[];
}


export interface Ability_Bonuses{
    ability_score:        Ability_Score;
    bonus:                      number;
}

export interface Ability_Score {
    index:                      string;
    name:                       string;
    url:                        string;
}
