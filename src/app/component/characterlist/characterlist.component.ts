import { Component, Input } from '@angular/core';
import { CharacterModel } from '../../models/character';
import { CharacterService } from '../../services/Character/character.service';
import { UserService } from '../../services/user/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './characterlist.component.html',
  styleUrl: './characterlist.component.css'
})
export class CharacterlistComponent {
  constructor(private characterService : CharacterService, private userService : UserService, private router:Router){}

  @Input() char = {} as CharacterModel;

  createImgPath(path : string){
    return `${this.userService.url}${path}`
  }

  deleteCharacter(){
    this.characterService.deleteCharacter(this.char.characterId).subscribe((response) => {
      this.char = {} as CharacterModel;
      this.router.navigate(["/Profile"]);
    })
  }

}
