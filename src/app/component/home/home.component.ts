import { Component } from '@angular/core';
import { DnDRulesService } from '../../services/DndRules/dn-drules.service';
import { RaceDTOModel } from '../../models/race-model';
import { RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private dndrulesService : DnDRulesService){ }

  allRaces : RaceDTOModel[] = []

  ngOnInit(){
    this.getAllRaces();
  }

  getAllRaces(){
    this.dndrulesService.getAllRaces().subscribe((response) => {
      this.allRaces = response;
    })
  }

  createImgPath(r : RaceDTOModel):string{
    return `https://localhost:7121/Images/Races/${r.index}.jpg`
  }
}
