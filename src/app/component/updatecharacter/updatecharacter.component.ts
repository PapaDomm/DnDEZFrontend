import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { CharAbilityScoreDTOModel, CharacterModel, SavingThrow, Skill } from '../../models/character';
import { RaceDTOModel } from '../../models/race-model';
import { CharacterService } from '../../services/Character/character.service';
import { DnDRulesService } from '../../services/DndRules/dn-drules.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Classmodel, classSkill } from '../../models/classmodel';
import { Skillmodel } from '../../models/skillmodel';
import { CommonModule } from '@angular/common';
import { DieComponent } from '../die/die.component';
import { D6Component } from '../d6/d6.component';
import { D8Component } from '../d8/d8.component';
import { D10Component } from '../d10/d10.component';
import { D12Component } from '../d12/d12.component';

@Component({
  selector: 'app-updatecharacter',
  standalone: true,
  imports: [FormsModule, CommonModule, DieComponent, D6Component, D8Component, D10Component, D12Component],
  templateUrl: './updatecharacter.component.html',
  styleUrl: './updatecharacter.component.css'
})
export class UpdatecharacterComponent {

  constructor(private characterService:CharacterService, private userService : UserService, private dndrulesService: DnDRulesService, private activatedRoute : ActivatedRoute, private router: Router){}

  displayChar:CharacterModel = {} as CharacterModel;

  speed : number = 0;

  initiative : number = 0;

  profBonus : number = 0;

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

  personality : string = '';

  methodType : string = '';

  methodArr : string[] = ["pointBuy", "diceRoll", "homeBrew", "standardArray"];

  ideals : string = '';

  bonds : string = '';

  flaws :string = '';

  currentLevel : number = 1;

  hp : number = 0;

  startingHealth : boolean = true;

  hitdie : number = 0;

  healthRolls : number = 0;

  points : number = 0;

  statsChanged : number = 0;

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

  diceScores : CharAbilityScoreDTOModel[] = [
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

  newCharSavingThrows : SavingThrow[] = [
    {index : 'str', value : 0, proficient : false},
    {index : 'dex', value : 0, proficient : false},
    {index : 'con', value : 0, proficient : false},
    {index : 'int', value : 0, proficient : false},
    {index : 'wis', value : 0, proficient : false},
    {index : 'cha', value : 0, proficient : false}
  ];

  standardArray : number[] = [
    15, 14, 13, 12, 10, 8
  ];

  fileName : string = '';

  jsonAbilitys : string = '';

  jsonSkills : string = '';

  jsonSaves : string = '';

  characterForm : FormData = new FormData();

  ngOnInit(){
    this.displayChar = this.userService.updateCharacter;
    this.name = this.displayChar.name;
    this.class = this.displayChar.class;
    this.race = this.displayChar.race;
    this.level = this.displayChar.level.toString();
    this.speed = this.displayChar.speed;
    this.initiative = this.displayChar.initiative;
    this.hitdie = this.displayChar.hitDie;
    this.hp = this.displayChar.hp;
    this.personality = this.displayChar.personality;
    this.ideals = this.displayChar.ideals;
    this.flaws = this.displayChar.flaws;
    this.bonds = this.displayChar.bonds;
    this.profBonus = this.displayChar.profBonus;
    this.methodType = 'pointBuy';
    if(this.displayChar.level != 19){
      this.pointsSpent = (Math.floor(this.displayChar.level / 4) * 2) + 27;
    }
    else{
      this.pointsSpent = (Math.ceil(this.displayChar.level / 4) * 2) + 27;
    }
    this.statsChanged = 6;
    this.alignment = this.displayChar.alignment;
    this.currentLevel = this.displayChar.level;
    this.imgUrl = this.createImgPath(this.displayChar.image.imagePath);

    this.getAllSkills();
    this.getAllRaces();
    this.getAllClasses();
    this.getAllAlignments();
    this.getSavingThrowValue();
    this.getSkillValue();
    }


    valueChosen(num : number){
      if(this.BaseAbilityScores.some(abi => abi.value == num)){
        return true;
      }
      else{
        return false;
      }
    }

    changeStandardAbi(a : CharAbilityScoreDTOModel, num : any){
      if(num != 0){
        a.value = Number(num);
        this.statsChanged ++;
      }
      else{
        this.statsChanged --;
      }
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

  methodChange(){
    this.BaseAbilityScores = [
      {index : 'str', value : 8, racialBonus : false},
      {index : 'dex', value : 8, racialBonus : false},
      {index : 'con', value : 8, racialBonus : false},
      {index : 'int', value : 8, racialBonus : false},
      {index : 'wis', value : 8, racialBonus : false},
      {index : 'cha', value : 8, racialBonus : false}
    ];

    this.diceScores = [
      {index : 'str', value : 0, racialBonus : false},
      {index : 'dex', value : 0, racialBonus : false},
      {index : 'con', value : 0, racialBonus : false},
      {index : 'int', value : 0, racialBonus : false},
      {index : 'wis', value : 0, racialBonus : false},
      {index : 'cha', value : 0, racialBonus : false}
    ];

    this.pointsSpent = 0;
    if(this.methodType == 'pointBuy'){
      this.points = 27;
    }
    else{
      this.points = 0;
    }  
    this.statsChanged = 0;
    if(Number(this.level) != 19) {
      let bonus = Math.floor(Number(this.level) / 4);
      this.points += bonus * 2;  
    }
    else {
      let bonus = Math.ceil(Number(this.level) / 4);
      this.points += bonus * 2;  
    }
  }

  abiChange(event : any, abi : CharAbilityScoreDTOModel){
    abi.value = Number(event);
    this.diceScores.filter(a => a.index == abi.index)[0].value = abi.value;
    this.statsChanged ++;
    this.getSkillValue();
    this.getSavingThrowValue();
  }

  containsSkill(skill : classSkill):boolean{
    if(this.newCharSkills.some(s => s.index == skill.index)){
      return true;
    }
    else{
      return false;
    }
  }

  changeRace(){
    this.choseRace(this.raceStats.filter(r => r.index == this.race)[0])
  }

  addNewSkills(num : number){
    if(this.newCharSkills[num] != undefined){
      this.removeSkillProficiency(this.newCharSkills[num].index);
    }

    this.addSkillProficiency(this.newCharSkills[num].index);
    
    
    this.getSkillValue();
  }

  addSkillProficiency(skill : string){
    this.BaseSkills.filter(s => s.index == skill)[0].proficient = true;
  }

  removeSkillProficiency(skill : string){
    this.BaseSkills.forEach((s) => {
      if(!this.newCharSkills.some(skills => skills.index == s.index)){
        s.proficient = false;
      }
    })
  }

  changeClass(){
    this.currentClass = this.classStats.filter(c => c.index == this.class)[0]
    this.classProfs = this.currentClass.proficiency.choices;
    this.hitdie = this.currentClass.hit_die;
    this.profsToChoose = this.currentClass.proficiency.choose;
    this.newCharSkills.length = this.profsToChoose;


    if(!this.startingHealth){
      this.hp = this.currentClass.hit_die;
      this.healthRolls = this.currentLevel - 1;
    }
    else{
      this.startingHealth = false;
    }
    
    

    this.newCharSavingThrows.forEach((st) => {
      if(this.currentClass.saving_Throws.some(t => t.index == st.index)){
        st.proficient = true;
      }
      else{
        st.proficient = false;
      }
    })
    this.getSavingThrowValue(); 
  }

  addHealth(event : any){
    this.hp += Number(event);
    this.healthRolls --;
  }

  totalAbilityScore(abi : CharAbilityScoreDTOModel):number{
    let value = abi.value + this.RaceBonusScores.filter(a => a.index == abi.index)[0].value;
    this.totalAbilityScores.filter(a => a.index == abi.index)[0].racialBonus = this.RaceBonusScores.filter(a => a.index == abi.index)[0].racialBonus;
    return this.totalAbilityScores.filter(a => a.index == abi.index)[0].value = value;
  }

  addAbilityScore(a : CharAbilityScoreDTOModel){
      
    if (Number(this.level) < 4 || (this.pointsSpent < 27 && this.methodType == 'pointBuy')) {
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
      if(this.points >= 1  && a.value + this.RaceBonusScores.filter(abi => abi.index == a.index)[0].value < 20)
      {
        a.value ++;
        this.points --;
        this.pointsSpent ++;
      }
    }
    this.getSkillValue();
    this.getSavingThrowValue();
    
  }

  removeAbilityScore(a : CharAbilityScoreDTOModel){
    if((this.pointsSpent <= 27 && this.methodType == 'pointBuy') || Number(this.level) < 4) {
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
      if((a.value > 8 && this.methodType == 'pointBuy') || (this.methodType != 'pointBuy' && this.pointsSpent > 0 && a.value > 0 && this.diceScores.filter(abi => abi.index == a.index)[0].value < a.value)) {
        a.value--;
        this.points++;
        this.pointsSpent--;
      }

    }
    
    this.getSkillValue();
    this.getSavingThrowValue();
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

      this.healthRolls += Number(this.level) - this.currentLevel
      
    }
    else if (this.currentLevel > Number(this.level)) {
      if(this.methodType  == 'pointBuy'){
        this.BaseAbilityScores.forEach((abi) => {
          abi.value = 8;
        });
        this.points = 27;
      }
      else{
        this.points = 0;
      }
      this.hp = this.currentClass.hit_die;
      this.healthRolls = Number(this.level) - 1;
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

    this.getSkillValue();
    this.getSavingThrowValue();

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

  getSavingThrowValue(){
    this.newCharSavingThrows.forEach((st) => {
      let abiModifier = Math.floor((this.totalAbilityScore(this.BaseAbilityScores.filter(a => a.index == st.index)[0]) - 10) / 2);
      st.value = abiModifier;
      if(st.proficient == true){
        st.value += this.profBonus;
      }
    })
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

      if(this.class != ''){
        this.changeClass();
        let profSkills = this.displayChar.charSkillScores.filter(s => s.proficient == true);
        let i = 0;
        profSkills.forEach((skill) => {
          this.newCharSkills[i] = this.classProfs.filter(s => s.index == skill.index)[0];
          this.addNewSkills(i);
          i++;
        })
        this.getSkillValue();        
        this.getSavingThrowValue();
      }
    })
  }

  getInitialValue(i : number){
    if(this.newCharSkills[i] == undefined){
      this.newCharSkills[i] = this.classProfs.filter(s => s.index == this.displayChar.charSkillScores.filter(profSkill => profSkill.proficient == true && !this.newCharSkills.some(skill => skill.index != profSkill.index))[0].index)[0];
    }

    return this.newCharSkills[i].index;
    
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
    return this.RaceBonusScores.filter(a => a.index == abi.index)[0].value;
  }

  updateCharacter(){
    this.characterForm.append("UserId", this.activeUser().userId.toString());
    this.characterForm.append("Name", this.name);
    this.characterForm.append("Race", this.race);
    this.characterForm.append("Class", this.class);
    this.characterForm.append("Level", this.level.toString());
    this.characterForm.append("Speed", this.speed.toString());
    this.characterForm.append("ProfBonus", this.profBonus.toString());
    this.characterForm.append("Initiative", this.calcInitiative().toString());
    this.characterForm.append("Alignment", this.alignment);
    this.characterForm.append("Personality", this.personality);
    this.characterForm.append("Ideals", this.ideals);
    this.characterForm.append("Bonds", this.bonds);
    this.characterForm.append("Flaws", this.flaws);
    this.characterForm.append("HitDie", this.hitdie.toString());
    this.characterForm.append("Hp", this.hp.toString());

    this.jsonAbilitys = JSON.stringify(this.totalAbilityScores);
    this.jsonSkills = JSON.stringify(this.BaseSkills);
    this.jsonSaves = JSON.stringify(this.newCharSavingThrows);

    this.characterForm.append("CharAbilityScores", this.jsonAbilitys);
    this.characterForm.append("CharSkillScores", this.jsonSkills);
    this.characterForm.append("CharSavingThrows", this.jsonSaves);

    this.characterService.updateCharacter(this.characterForm, this.displayChar.characterId).subscribe((response) => {
      this.router.navigate([`/Profile/${this.activeUser().userId}`])
    })
  }

  validCharacter(){
    if(((this.points == 0 && (this.methodType == 'pointBuy' || this.currentLevel >= 4)) || (this.statsChanged == 6 && this.currentLevel < 4)) && (this.healthRolls == 0) && (this.class != '') && (this.race != '') && (this.name != '') && (this.alignment != '') && (this.level != '')){
      return true;
    }
    else {
      return false;
    }
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
