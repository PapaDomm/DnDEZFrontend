import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RaceDTOModel } from '../../models/race-model';

@Injectable({
  providedIn: 'root'
})
export class DnDRulesService {

  constructor(private http : HttpClient) { }

  url : string = "https://localhost:7121/"

  getAllRaces():Observable<RaceDTOModel[]>{
    return this.http.get<RaceDTOModel[]>(`${this.url}api/DnD/Race`)
  }

  getAllClasses():Observable<string[]>{
    return this.http.get<string[]>(`${this.url}api/DnD/Class`)
  }

  getAllAlignments():Observable<string[]>{
    return this.http.get<string[]>(`${this.url}api/DnD/Alignment`)
  }

}
