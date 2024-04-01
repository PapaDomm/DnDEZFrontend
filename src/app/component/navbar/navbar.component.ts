import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Usermodel } from '../../models/usermodel';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private userService : UserService){}

  display : boolean = false;

  toggleDisplay(){
    this.display = !this.display
  }

  activeUser():Usermodel{
    return this.userService.activeUser;
  }
}
