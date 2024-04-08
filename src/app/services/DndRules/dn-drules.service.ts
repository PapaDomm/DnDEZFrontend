import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RaceDTOModel } from '../../models/race-model';
import { Classmodel } from '../../models/classmodel';
import { Skillmodel } from '../../models/skillmodel';
import { RuleModel } from '../../models/rule-model';

@Injectable({
  providedIn: 'root'
})
export class DnDRulesService {

  constructor(private http : HttpClient) { }

  url : string = "https://localhost:7121/"

  getAllRaces():Observable<RaceDTOModel[]>{
    return this.http.get<RaceDTOModel[]>(`${this.url}api/DnD/Race`)
  }

  getAllClasses():Observable<Classmodel[]>{
    return this.http.get<Classmodel[]>(`${this.url}api/DnD/Class`)
  }

  getAllAlignments():Observable<string[]>{
    return this.http.get<string[]>(`${this.url}api/DnD/Alignment`)
  }

  getAllSkills():Observable<Skillmodel[]>{
    return this.http.get<Skillmodel[]>(`${this.url}api/DnD/Skills`)
  }

  GetRules():Observable<RuleModel[]> {
    return this.http.get<RuleModel[]>(`${this.url}api/DnD/Rules`)
  }
}
