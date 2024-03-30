import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  url : string = "https://localhost:7223/"

  addNewCharacter(characterForm : FormData){
    return this.http.post(`${this.url}api/Character`, characterForm);
  }
}
