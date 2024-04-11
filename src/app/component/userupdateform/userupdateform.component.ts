import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userupdateform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './userupdateform.component.html',
  styleUrl: './userupdateform.component.css'
})
export class UserupdateformComponent {
  constructor(private userService : UserService){}

  @Input() userId = 0;
  @Output() outputEmitter = new EventEmitter();
  @Output() photoEmit = new EventEmitter<any>();

  fileName : string = '';

  firstName : string = '';
  lastName : string = '';
  userName : string = '';

  imgUrl : any;

  updateForm : FormData = new FormData();

  onFileSelected(event : any){
    const file : File = event.target.files[0];

    if(file){
      this.fileName = file.name;

      this.updateForm.append("Image", file);
      this.updateForm.append("filename", file.name);

      const reader : FileReader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.imgUrl = reader.result;
          this.photoEmit.emit(this.imgUrl)
        }
    }
  }

  updateUser(){
    this.updateForm.append("FirstName", this.firstName);
    this.updateForm.append("LastName", this.lastName);
    this.updateForm.append("userName", this.userName);

    this.userService.updateUser(this.updateForm, this.userId).subscribe((response) => {
      this.fileName = '';
      this.firstName = '';
      this.lastName = '';
      this.userName = '';
      this.updateForm = new FormData();
      this.userService.activeUser = response;
      this.outputEmitter.emit();
    })
  }
}
