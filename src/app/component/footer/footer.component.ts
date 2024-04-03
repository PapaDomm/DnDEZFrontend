import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  url : string = "https://localhost:7121/Images/Icons/";

  git : string = "github.png";

  linked : string = "linkedin.png";


  getImg(img : string):string{
    return `${this.url}${img}`
  }
}
