import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registerpage',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.css'
})
export class RegisterpageComponent {
  constructor(private userService : UserService, private router: Router){}

  fileName : string = '';

  imgUrl : any;

  firstName : string = '';
  lastName : string = '';
  userName : string = '';
  password : string = '';

  newUserForm : FormData = new FormData();

  onFileSelected(event : any){
    const file : File = event.target.files[0];

    if(file){
      this.fileName = file.name;

      this.newUserForm.append("Image", file);
      this.newUserForm.append("filename", file.name);

      const reader : FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.imgUrl = reader.result;
        }
    }
  }

  updateUser(){
    this.newUserForm.append("FirstName", this.firstName);
    this.newUserForm.append("LastName", this.lastName);
    this.newUserForm.append("userName", this.userName);

    this.userService.addUser(this.newUserForm).subscribe((response) => {
      this.fileName = '';
      this.firstName = '';
      this.lastName = '';
      this.userName = '';
      this.newUserForm = new FormData();
      this.router.navigate(["/Home"])
    })
  }
}
