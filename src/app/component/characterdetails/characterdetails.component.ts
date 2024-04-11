import { Component, Input } from '@angular/core';
import { CharacterService } from '../../services/Character/character.service';
import { CharAbilityScoreDTOModel, CharacterModel, Skill } from '../../models/character';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { classSkill } from '../../models/classmodel';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './characterdetails.component.html',
  styleUrl: './characterdetails.component.css'
})
export class CharacterdetailsComponent {
 constructor(private userService: UserService, private characterService : CharacterService, private activatedRoute:ActivatedRoute, private router : Router) {}

  displayChar : CharacterModel = {} as CharacterModel;

  BaseAbilityScores : CharAbilityScoreDTOModel[] = [
    {index : 'str', value : 8, racialBonus : false, name : 'Strength'},
    {index : 'dex', value : 8, racialBonus : false, name : 'Dexterity'},
    {index : 'con', value : 8, racialBonus : false, name : 'Constitution'},
    {index : 'int', value : 8, racialBonus : false, name : 'Intelligence'},
    {index : 'wis', value : 8, racialBonus : false, name : 'Wisdom'},
    {index : 'cha', value : 8, racialBonus : false, name : 'Charisma'}
  ];

  StartingBaseSkills : Skill[] = [
    {index : 'acrobatics', value : 0, proficient : false, name : "Acrobatics", abiIndex : "Dex"},
    {index : 'animal-handling', value : 0, proficient : false, name : "Animal Handling", abiIndex : "Wis"},
    {index : 'arcana', value : 0, proficient : false, name : "Arcana", abiIndex : "Int"},
    {index : 'athletics', value : 0, proficient : false, name : "Athletics", abiIndex : "Str"},
    {index : 'deception', value : 0, proficient : false, name : "Deception", abiIndex : "Cha"},
    {index : 'history', value : 0, proficient : false, name : "History", abiIndex : "Int"},
    {index : 'insight', value : 0, proficient : false, name : "Insight", abiIndex : "Wis"},
    {index : 'intimidation', value : 0, proficient : false, name : "Intimidation", abiIndex : "Cha"},
    {index : 'investigation', value : 0, proficient : false, name : "Investigation", abiIndex : "Int"},
    {index : 'medicine', value : 0, proficient : false, name : "Medicine", abiIndex : "Wis"},
    {index : 'nature', value : 0, proficient : false, name : "Nature", abiIndex : "Int"},
    {index : 'perception', value : 0, proficient : false, name : "Perception", abiIndex : "Wis"},
    {index : 'performance', value : 0, proficient : false, name : "Performance", abiIndex : "Cha"},
    {index : 'persuasion', value : 0, proficient : false, name : "Persuasion", abiIndex : "Cha"},
    {index : 'religion', value : 0, proficient : false, name : "Religion", abiIndex : "Int"},
    {index : 'sleight-of-hand', value : 0, proficient : false, name : "Sleight of Hand", abiIndex : "Dex"},
    {index : 'stealth', value : 0, proficient : false, name : "Stealth", abiIndex : "Dex"},
    {index : 'survival', value : 0, proficient : false, name : "Survival", abiIndex : "Wis"}
  ];

 ngOnInit(){
  this.routeIdentifier();
 }

 titleCaseWord(word : string){
  return word[0].toUpperCase() + word.substring(1);
 }

 routeIdentifier(){
  this.activatedRoute.paramMap.subscribe((params) => {
    let id = Number(params.get("id"));
    this.characterService.getById(id).subscribe((response) => {
      if(response.userId == this.activeUser().userId){
        this.displayChar = response;
      }
      else{
        this.router.navigate(["/NotFound"])
      }
    })
  })
 }

 getSkillName(skill : string){
  return this.StartingBaseSkills.filter(s => s.index == skill)[0].name;
 }

 getAbiName(abi : string){
  return this.BaseAbilityScores.filter(a => a.index == abi)[0].name;
 }

 getAbiModifier(abi : CharAbilityScoreDTOModel){
  return Math.floor((abi.value - 10) / 2)
}

getAbiType(skill : string){
  return this.StartingBaseSkills.filter(s => s.index == skill)[0].abiIndex;
}


 activeUser(){
    return this.userService.activeUser;
 }
 
 createImgPath(path : string){
    return `${this.userService.url}${path}`
  }

  getUpdateCharacter() {
    this.userService.updateCharacter = this.displayChar; 
  }

  deleteCharacter(){
    this.characterService.deleteCharacter(this.displayChar.characterId).subscribe((response) => {
      this.displayChar = {} as CharacterModel;
      this.router.navigate(["/Profile"]);
    })
  }

}
