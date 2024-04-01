import { Injectable } from '@angular/core';
import { Usermodel } from '../../models/usermodel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  url : string = "https://localhost:7121/"

  activeUser = {} as Usermodel;

  isLoggedIn : boolean = false;

  deleteUser(userId : number){
    return this.http.delete(`${this.url}api/User/${userId}`);
  }

  updateUser(updateForm : FormData, userId : number):Observable<Usermodel>{
    return this.http.put<Usermodel>(`${this.url}api/User/${userId}`, updateForm);
  }

  addUser(newUserForm : FormData):Observable<Usermodel>{
    return this.http.post<Usermodel>(`${this.url}api/User`, newUserForm);
  }

  login(username : string, password : string):Observable<Usermodel>{
    return this.http.get<Usermodel>(`${this.url}api/User/Login?username=${username}&password=${password}`);
  }
}
