import { Component, Input } from '@angular/core';
import { CharacterModel } from '../../models/character';
import { CharacterService } from '../../services/Character/character.service';
import { UserService } from '../../services/user/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './characterlist.component.html',
  styleUrl: './characterlist.component.css'
})
export class CharacterlistComponent {
  constructor(private characterService : CharacterService, private userService : UserService){}

  @Input() char = {} as CharacterModel;

  createImgPath(path : string){
    return `${this.userService.url}${path}`
  }
}
