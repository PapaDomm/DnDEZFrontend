import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutpage',
  standalone: true,
  imports: [],
  templateUrl: './aboutpage.component.html',
  styleUrl: './aboutpage.component.css'
})
export class AboutpageComponent {
  url : string = "https://localhost:7121/Images/";

  dom : string = "About/dominic.jpg";

  eli : string = "About/eli.jpg";

  git : string = "Icons/github.png"

  linked : string = "Icons/linkedin.png"


  getImg(img : string):string{
    return `${this.url}${img}`
  }
}
