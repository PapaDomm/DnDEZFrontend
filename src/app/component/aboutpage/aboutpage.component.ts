import { Component } from '@angular/core';
import { CharacterService } from '../../services/Character/character.service';
import { CharacterModel } from '../../models/character';

@Component({
  selector: 'app-aboutpage',
  standalone: true,
  imports: [],
  templateUrl: './aboutpage.component.html',
  styleUrl: './aboutpage.component.css'
})
export class AboutpageComponent {
  constructor(private characterService : CharacterService){}

  url : string = "https://localhost:7121/";

  dom : string = "Images/About/dominic.jpg";

  eli : string = "Images/About/eli.jpg";

  git : string = "Images/Icons/github.png"

  linked : string = "Images/Icons/linkedin.png"

  iconics : CharacterModel[] = [];


  ngOnInit(){
    this.characterService.getById(101).subscribe((response) => {
      this.iconics.push(response);
    })
    this.characterService.getById(102).subscribe((response) => {
      this.iconics.push(response);
    })
    this.characterService.getById(103).subscribe((response) => {
      this.iconics.push(response);
    })

    this.characterService.getById(105).subscribe((response) => {
      this.iconics.push(response);
    })
    this.characterService.getById(106).subscribe((response) => {
      this.iconics.push(response);
    })
    this.characterService.getById(107).subscribe((response) => {
      this.iconics.push(response);
    })
  }

  getIconicsById(id : number){
    return this.iconics.filter(c => c.characterId == id)[0]
  }

  getImg(img : string):string{
    return `${this.url}${img}`
  }
}
