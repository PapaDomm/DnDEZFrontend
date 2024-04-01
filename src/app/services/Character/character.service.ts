import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterModel } from '../../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  url : string = "https://localhost:7121/"

  addNewCharacter(characterForm : FormData){
    return this.http.post(`${this.url}api/Character`, characterForm);
  }

  getUserCharacters(userId : number):Observable<CharacterModel[]>{
    return this.http.get<CharacterModel[]>(`${this.url}api/Character?userId=${userId}`)
  }

  getById(charId : number):Observable<CharacterModel>{
    return this.http.get<CharacterModel>(`${this.url}api/Character/${charId}`);
  }
}
