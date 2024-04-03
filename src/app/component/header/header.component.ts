import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoginformComponent } from '../loginform/loginform.component';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent, LoginformComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private userService : UserService){}

  headerImg : string = 'https://localhost:7121/Images/Icons/dndezheader.png';
}
