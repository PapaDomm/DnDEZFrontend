import { Component, Input } from '@angular/core';
import { CharacterService } from '../../services/Character/character.service';
import { DnDRulesService } from '../../services/DndRules/dn-drules.service';
import { CharAbilityScoreDTOModel, CharacterModel } from '../../models/character';
import { RaceDTOModel } from '../../models/race-model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-character-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './character-creator.component.html',
  styleUrl: './character-creator.component.css'
})
export class CharacterCreatorComponent {
    constructor(private characterService:CharacterService, private userService : UserService, private dndrulesService: DnDRulesService, private activatedRoute : ActivatedRoute, private router : Router){}

    startingRace : RaceDTOModel = {} as RaceDTOModel;

    imgUrl : any;

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

    fileName : string = '';

    jsonAbilitys : string = '';

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
      this.totalAbilityScores.filter(a => a.index == abi.index)[0].racialBonus = this.newCharacterAbilityScores.filter(a => a.index == abi.index)[0].racialBonus;
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

      this.activatedRoute.paramMap.subscribe((params) => {
        this.race = String(params.get("index"));
        })

      this.getAllRaces();
      this.getAllClasses();
      
      }

    getAllRaces(){
      this.dndrulesService.getAllRaces().subscribe((response) => {
        this.raceStats = response;

        if(this.race != ''){
          this.changeRace();
        }
      })
    }

    getAllClasses(){
      this.dndrulesService.getAllClasses().subscribe((response) => {
        this.classStats = response;
      })
    }

    showabi(abi : CharAbilityScoreDTOModel):number{
      return this.newCharacterAbilityScores.filter(a => a.index == abi.index)[0].value;
    }

    addCharacter(){
      this.characterForm.append("UserId", this.activeUser().userId.toString());
      this.characterForm.append("Name", this.name);
      this.characterForm.append("Race", this.race);
      this.characterForm.append("Class", this.class);
      this.characterForm.append("Level", this.level.toString());
      // for(let i = 0; i < this.totalAbilityScores.length; i++){
      //   this.jsonAbilitys += JSON.stringify(this.totalAbilityScores[i]);
      // }

      this.jsonAbilitys = JSON.stringify(this.totalAbilityScores);

      this.characterForm.append("CharAbilityScores", this.jsonAbilitys);

      this.characterService.addNewCharacter(this.characterForm).subscribe((response) => {
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
        this.imgUrl = undefined;
        this.router.navigate([`/Profile/${this.activeUser().userId}`])
      })
    }

    onFileChanged(event : any){
      const file : File = event.target.files[0];

      if(file){
        this.fileName = file.name;

        this.characterForm.append("Image", file);
        this.characterForm.append("filename", file.name);

        const reader : FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.imgUrl = reader.result;
        }
      }
      
    }

    activeUser(){
      return this.userService.activeUser;
    }

    isLoggedIn(){
      return this.userService.isLoggedIn;
    }
}
