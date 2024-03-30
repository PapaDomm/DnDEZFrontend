import { Component } from '@angular/core';
import { DnDRulesService } from '../../services/DndRules/dn-drules.service';
import { RaceDTOModel } from '../../models/race-model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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
    return `https://localhost:7223/Images/Races/${r.index}.jpg`
  }
}
