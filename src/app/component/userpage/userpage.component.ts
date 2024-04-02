import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { CharacterService } from '../../services/Character/character.service';
import { Usermodel } from '../../models/usermodel';
import { Router, RouterLink } from '@angular/router';
import { CharacterModel } from '../../models/character';
import { UserupdateformComponent } from '../userupdateform/userupdateform.component';
import { CharacterdetailsComponent } from '../characterdetails/characterdetails.component';
import { CharacterlistComponent } from '../characterlist/characterlist.component';

@Component({
  selector: 'app-userpage',
  standalone: true,
  imports: [RouterLink, UserupdateformComponent, CharacterlistComponent],
  templateUrl: './userpage.component.html',
  styleUrl: './userpage.component.css'
})
export class UserpageComponent {
  constructor(private userService : UserService, private characterService : CharacterService, private router : Router){}

  userProfile : Usermodel = {} as Usermodel;

  userCharacters : CharacterModel[] = []

  ngOnInit(){
    this.userProfile = this.getUser();
    if(!this.userService.isLoggedIn){
      this.router.navigate(["/NotFound"])
    }
    this.characterService.getUserCharacters(this.userProfile.userId).subscribe((response) => {
      this.userCharacters = response;
    })
  }

  createImgPath(path : string){
    return `${this.userService.url}${path}`
  }

  getUser():Usermodel{
    return this.userService.activeUser;
  }

  deleteUser(){
    this.userService.deleteUser(this.getUser().userId).subscribe((response) => {
      this.userService.activeUser = {} as Usermodel;
      this.userService.isLoggedIn = false;
      this.router.navigate(["/Home"]);
    })
  }

}
