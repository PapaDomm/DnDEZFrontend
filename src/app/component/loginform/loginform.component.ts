import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usermodel } from '../../models/usermodel';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {
  constructor(private userservice : UserService, private router : Router){}

  username : string = '';
  password : string = '';

  display : boolean = false;

  toggleDisplay(){
    this.display = !this.display;
  }

  login(){
    this.userservice.login(this.username, this.password).subscribe((response) => {
      this.userservice.activeUser = response;
      this.userservice.isLoggedIn = true;
      this.toggleDisplay();
      this.username = '';
      this.password = '';
      this.router.navigate(["/Home"])
    })
  }

  logout(){
    this.userservice.activeUser = {} as Usermodel;
    this.userservice.isLoggedIn = false;
    this.router.navigate(["/Home"])
  }

  activeUser(){
    return this.userservice.activeUser
  }

  isLoggedIn(){
    return this.userservice.isLoggedIn;
  }

  createImgPath(path : string):string{
    return `${this.userservice.url}${path}`
  }

  updateCharacter() {
    return this.userservice.updateCharacter;
  }

}
