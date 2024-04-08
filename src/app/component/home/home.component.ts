import { Component } from '@angular/core';
import { DnDRulesService } from '../../services/DndRules/dn-drules.service';
import { RaceDTOModel } from '../../models/race-model';
import { RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { DieComponent } from '../die/die.component';
import { D10Component } from '../d10/d10.component';
import { D8Component } from '../d8/d8.component';
import { D6Component } from '../d6/d6.component';
import { D12Component } from '../d12/d12.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, JsonPipe, DieComponent, D10Component, D8Component, D6Component, D12Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private dndrulesService : DnDRulesService){ }

  allRaces : RaceDTOModel[] = [];

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
