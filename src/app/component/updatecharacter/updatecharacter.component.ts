import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { CharAbilityScoreDTOModel, CharacterModel } from '../../models/character';
import { RaceDTOModel } from '../../models/race-model';
import { CharacterService } from '../../services/Character/character.service';
import { DnDRulesService } from '../../services/DndRules/dn-drules.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-updatecharacter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './updatecharacter.component.html',
  styleUrl: './updatecharacter.component.css'
})
export class UpdatecharacterComponent {

  constructor(private characterService:CharacterService, private userService : UserService, private dndrulesService: DnDRulesService, private activatedRoute : ActivatedRoute, private router: Router){}

  displayChar:CharacterModel = {} as CharacterModel;

  imgUrl : any;

  name : string = '';

  race : string  = '';

  raceStats : RaceDTOModel[] = [];

  currentRace : RaceDTOModel = {} as RaceDTOModel;

  class : string = '';

  classStats : string[] = [];

  level : string = '';

  points : number = 0;

  BaseAbilityScores : CharAbilityScoreDTOModel[] = [
    {index : 'str', value : 8, racialBonus : false},
    {index : 'dex', value : 8, racialBonus : false},
    {index : 'con', value : 8, racialBonus : false},
    {index : 'int', value : 8, racialBonus : false},
    {index : 'wis', value : 8, racialBonus : false},
    {index : 'cha', value : 8, racialBonus : false}
  ];

  RaceBonusScores : CharAbilityScoreDTOModel[] = [
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

  ngOnInit(){
    this.displayChar = this.userService.updateCharacter;
    this.name = this.displayChar.name;
    this.class = this.displayChar.class;
    this.race = this.displayChar.race;
    this.level = this.displayChar.level.toString();
    this.imgUrl = this.createImgPath(this.displayChar.image.imagePath);

    this.getAllRaces();
    this.getAllClasses();
    }

  choseRace(r : RaceDTOModel){

    if(this.currentRace.index == r.index && this.RaceBonusScores.some(a => a.racialBonus == true))
    {
      return;
    }
    if(this.currentRace.index != r.index && this.RaceBonusScores.some(a => a.racialBonus == true))
    {
      this.abilityRaceDecrease();
    }
    if(this.currentRace.index != r.index && !this.RaceBonusScores.some(a => a.racialBonus == true))
    {
      this.abilityRaceIncrease(r);
      this.currentRace = r;
    }
  }

  abilityRaceDecrease(){
    this.RaceBonusScores.forEach((abi) => {
      if(this.currentRace.ability_bonuses.some(a => a.ability_score.index == abi.index)){
        let bonus = this.currentRace.ability_bonuses.filter(a => a.ability_score.index == abi.index)[0].bonus;
        abi.value -= bonus;
        abi.racialBonus = false;
      }
    })
  }

  abilityRaceIncrease(r : RaceDTOModel){
    this.RaceBonusScores.forEach((abi) => {
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
    let value = abi.value + this.RaceBonusScores.filter(a => a.index == abi.index)[0].value;
    this.totalAbilityScores.filter(a => a.index == abi.index)[0].racialBonus = this.RaceBonusScores.filter(a => a.index == abi.index)[0].racialBonus;
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

  getAllRaces(){
    this.dndrulesService.getAllRaces().subscribe((response) => {
      this.raceStats = response;

      if(this.race != ''){
        this.changeRace();
      }

      this.BaseAbilityScores.forEach((abi) => {
        abi.value = (this.displayChar.charAbilityScores.filter(a => a.index == abi.index)[0].value) - (this.RaceBonusScores.filter(a => a.index == abi.index)[0].value)
      });
    })
  }

  getAllClasses(){
    this.dndrulesService.getAllClasses().subscribe((response) => {
      this.classStats = response;
    })
  }

  showabi(abi : CharAbilityScoreDTOModel):number{
    return this.RaceBonusScores.filter(a => a.index == abi.index)[0].value;
  }

  updateCharacter(){
    this.characterForm.append("UserId", this.activeUser().userId.toString());
    this.characterForm.append("Name", this.name);
    this.characterForm.append("Race", this.race);
    this.characterForm.append("Class", this.class);
    this.characterForm.append("Level", this.level.toString());

    this.jsonAbilitys = JSON.stringify(this.totalAbilityScores);
    this.characterForm.append("CharAbilityScores", this.jsonAbilitys);

    this.characterService.updateCharacter(this.characterForm, this.displayChar.characterId).subscribe((response) => {
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

  ngOnDestroy() {
    this.userService.updateCharacter = {} as CharacterModel;
  }

  createImgPath(path : string){
    return `${this.userService.url}${path}`
  }

}
