import { Image } from "./usermodel";

export interface CharacterModel {
    userId : number;
    characterId : number;
    name : string;
    alignment : string;
    race : string;
    speed : number;
    class : string;
    level : number;
    initiative : number;
    image : Image;
    proficiencyBonus : number;
    skills : Skill[];
    savingThrows : SavingThrow[];
    charAbilityScores : CharAbilityScoreDTOModel[];

}

export interface Skill {
    index : string;
    value : number;
    proficient : boolean;
}

export interface SavingThrow {
    index : string;
    value : number;
    proficient : boolean;
}

export interface CharAbilityScoreDTOModel {
    index : string;
    value : number;
    racialBonus : boolean;
}
