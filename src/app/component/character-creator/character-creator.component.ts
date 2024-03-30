import { Component } from '@angular/core';
import { CharacterService } from '../../services/Character/character.service';
import { DnDRulesService } from '../../services/DndRules/dn-drules.service';
import { CharAbilityScoreDTOModel } from '../../models/character';
import { RaceDTOModel } from '../../models/race-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './character-creator.component.html',
  styleUrl: './character-creator.component.css'
})
export class CharacterCreatorComponent {
    constructor(private characterService:CharacterService, private dndrulesService: DnDRulesService){}

    UserId : number = 0;

    name : string = '';

    race : string  = '';

    raceStats : RaceDTOModel[] = [];

    currentRace : RaceDTOModel = {} as RaceDTOModel;

    class : string = '';

    classStats : string[] = [];

    level : string = '';

    points : number = 27;

    BaseAbilityScores : CharAbilityScoreDTOModel[] = [
      {index : 'str', value : 8, racialBonus : false},
      {index : 'dex', value : 8, racialBonus : false},
      {index : 'con', value : 8, racialBonus : false},
      {index : 'int', value : 8, racialBonus : false},
      {index : 'wis', value : 8, racialBonus : false},
      {index : 'cha', value : 8, racialBonus : false}
    ];

    newCharacterAbilityScores : CharAbilityScoreDTOModel[] = [
      {index : 'str', value : 0, racialBonus : false},
      {index : 'dex', value : 0, racialBonus : false},
      {index : 'con', value : 0, racialBonus : false},
      {index : 'int', value : 0, racialBonus : false},
      {index : 'wis', value : 0, racialBonus : false},
      {index : 'cha', value : 0, racialBonus : false}
    ];

    totalAbilityScores : CharAbilityScoreDTOModel[] = [
      {index : 'str', value : 0, racialBonus : false},
      {index : 'dex', value : 0, racialBonus : false},
      {index : 'con', value : 0, racialBonus : false},
      {index : 'int', value : 0, racialBonus : false},
      {index : 'wis', value : 0, racialBonus : false},
      {index : 'cha', value : 0, racialBonus : false}
    ];

    characterForm : FormData = new FormData();

    choseRace(r : RaceDTOModel){

      if(this.currentRace.index == r.index && this.newCharacterAbilityScores.some(a => a.racialBonus == true))
      {
        return;
      }
      if(this.currentRace.index != r.index && this.newCharacterAbilityScores.some(a => a.racialBonus == true))
      {
        this.abilityRaceDecrease();
      }
      if(this.currentRace.index != r.index && !this.newCharacterAbilityScores.some(a => a.racialBonus == true))
      {
        this.abilityRaceIncrease(r);
        this.currentRace = r;
      }
    }

    abilityRaceDecrease(){
      this.newCharacterAbilityScores.forEach((abi) => {
        if(this.currentRace.ability_bonuses.some(a => a.ability_score.index == abi.index)){
          let bonus = this.currentRace.ability_bonuses.filter(a => a.ability_score.index == abi.index)[0].bonus;
          abi.value -= bonus;
          abi.racialBonus = false;
        }
      })
    }

    abilityRaceIncrease(r : RaceDTOModel){
      this.newCharacterAbilityScores.forEach((abi) => {
        if(r.ability_bonuses.some(a => a.ability_score.index == abi.index)){
          let bonus = r.ability_bonuses.filter(a => a.ability_score.index == abi.index)[0].bonus;
          abi.value += bonus;
          abi.racialBonus = true;
        }
      })
    }

    changeRace(){
      this.choseRace(this.raceStats.filter(r => r.index == this.race)[0])
    }

    totalAbilityScore(abi : CharAbilityScoreDTOModel):number{
      let value = abi.value + this.newCharacterAbilityScores.filter(a => a.index == abi.index)[0].value;
      return this.totalAbilityScores.filter(a => a.index == abi.index)[0].value = value;
    }

    addAbilityScore(a : CharAbilityScoreDTOModel){
      if(a.value < 15 && this.points >= 1)
      {
        if(a.value >=13 && this.points >= 2)
        {
          a.value ++;
          this.points -= 2;
        }
        else
        {
          a.value ++;
          this.points --;
        }
      }
    }

    removeAbilityScore(a : CharAbilityScoreDTOModel){
      if(a.value > 8)
      {
        if(a.value > 13)
        {
          a.value --;
          this.points += 2;
        }
        else
        {
          a.value --;
          this.points ++;
        }
      }
    }

    ngOnInit(){
      this.getAllRaces();
      this.getAllClasses();
    }

    getAllRaces(){
      this.dndrulesService.getAllRaces().subscribe((response) => {
        this.raceStats = response;
      })
    }

    getAllClasses(){
      this.dndrulesService.getAllClasses().subscribe((response) => {
        this.classStats = response;
      })
    }

    showabi(abi : CharAbilityScoreDTOModel):number{
      return this.newCharacterAbilityScores.filter(a => a.index == abi.index)[0].value
    }

    addCharacter(){
      this.characterForm.append("UserId", this.UserId.toString());
      this.characterForm.append("Name", this.name);
      this.characterForm.append("Race", this.race);
      this.characterForm.append("Class", this.class);
      this.characterForm.append("Level", this.level.toString())
      for(let i = 0; i < this.totalAbilityScores.length; i++){
        this.characterForm.append(`CharAbilityScores[${i}].Index`, this.totalAbilityScores[i].index);
        this.characterForm.append(`CharAbilityScores[${i}].Value`, this.totalAbilityScores[i].value.toString());
        this.characterForm.append(`CharAbilityScores[${i}].RacialBonus`, this.totalAbilityScores[i].racialBonus.toString());
      }

      this.characterService.addNewCharacter(this.characterForm).subscribe((response) => {
        this.UserId = 0;
        this.name = '';
        this.race = '';
        this.class = '';
        this.level = '';
        this.currentRace = {} as RaceDTOModel;
        this.newCharacterAbilityScores = [
          {index : 'str', value : 0, racialBonus : false},
          {index : 'dex', value : 0, racialBonus : false},
          {index : 'con', value : 0, racialBonus : false},
          {index : 'int', value : 0, racialBonus : false},
          {index : 'wis', value : 0, racialBonus : false},
          {index : 'cha', value : 0, racialBonus : false}
        ]
        this.totalAbilityScores = [
          {index : 'str', value : 0, racialBonus : false},
          {index : 'dex', value : 0, racialBonus : false},
          {index : 'con', value : 0, racialBonus : false},
          {index : 'int', value : 0, racialBonus : false},
          {index : 'wis', value : 0, racialBonus : false},
          {index : 'cha', value : 0, racialBonus : false}
        ]
        this.BaseAbilityScores = [
          {index : 'str', value : 8, racialBonus : false},
          {index : 'dex', value : 8, racialBonus : false},
          {index : 'con', value : 8, racialBonus : false},
          {index : 'int', value : 8, racialBonus : false},
          {index : 'wis', value : 8, racialBonus : false},
          {index : 'cha', value : 8, racialBonus : false}
        ]
        this.points = 27;
        this.characterForm = new FormData();
      })
    }
}
