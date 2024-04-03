export interface Classmodel {
    index : string;
    name : string;
    proficiency : proficiency;
    saving_Throws : classSavingThrow[]
}

export interface proficiency {
    choose : number;
    choices : classSkill[];
}

export interface classSkill {
    index : string; 
    name : string;
    score : skillAbility
}

export interface skillAbility {
    index : string; 
    name : string;
}

export interface classSavingThrow {
    index : string;
    name : string;
    url : string;
}
