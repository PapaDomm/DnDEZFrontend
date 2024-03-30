import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {
  constructor(private userservice : UserService){}

  username : string = '';
  password : string = '';

  display : boolean = false;

  toggleDisplay(){
    this.display = !this.display;
  }

  login(){
    
  }
}
