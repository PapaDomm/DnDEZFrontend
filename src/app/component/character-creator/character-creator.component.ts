import { Component, Input } from '@angular/core';
import { CharacterService } from '../../services/Character/character.service';
import { DnDRulesService } from '../../services/DndRules/dn-drules.service';
import { CharAbilityScoreDTOModel, CharacterModel, Skill } from '../../models/character';
import { RaceDTOModel } from '../../models/race-model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { Classmodel, classSkill } from '../../models/classmodel';
import { Skillmodel } from '../../models/skillmodel';

@Component({
  selector: 'app-character-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './character-creator.component.html',
  styleUrl: './character-creator.component.css'
})
export class CharacterCreatorComponent {
    $parent: any;
    constructor(private characterService:CharacterService, private userService : UserService, private dndrulesService: DnDRulesService, private activatedRoute : ActivatedRoute, private router : Router){}

    startingRace : RaceDTOModel = {} as RaceDTOModel;

    speed : number = 30;

    initiative : number = 0;

    profBonus : number = 2;

    pointsSpent : number = 0;

    alignment : string = '';

    alignmentArr : string[] = [];

    imgUrl : any; 

    name : string = '';

    race : string  = '';

    raceStats : RaceDTOModel[] = [];

    currentRace : RaceDTOModel = {} as RaceDTOModel;

    class : string = '';

    classStats : Classmodel[] = [];

    currentClass : Classmodel = {} as Classmodel;

    skills : Skillmodel[] = [];

    newCharSkills : classSkill[] = [];

    classProfs : classSkill[] = [];

    profsToChoose : number = 0;

    level : string = '';

    currentLevel : number = 1;

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

    BaseSkills : Skill[] = [
      {index : 'acrobatics', value : 0, proficient : false},
      {index : 'animal-handling', value : 0, proficient : false},
      {index : 'arcana', value : 0, proficient : false},
      {index : 'athletics', value : 0, proficient : false},
      {index : 'deception', value : 0, proficient : false},
      {index : 'history', value : 0, proficient : false},
      {index : 'insight', value : 0, proficient : false},
      {index : 'intimidation', value : 0, proficient : false},
      {index : 'investigation', value : 0, proficient : false},
      {index : 'medicine', value : 0, proficient : false},
      {index : 'nature', value : 0, proficient : false},
      {index : 'perception', value : 0, proficient : false},
      {index : 'performance', value : 0, proficient : false},
      {index : 'persuasion', value : 0, proficient : false},
      {index : 'religion', value : 0, proficient : false},
      {index : 'sleight-of-hand', value : 0, proficient : false},
      {index : 'stealth', value : 0, proficient : false},
      {index : 'survival', value : 0, proficient : false}
    ];

    fileName : string = '';

    jsonAbilitys : string = '';

    jsonSkills : string = '';

    jsonSaves : string = '';

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

    addSkills(s : string){
      this.newCharSkills.push(this.classProfs.filter(skill => skill.index == s)[0]);
    }

    containsSkill(skill : classSkill):boolean{
      if(this.newCharSkills.some(s => s.index == skill.index)){
        return true;
      }
      else{
        return false;
      }
    }

    filterChoices(choices: classSkill[], selections: classSkill[], maxIndex : number) {
      const inBoundsSelections = selections.filter((x, i) => i <= maxIndex);
      return choices.filter(x => inBoundsSelections.indexOf(x) === -1);
    }

    changeRace(){
      this.choseRace(this.raceStats.filter(r => r.index == this.race)[0])
    }

    changeClass(){
      this.currentClass = this.classStats.filter(c => c.index == this.class)[0]
      this.classProfs = this.currentClass.proficiency.choices;
      this.profsToChoose = this.currentClass.proficiency.choose;
    }

    totalAbilityScore(abi : CharAbilityScoreDTOModel):number{
      let value = abi.value + this.newCharacterAbilityScores.filter(a => a.index == abi.index)[0].value;
      this.totalAbilityScores.filter(a => a.index == abi.index)[0].racialBonus = this.newCharacterAbilityScores.filter(a => a.index == abi.index)[0].racialBonus;
      return this.totalAbilityScores.filter(a => a.index == abi.index)[0].value = value;
    }

    addAbilityScore(a : CharAbilityScoreDTOModel){
      
      if (Number(this.level) < 4 || this.pointsSpent < 27) {
        if(a.value < 15 && this.points >= 1)
        {
          if(a.value >=13 && this.points >= 2)
          {
            a.value ++;
            this.points -= 2;
            this.pointsSpent += 2;
          }
          else if(a.value < 13)
          {
            a.value ++;
            this.points --;
            this.pointsSpent ++;
          }
        }
      } 
      else {
        if(this.points >= 1  && a.value + this.newCharacterAbilityScores.filter(abi => abi.index == a.index)[0].value < 20)
        {
          a.value ++;
          this.points --;
          this.pointsSpent ++;
        }
      }
      this.getSkillValue();
      
    }

    removeAbilityScore(a : CharAbilityScoreDTOModel){
      if(this.pointsSpent <= 27 || Number(this.level) < 4) {
        if(a.value > 8)
      {
        if(a.value > 13)
        {
          a.value --;
          this.points += 2;
          this.pointsSpent -= 2;
        }
        else 
        {
          a.value --;
          this.points ++;
          this.pointsSpent --;
        }
      }
      }
      else {
        if(a.value > 8) {
          a.value--;
          this.points++;
          this.pointsSpent--;
        }

      }
      
      this.getSkillValue();
    }

    calcSpeed() {
      this.speed = this.currentRace.speed;
    }

    calcInitiative():number {
      return this.initiative = Math.floor((this.totalAbilityScore(this.BaseAbilityScores.filter(a => a.index == "dex")[0]) - 10) / 2) ;
    }

    onLevel() {
      if(Number(this.level) < 5 && Number(this.level) >= 1) {
        this.profBonus = 2;
      }  
      else if (Number(this.level) < 9 && Number(this.level) >= 5) {
        this.profBonus = 3;
      }
      else if (Number(this.level) < 13 && Number(this.level) >= 9) {
         this.profBonus = 4;
      } 
      else if (Number(this.level) < 17 && Number(this.level) >= 13) {
        this.profBonus = 5;
      }            
      else {
        this.profBonus = 6;
      }    

      if(this.currentLevel < Number(this.level)) {
        if(Number(this.level) != 19) {
          let bonus = Math.floor(Number(this.level) / 4) - Math.floor(Number(this.currentLevel) / 4);
          this.points += bonus * 2;  
        }
        else {
          let bonus = Math.ceil(Number(this.level) / 4) - Math.floor(Number(this.currentLevel) / 4);
          this.points += bonus * 2;  
        }
        
      }
      else if (this.currentLevel > Number(this.level)) {
        this.BaseAbilityScores.forEach((abi) => {
          abi.value = 8;
        });
        this.points = 27;
        this.pointsSpent = 0;
        if(Number(this.level) != 19) {
          let bonus = Math.floor(Number(this.level) / 4);
          this.points += bonus * 2;  
        }
        else {
          let bonus = Math.ceil(Number(this.level) / 4);
          this.points += bonus * 2;  
        }
      }
      this.currentLevel = Number(this.level);

    }

    getSkillValue(){
      this.BaseSkills.forEach((skill) => {
        let abiModifier = Math.floor((this.totalAbilityScore(this.BaseAbilityScores.filter(a => a.index == this.skills.filter(s => s.index == skill.index)[0].abilityIndex)[0]) - 10) / 2);
        skill.value = abiModifier;
        if(skill.proficient == true){
          skill.value += this.profBonus;
        }
      })
    }

    ngOnInit(){

      this.activatedRoute.paramMap.subscribe((params) => {
        this.race = String(params.get("index"));
        })

      this.getImg();
      this.getAllSkills();
      this.getAllRaces();
      this.getAllClasses();
      this.getAllAlignments();
      
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

    getAllSkills(){
      this.dndrulesService.getAllSkills().subscribe((response) => {
        this.skills = response;
        this.getSkillValue();
      })
    }

    getAllAlignments(){
      this.dndrulesService.getAllAlignments().subscribe((response) => {
        this.alignmentArr = response;
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
      this.characterForm.append("Speed", this.speed.toString());
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
        this.speed = -1;
        this.initiative = -1;
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


    getImg(){
      this.imgUrl = 'https://localhost:7121/Images/Characters/defaultCharacterImage.png';
    }

    activeUser(){
      return this.userService.activeUser;
    }

    isLoggedIn(){
      return this.userService.isLoggedIn;
    }
}
