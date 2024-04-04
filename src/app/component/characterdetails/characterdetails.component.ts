import { Component, Input } from '@angular/core';
import { CharacterService } from '../../services/Character/character.service';
import { CharacterModel } from '../../models/character';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

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

 ngOnInit(){
  this.routeIdentifier();
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
