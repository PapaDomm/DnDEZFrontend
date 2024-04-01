import { Image } from "./usermodel";

export interface CharacterModel {
    userId : number;
    characterId : number;
    name : string;
    race : string;
    class : string;
    level : number;
    image : Image;
    charAbilityScores : CharAbilityScoreDTOModel[];

}

export interface CharAbilityScoreDTOModel {
    index : string;
    value : number;
    racialBonus : boolean
}
